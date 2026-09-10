import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { BtnLink, Card, Progress, cx } from "@/components/ui";
import { coursesData, flatLessons, gameOf, lessonCount } from "@/lib/data";

export const Route = createFileRoute("/my-courses")({
  head: () => ({
    meta: [
      { title: "My Courses — continue learning | STARBOUND" },
      {
        name: "description",
        content:
          "Your enrolled gaming courses, lesson progress and what to practice next, all in one place.",
      },
      { property: "og:title", content: "Your learning dashboard on STARBOUND" },
      { property: "og:description", content: "Pick up exactly where you left off." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MyCoursesPage,
});

const tabs = ["In progress", "Completed", "Wishlist"] as const;

function MyCoursesPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("In progress");
  const enrolled = coursesData.filter((c) => c.progress !== undefined);
  const inProgress = enrolled.filter((c) => (c.progress ?? 0) < 100);
  const completed = enrolled.filter((c) => (c.progress ?? 0) >= 100);
  const wishlist = coursesData.filter((c) => c.badge === "Bestseller" && c.progress === undefined);

  const list = tab === "In progress" ? inProgress : tab === "Completed" ? completed : wishlist;

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <h1 className="font-sans text-3xl font-bold md:text-4xl">My Courses</h1>
      <p className="mt-2 text-muted-foreground">
        {inProgress.length} in progress · {completed.length} completed · {wishlist.length} saved
      </p>

      <div className="mt-7 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cx(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              tab === t
                ? "border-primary bg-primary/20 text-foreground"
                : "border-border bg-surface text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <Card className="mt-8 py-16 text-center">
          <p className="font-sans font-semibold">Nothing here yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Find a course and it will show up in this tab.
          </p>
          <div className="mt-5 flex justify-center">
            <BtnLink to="/courses">Browse courses</BtnLink>
          </div>
        </Card>
      ) : (
        <div className="mt-8 grid gap-4">
          {list.map((c) => {
            const lessons = flatLessons(c);
            const done = Math.round(((c.progress ?? 0) / 100) * lessons.length);
            const next = lessons[Math.min(done, lessons.length - 1)]!;
            return (
              <Card key={c.slug} className="flex flex-col gap-5 md:flex-row md:items-center">
                <img
                  src={c.thumb}
                  alt={`${c.title} cover`}
                  loading="lazy"
                  className="h-28 w-full rounded-xl object-cover md:w-44"
                />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{gameOf(c).name}</p>
                  <Link
                    to="/courses/$game/$slug"
                    params={{ game: c.gameSlug, slug: c.slug }}
                    className="font-sans text-lg font-semibold hover:text-primary"
                  >
                    {c.title}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {done}/{lessonCount(c)} lessons · {c.progress ?? 0}% complete
                  </p>
                  <Progress value={c.progress ?? 0} className="mt-3 max-w-md" />
                  {tab !== "Wishlist" && (
                    <p className="mt-2 text-xs text-muted-foreground">Next: {next.title}</p>
                  )}
                </div>
                {tab === "Wishlist" ? (
                  <BtnLink
                    to="/courses/$game/$slug"
                    params={{ game: c.gameSlug, slug: c.slug }}
                    variant="outline"
                  >
                    View course
                  </BtnLink>
                ) : (
                  <BtnLink
                    to="/learn/$course/$lesson"
                    params={{ course: c.slug, lesson: next.slug }}
                  >
                    <PlayCircle size={16} /> Continue
                  </BtnLink>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </main>
  );
}
