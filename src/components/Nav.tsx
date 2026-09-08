import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  Compass,
  Gamepad2,
  GraduationCap,
  LayoutDashboard,
  Library,
  Menu,
  Search,
  X,
} from "lucide-react";
import { Avatar, BtnLink, cx } from "@/components/ui";

const centerLinks = [
  { to: "/discover", label: "Discover" },
  { to: "/courses", label: "Courses" },
  { to: "/games", label: "Games" },
  { to: "/categories", label: "Categories" },
];

export function Nav({ signedIn }: { signedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/courses", search: { q: q || undefined } as never });
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 md:px-8">
        <Link to="/" className="font-sans text-lg font-bold tracking-[0.18em]">
          STAR<span className="text-gradient">BOUND</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {centerLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-foreground bg-surface" }}
              className="rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="ml-auto hidden max-w-xs flex-1 md:block">
          <label className="flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-3.5 transition-colors focus-within:border-primary">
            <Search size={15} className="text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search games, coaches, skills"
              aria-label="Search courses"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <BtnLink to="/create-course" variant="outline" size="sm" className="hidden sm:inline-flex">
            Create a Course
          </BtnLink>
          {signedIn ? (
            <>
              <Link
                to="/dashboard"
                className="hidden h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground md:inline-flex"
                aria-label="Notifications"
              >
                <Bell size={16} />
              </Link>
              <Link
                to="/dashboard"
                className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground md:inline-flex"
              >
                <LayoutDashboard size={15} /> Dashboard
              </Link>
              <Link to="/dashboard" aria-label="Your profile">
                <Avatar initials="AE" size={34} />
              </Link>
            </>
          ) : (
            <>
              <BtnLink to="/login" variant="ghost" size="sm" className="hidden md:inline-flex">
                Log In
              </BtnLink>
              <BtnLink to="/signup" size="sm">
                Sign Up
              </BtnLink>
            </>
          )}
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground lg:hidden"
            aria-label="Menu"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-5 py-4 lg:hidden">
          <form onSubmit={submitSearch} className="mb-3 md:hidden">
            <label className="flex h-11 items-center gap-2 rounded-full border border-border bg-surface px-4">
              <Search size={15} className="text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search courses"
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>
          </form>
          <div className="grid gap-1">
            {[...centerLinks, { to: "/my-courses", label: "My Courses" }, { to: "/dashboard", label: "Dashboard" }, { to: "/create-course", label: "Create a Course" }, { to: "/login", label: "Log In" }].map(
              (l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
                >
                  {l.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
}

const mobileTabs = [
  { to: "/", label: "Home", icon: Compass },
  { to: "/courses", label: "Courses", icon: Library },
  { to: "/games", label: "Games", icon: Gamepad2 },
  { to: "/my-courses", label: "Learning", icon: GraduationCap },
  { to: "/dashboard", label: "You", icon: LayoutDashboard },
];

export function MobileTabBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-5">
        {mobileTabs.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            activeOptions={{ exact: t.to === "/" }}
            activeProps={{ className: "text-foreground" }}
            className={cx(
              "flex flex-col items-center gap-1 py-2.5 text-[10px] text-muted-foreground transition-colors",
            )}
          >
            <t.icon size={18} />
            {t.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
