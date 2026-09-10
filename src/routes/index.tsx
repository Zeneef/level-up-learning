import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-starfield.jpg";
import { CourseCard, CourseRail } from "@/components/CourseCard";
import { Avatar, BtnLink, Card, Pill, Section, Stars } from "@/components/ui";
import { coursesData, creators, games } from "@/lib/data";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STARBOUND — Level up your game with courses from top players" },
      {
        name: "description",
        content:
          "A personalized gaming learning feed: VALORANT, CS2, League, Fortnite and Minecraft courses from coaches and creators who already climbed.",
      },
      { property: "og:title", content: "STARBOUND — Level up your game" },
      {
        property: "og:description",
        content: "Discover gaming courses picked for your games, rank and goals.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const session = useSession();
  const primaryGame = games.find((g) => g.slug === session.games[0]) ?? games[0]!;

  const recommended = coursesData
    .filter((c) => c.gameSlug === primaryGame.slug)
    .concat(coursesData.filter((c) => c.gameSlug !== primaryGame.slug))
    .slice(0, 4);
  const trending = [...coursesData].sort((a, b) => b.trending - a.trending).slice(0, 4);
  const topRated = [...coursesData].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const newest = [...coursesData]
    .sort((a, b) => a.publishedDaysAgo - b.publishedDaysAgo)
    .slice(0, 4);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="glow-hero absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center md:px-8 md:py-32">
          <Pill tone="brand" className="mb-6">
            <Sparkles size={12} /> Built for gamers first
          </Pill>
          <h1 className="font-sans text-4xl leading-[1.05] font-bold md:text-6xl">
            LEVEL UP YOUR GAME.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
            Learn from experienced players, coaches, and creators through courses built to help you
            play smarter, rank higher, and improve faster.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <BtnLink to="/courses" size="lg">
              Explore Courses
            </BtnLink>
            <BtnLink to="/create-course" variant="outline" size="lg">
              Create a Course
            </BtnLink>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 pt-10 md:px-8">
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {games.map((g) => (
            <Link
              key={g.slug}
              to="/games/$game"
              params={{ game: g.slug }}
              className="shrink-0 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
            >
              {g.name}
            </Link>
          ))}
          <Link
            to="/games"
            className="shrink-0 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            All games
          </Link>
        </div>
      </div>

      <Section
        title={`Recommended for ${session.skill} ${primaryGame.name} players`}
        subtitle="Based on the games you follow, your rank and what you have been watching."
        action={
          <BtnLink to="/discover" variant="ghost" size="sm">
            Refine feed <ArrowRight size={14} />
          </BtnLink>
        }
      >
        <CourseRail courses={recommended} />
      </Section>

      <Section title="Trending This Week" subtitle="Gaining students fastest right now.">
        <CourseRail courses={trending} />
      </Section>

      <Section title="Top Rated" subtitle="Highest rated by verified students.">
        <CourseRail courses={topRated} />
      </Section>

      <Section title="New Releases" subtitle="Freshly published courses.">
        <CourseRail courses={newest} />
      </Section>

      {games.map((g) => {
        const list = coursesData.filter((c) => c.gameSlug === g.slug);
        if (!list.length) return null;
        return (
          <Section
            key={g.slug}
            title={`Popular in ${g.name}`}
            action={
              <BtnLink to="/games/$game" params={{ game: g.slug }} variant="ghost" size="sm">
                View game <ArrowRight size={14} />
              </BtnLink>
            }
          >
            <div className="no-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:px-0">
              {list.slice(0, 3).map((c) => (
                <CourseCard key={c.slug} course={c} className="w-[78vw] shrink-0 sm:w-[320px] md:w-auto" />
              ))}
            </div>
          </Section>
        );
      })}

      <Section title="Popular coaches" subtitle="Ranked by real platform metrics, not self-claimed titles.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {creators.map((c) => (
            <Link key={c.username} to="/creators/$username" params={{ username: c.username }}>
              <Card className="card-hover h-full">
                <div className="flex items-center gap-3">
                  <Avatar initials={c.avatar} size={44} />
                  <div>
                    <p className="font-sans font-semibold">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.role}</p>
                  </div>
                  <div className="ml-auto">
                    <Stars value={c.rating} />
                  </div>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{c.bio}</p>
                <div className="mt-4 flex items-center justify-between">
                  <Pill tone="brand">{c.badge}</Pill>
                  <span className="text-xs text-muted-foreground">
                    {c.students.toLocaleString()} students
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <Card className="overflow-hidden p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <h2 className="font-sans text-2xl leading-tight font-bold md:text-4xl">
                TURN YOUR GAME KNOWLEDGE INTO A COURSE.
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Create, publish, and sell gaming courses for free. Keep 82% of every sale.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <BtnLink to="/create-course">Start Creating — It&apos;s Free</BtnLink>
                <BtnLink to="/teach" variant="outline">
                  How it works
                </BtnLink>
              </div>
            </div>
            <div className="grid gap-3">
              {[
                ["You create.", "Video, text and image lessons in one editor."],
                ["You publish.", "No upfront fee, no creator subscription."],
                ["You earn.", "18% platform commission, 82% to you."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl border border-border bg-surface p-4">
                  <p className="font-sans text-sm font-semibold">{t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}
