import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  ChevronDown,
  Clock,
  FileText,
  Flag,
  Heart,
  PlayCircle,
  Users,
} from "lucide-react";
import { Avatar, BtnLink, Card, Pill, Progress, Section, Stars, cx, priceLabel } from "@/components/ui";
import { CourseCard } from "@/components/CourseCard";
import {
  categoryName,
  coursesData,
  creatorOf,
  faqs,
  gameOf,
  getCourse,
  lessonCount,
  reviewsData,
} from "@/lib/data";

export const Route = createFileRoute("/courses/$game/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course || course.gameSlug !== params.game) throw notFound();
    return { slug: course.slug };
  },
  head: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) {
      return { meta: [{ title: "Course not found | STARBOUND" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${course.title} — ${gameOf(course).name} course by ${creatorOf(course).name} | STARBOUND`;
    return {
      meta: [
        { title },
        { name: "description", content: course.short },
        { property: "og:title", content: `${course.title} | STARBOUND` },
        { property: "og:description", content: course.short },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: course.title,
            description: course.short,
            provider: { "@type": "Organization", name: "STARBOUND" },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: course.rating,
              reviewCount: course.reviews,
            },
          }),
        },
      ],
    };
  },
  component: CoursePage,
});

function CoursePage() {
  const { slug } = Route.useLoaderData();
  const course = getCourse(slug)!;
  const creator = creatorOf(course);
  const game = gameOf(course);
  const [openModule, setOpenModule] = useState(0);
  const [saved, setSaved] = useState(false);

  const others = coursesData.filter((c) => c.creator === creator.username && c.slug !== course.slug);
  const distribution = [78, 15, 4, 2, 1];

  return (
    <main>
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:px-8 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Link to="/games/$game" params={{ game: game.slug }}>
                <Pill tone="galaxy">{game.name}</Pill>
              </Link>
              <Link to="/categories/$slug" params={{ slug: course.category }}>
                <Pill>{categoryName(course.category)}</Pill>
              </Link>
              {course.badge && <Pill tone="bubblegum">{course.badge}</Pill>}
            </div>
            <h1 className="mt-4 font-sans text-3xl font-bold md:text-4xl">{course.title}</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">{course.short}</p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Avatar initials={creator.avatar} size={26} />
                <Link
                  to="/creators/$username"
                  params={{ username: creator.username }}
                  className="text-foreground hover:text-galaxy"
                >
                  {creator.name}
                </Link>
              </span>
              <Stars value={course.rating} />
              <span>({course.reviews.toLocaleString()} reviews)</span>
              <span className="inline-flex items-center gap-1">
                <Users size={13} /> {course.students.toLocaleString()} students
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock size={13} /> {course.hours}h · {lessonCount(course)} lessons
              </span>
              <Pill>{course.difficulty}</Pill>
            </div>
          </div>

          <Card className="h-fit overflow-hidden p-0">
            <div className="relative aspect-video">
              <img
                src={course.thumb}
                alt={`${course.title} preview`}
                loading="lazy"
                width={1024}
                height={576}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-background/30">
                <PlayCircle size={54} className="text-foreground/90" />
              </div>
            </div>
            <div className="space-y-4 p-5">
              <div className="flex items-baseline gap-3">
                <span className="font-sans text-3xl font-bold">{priceLabel(course.price)}</span>
                {course.originalPrice && (
                  <>
                    <span className="text-sm text-muted-foreground line-through">
                      ${course.originalPrice}
                    </span>
                    <Pill tone="bubblegum">
                      {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                    </Pill>
                  </>
                )}
              </div>
              <BtnLink
                to="/learn/$course/$lesson"
                params={{ course: course.slug, lesson: course.modules[0].lessons[0].slug }}
                size="lg"
                className="w-full"
              >
                {course.price === 0 ? "Start Learning" : "Enroll Now"}
              </BtnLink>
              <button
                onClick={() => setSaved((v) => !v)}
                className={cx(
                  "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border text-sm transition-colors",
                  saved ? "border-bubblegum text-bubblegum" : "border-border text-muted-foreground",
                )}
              >
                <Heart size={15} className={saved ? "fill-bubblegum" : undefined} />
                {saved ? "Saved to wishlist" : "Save to wishlist"}
              </button>
              <p className="text-xs text-muted-foreground">
                Card and common digital payment methods. Instant access, 14-day refund window, and a
                receipt by email.
              </p>
              {course.progress ? (
                <div>
                  <p className="mb-2 text-xs text-muted-foreground">
                    You are {course.progress}% through this course
                  </p>
                  <Progress value={course.progress} />
                </div>
              ) : null}
            </div>
          </Card>
        </div>
      </div>

      <Section title="What You'll Learn">
        <div className="grid gap-3 sm:grid-cols-2">
          {course.outcomes.map((o) => (
            <Card key={o} className="flex items-start gap-3 py-4">
              <BadgeCheck size={18} className="mt-0.5 shrink-0 text-galaxy" />
              <p className="text-sm">{o}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Course Content" subtitle={`${course.modules.length} modules · ${lessonCount(course)} lessons · ${course.hours}h total`}>
        <div className="overflow-hidden rounded-2xl border border-border">
          {course.modules.map((m, i) => (
            <div key={m.title} className="border-b border-border last:border-0">
              <button
                onClick={() => setOpenModule(openModule === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 bg-card px-5 py-4 text-left hover:bg-surface-2"
              >
                <span className="font-sans text-sm font-semibold">{m.title}</span>
                <span className="flex items-center gap-3 text-xs text-muted-foreground">
                  {m.lessons.length} lessons
                  <ChevronDown
                    size={16}
                    className={cx("transition-transform", openModule === i && "rotate-180")}
                  />
                </span>
              </button>
              {openModule === i && (
                <ul className="bg-background/40">
                  {m.lessons.map((l) => (
                    <li key={l.slug}>
                      <Link
                        to="/learn/$course/$lesson"
                        params={{ course: course.slug, lesson: l.slug }}
                        className="flex items-center gap-3 px-5 py-3 text-sm text-muted-foreground hover:text-foreground"
                      >
                        {l.type === "video" ? <PlayCircle size={15} /> : <FileText size={15} />}
                        <span className="flex-1">{l.title}</span>
                        <span className="text-xs">{l.minutes} min</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="About the Creator">
        <Card>
          <div className="flex flex-wrap items-center gap-4">
            <Avatar initials={creator.avatar} size={56} />
            <div>
              <p className="font-sans text-lg font-semibold">{creator.name}</p>
              <p className="text-sm text-muted-foreground">{creator.role}</p>
            </div>
            <div className="ml-auto flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <Stars value={creator.rating} />
              <span>{creator.students.toLocaleString()} students</span>
              <Pill tone="brand">{creator.badge}</Pill>
            </div>
          </div>
          <p className="mt-4 max-w-3xl text-sm text-muted-foreground">{creator.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {creator.achievements.map((a) => (
              <Pill key={a}>{a}</Pill>
            ))}
            {creator.socials.map((s) => (
              <Pill key={s.label} tone="galaxy">
                {s.handle}
              </Pill>
            ))}
          </div>
          {others.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {others.map((c) => (
                <CourseCard key={c.slug} course={c} />
              ))}
            </div>
          )}
        </Card>
      </Section>

      <Section title="Student Reviews" subtitle="Only students enrolled in this course can review it.">
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <Card className="h-fit">
            <p className="font-sans text-4xl font-bold">{course.rating.toFixed(1)}</p>
            <Stars value={course.rating} size={15} />
            <p className="mt-1 text-xs text-muted-foreground">
              {course.reviews.toLocaleString()} verified reviews
            </p>
            <div className="mt-4 space-y-2">
              {distribution.map((pct, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-6 text-xs text-muted-foreground">{5 - i}★</span>
                  <Progress value={pct} />
                  <span className="w-8 text-right text-xs text-muted-foreground">{pct}%</span>
                </div>
              ))}
            </div>
          </Card>
          <div className="space-y-4">
            {reviewsData.map((r) => (
              <Card key={r.name}>
                <div className="flex items-center gap-3">
                  <Avatar initials={r.avatar} size={34} />
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    {r.verified && <Pill tone="galaxy">Verified student</Pill>}
                    <Stars value={r.rating} />
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
                <p className="mt-3 border-l-2 border-primary/60 pl-3 text-xs text-muted-foreground">
                  <span className="text-foreground">{creator.name} replied:</span> Thanks — the demo
                  review pack drops with the next module update.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section title="FAQ">
        <div className="grid gap-3 md:grid-cols-2">
          {faqs.map((f) => (
            <Card key={f.q}>
              <p className="font-sans text-sm font-semibold">{f.q}</p>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </Card>
          ))}
        </div>
        <button className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
          <Flag size={13} /> Report this course
        </button>
      </Section>
    </main>
  );
}
