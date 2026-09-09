import { createFileRoute, Link } from "@tanstack/react-router";
import { BtnLink, Card, Progress, Stat } from "@/components/ui";
import { coursesData, flatLessons, gameOf } from "@/lib/data";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "Your dashboard — progress and creator stats | STARBOUND" },
      {
        name: "description",
        content:
          "Track your learning streak, course progress, student numbers and creator revenue in one dashboard.",
      },
      { property: "og:title", content: "Your STARBOUND dashboard" },
      { property: "og:description", content: "Learning progress and creator performance at a glance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const session = useSession();
  const enrolled = coursesData.filter((c) => c.progress !== undefined);
  const mine = coursesData.filter((c) => c.creator === "fytch");
  const students = mine.reduce((n, c) => n + c.students, 0);
  const revenue = mine.reduce((n, c) => n + c.price * c.students * 0.82, 0);

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <h1 className="font-sans text-3xl font-bold md:text-4xl">
        Welcome back, {session.name === "Guest" ? "player" : session.name}
      </h1>
      <p className="mt-2 text-muted-foreground">
        Goal: {session.goal} · Rank: {session.skill}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Courses in progress" value={String(enrolled.length)} hint="Keep the streak" />
        <Stat label="Lessons completed" value="37" hint="+6 this week" />
        <Stat label="Practice streak" value="12 days" hint="Longest: 21 days" />
        <Stat label="Certificates" value="2" hint="Shareable on your profile" />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-xl font-semibold">Continue learning</h2>
            <BtnLink to="/my-courses" variant="ghost" size="sm">
              All courses
            </BtnLink>
          </div>
          <div className="grid gap-3">
            {enrolled.map((c) => {
              const lessons = flatLessons(c);
              const idx = Math.min(
                Math.round(((c.progress ?? 0) / 100) * lessons.length),
                lessons.length - 1,
              );
              return (
                <Card key={c.slug} className="flex items-center gap-4">
                  <img
                    src={c.thumb}
                    alt=""
                    loading="lazy"
                    className="h-16 w-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{gameOf(c).name}</p>
                    <Link
                      to="/learn/$course/$lesson"
                      params={{ course: c.slug, lesson: lessons[idx].slug }}
                      className="font-sans font-semibold hover:text-primary"
                    >
                      {c.title}
                    </Link>
                    <Progress value={c.progress ?? 0} className="mt-2" />
                  </div>
                  <span className="text-sm text-muted-foreground">{c.progress}%</span>
                </Card>
              );
            })}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-xl font-semibold">Creator snapshot</h2>
            <BtnLink to="/dashboard/earnings" variant="ghost" size="sm">
              Earnings
            </BtnLink>
          </div>
          <Card className="space-y-4">
            <div>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Lifetime payout
              </p>
              <p className="mt-1 font-sans text-2xl font-semibold">
                ${Math.round(revenue).toLocaleString()}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Published</p>
                <p className="font-medium">{mine.length} courses</p>
              </div>
              <div>
                <p className="text-muted-foreground">Students</p>
                <p className="font-medium">{students.toLocaleString()}</p>
              </div>
            </div>
            <BtnLink to="/create-course" className="w-full">
              Create a course
            </BtnLink>
          </Card>
        </div>
      </div>
    </main>
  );
}
