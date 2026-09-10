import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Captions,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  FileText,
  Gauge,
  Maximize2,
  Play,
  Settings,
} from "lucide-react";
import { Avatar, Btn, Card, Pill, Progress, cx } from "@/components/ui";
import { creatorOf, flatLessons, getCourse } from "@/lib/data";

export const Route = createFileRoute("/learn/$course/$lesson")({
  loader: ({ params }) => {
    const course = getCourse(params.course);
    if (!course) throw notFound();
    const lessons = flatLessons(course);
    if (!lessons.some((l) => l.slug === params.lesson)) throw notFound();
    return { course: course.slug, lesson: params.lesson };
  },
  head: ({ params }) => {
    const course = getCourse(params.course);
    return {
      meta: [
        { title: course ? `${course.title} — lesson player | STARBOUND` : "Lesson | STARBOUND" },
        {
          name: "description",
          content: course
            ? `Work through ${course.title} lesson by lesson and pick up exactly where you left off.`
            : "Lesson player.",
        },
        { property: "og:title", content: course ? `${course.title} — learning` : "STARBOUND" },
        { property: "og:description", content: "A distraction-free gaming lesson player." },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: LearnPage,
});

function LearnPage() {
  const { course: courseSlug, lesson: lessonSlug } = Route.useLoaderData();
  const course = getCourse(courseSlug)!;
  const creator = creatorOf(course);
  const lessons = flatLessons(course);
  const index = lessons.findIndex((l) => l.slug === lessonSlug);
  const lesson = lessons[index]!;
  const navigate = useNavigate();

  const [completed, setCompleted] = useState<string[]>(
    lessons.slice(0, Math.max(0, Math.round((lessons.length * (course.progress ?? 0)) / 100))).map(
      (l) => l.slug,
    ),
  );
  const [speed, setSpeed] = useState("1x");
  const percent = Math.round((completed.length / lessons.length) * 100);

  function go(delta: number) {
    const next = lessons[index + delta];
    if (next) navigate({ to: "/learn/$course/$lesson", params: { course: course.slug, lesson: next.slug } });
  }

  return (
    <main className="mx-auto grid max-w-[1600px] gap-6 px-5 py-8 md:px-8 lg:grid-cols-[320px_1fr]">
      <aside className="h-fit lg:sticky lg:top-24">
        <Card className="p-4">
          <Link
            to="/courses/$game/$slug"
            params={{ game: course.gameSlug, slug: course.slug }}
            className="font-sans text-sm font-semibold hover:text-galaxy"
          >
            {course.title}
          </Link>
          <div className="mt-3">
            <div className="mb-2 flex justify-between text-xs text-muted-foreground">
              <span>{percent}% complete</span>
              <span>
                {completed.length}/{lessons.length}
              </span>
            </div>
            <Progress value={percent} />
          </div>
          <div className="mt-5 space-y-4">
            {course.modules.map((m) => (
              <div key={m.title}>
                <p className="mb-2 text-[11px] tracking-wide text-muted-foreground uppercase">
                  {m.title}
                </p>
                <ul className="space-y-1">
                  {m.lessons.map((l) => {
                    const done = completed.includes(l.slug);
                    const active = l.slug === lessonSlug;
                    return (
                      <li key={l.slug}>
                        <Link
                          to="/learn/$course/$lesson"
                          params={{ course: course.slug, lesson: l.slug }}
                          className={cx(
                            "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors",
                            active
                              ? "bg-primary/20 text-foreground"
                              : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                          )}
                        >
                          {done ? (
                            <CheckCircle2 size={15} className="text-galaxy" />
                          ) : (
                            <Circle size={15} />
                          )}
                          <span className="flex-1 truncate">{l.title}</span>
                          <span className="text-[11px]">{l.minutes}m</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </aside>

      <div>
        {lesson.type === "video" ? (
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative flex aspect-video items-center justify-center bg-background">
              <img
                src={course.thumb}
                alt=""
                loading="lazy"
                width={1024}
                height={576}
                className="absolute inset-0 h-full w-full object-cover opacity-35"
              />
              <button className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-brand">
                <Play size={26} className="text-primary-foreground" />
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t border-border px-4 py-3 text-xs text-muted-foreground">
              <span className="flex-1 min-w-40">
                <Progress value={35} />
              </span>
              <span>04:12 / {lesson.minutes}:00</span>
              <button
                onClick={() => setSpeed(speed === "1x" ? "1.25x" : speed === "1.25x" ? "1.5x" : "1x")}
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                <Gauge size={14} /> {speed}
              </button>
              <button className="inline-flex items-center gap-1 hover:text-foreground">
                <Settings size={14} /> 1080p
              </button>
              <button className="inline-flex items-center gap-1 hover:text-foreground">
                <Captions size={14} /> CC
              </button>
              <button className="inline-flex items-center gap-1 hover:text-foreground">
                <Maximize2 size={14} />
              </button>
            </div>
          </div>
        ) : (
          <Card className="p-6 md:p-10">
            <Pill tone="galaxy">
              <FileText size={12} /> Text lesson
            </Pill>
            <h1 className="mt-4 font-sans text-2xl font-bold md:text-3xl">{lesson.title}</h1>
            <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Most players plateau because their practice has no structure. This lesson gives you a
                repeatable loop: warm up, isolate one skill, review, then apply it in a real match.
              </p>
              <h2 className="font-sans text-lg font-semibold text-foreground">The loop</h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>10 minutes of targeted warm-up, not aimless deathmatch.</li>
                <li>15 minutes on one weakness with a measurable target.</li>
                <li>One ranked game where you only track that weakness.</li>
              </ul>
              <blockquote className="border-l-2 border-bubblegum pl-4 text-foreground">
                “If you cannot name the thing you are practising, you are just playing.”
              </blockquote>
              <img
                src={course.thumb}
                alt="Lesson diagram"
                loading="lazy"
                width={1024}
                height={576}
                className="w-full rounded-xl border border-border"
              />
            </div>
          </Card>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Btn variant="outline" onClick={() => go(-1)}>
            <ChevronLeft size={16} /> Previous Lesson
          </Btn>
          <Btn
            variant={completed.includes(lesson.slug) ? "outline" : "primary"}
            onClick={() =>
              setCompleted((c) =>
                c.includes(lesson.slug) ? c.filter((s) => s !== lesson.slug) : [...c, lesson.slug],
              )
            }
          >
            <CheckCircle2 size={16} />
            {completed.includes(lesson.slug) ? "Completed" : "Mark Complete"}
          </Btn>
          <Btn variant="outline" onClick={() => go(1)}>
            Next Lesson <ChevronRight size={16} />
          </Btn>
          <span className="ml-auto text-xs text-muted-foreground">+40 XP per lesson</span>
        </div>

        <Card className="mt-6">
          <p className="font-sans text-sm font-semibold">Questions on this lesson</p>
          <div className="mt-4 flex gap-3">
            <Avatar initials="AE" size={32} />
            <input
              placeholder="Ask the creator something specific…"
              className="h-11 flex-1 rounded-full border border-border bg-surface px-4 text-sm outline-none focus:border-primary"
            />
            <Btn size="sm">Post</Btn>
          </div>
          <div className="mt-5 space-y-4">
            <div className="flex gap-3">
              <Avatar initials="KO" size={32} />
              <div>
                <p className="text-sm">
                  <span className="font-medium">Kobo</span> — should I warm up before ranked or after?
                </p>
                <p className="mt-2 border-l-2 border-primary/60 pl-3 text-sm text-muted-foreground">
                  <span className="text-foreground">{creator.name}:</span> Before, always. Ten focused
                  minutes beats an hour of unfocused aim lab.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
