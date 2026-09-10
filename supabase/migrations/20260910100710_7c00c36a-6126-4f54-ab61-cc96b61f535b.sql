create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Player',
  bio text,
  games jsonb not null default '[]'::jsonb,
  goal text,
  skill text,
  created_at timestamptz not null default now()
);
grant select, insert, update on public.profiles to authenticated;
grant select on public.profiles to anon;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;
create policy "profiles are publicly viewable" on public.profiles for select using (true);
create policy "users insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "users update own profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  game_slug text not null,
  category text not null,
  creator_id uuid references public.profiles(id) on delete set null,
  creator_name text not null default 'Creator',
  short text not null default '',
  price numeric not null default 0,
  original_price numeric,
  rating numeric not null default 0,
  reviews integer not null default 0,
  students integer not null default 0,
  difficulty text not null default 'Beginner',
  hours numeric not null default 0,
  badge text,
  trending integer not null default 0,
  outcomes jsonb not null default '[]'::jsonb,
  modules jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now()
);
grant select on public.courses to anon;
grant select, insert, update, delete on public.courses to authenticated;
grant all on public.courses to service_role;
alter table public.courses enable row level security;
create policy "published courses are viewable by everyone" on public.courses for select using (published);
create policy "creators view own courses" on public.courses for select to authenticated using (auth.uid() = creator_id);
create policy "creators insert own courses" on public.courses for insert to authenticated with check (auth.uid() = creator_id);
create policy "creators update own courses" on public.courses for update to authenticated using (auth.uid() = creator_id) with check (auth.uid() = creator_id);
create policy "creators delete own courses" on public.courses for delete to authenticated using (auth.uid() = creator_id);