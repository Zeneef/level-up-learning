import { Link } from "@tanstack/react-router";
import { Clock, PlayCircle, Users } from "lucide-react";
import { Avatar, Pill, Stars, cx, priceLabel } from "@/components/ui";
import { creatorOf, gameOf, lessonCount, type Course } from "@/lib/data";

export function CourseCard({ course, className }: { course: Course; className?: string }) {
  const creator = creatorOf(course);
  const game = gameOf(course);

  return (
    <Link
      to="/courses/$game/$slug"
      params={{ game: course.gameSlug, slug: course.slug }}
      className={cx(
        "card-hover group flex flex-col overflow-hidden rounded-2xl border border-border bg-card",
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.thumb}
          alt={`${course.title} — ${game.name} course`}
          loading="lazy"
          width={1024}
          height={576}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          {course.price === 0 ? (
            <Pill tone="free">Free</Pill>
          ) : (
            course.badge && (
              <Pill tone={course.badge === "New" ? "galaxy" : "bubblegum"}>{course.badge}</Pill>
            )
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="text-[11px] font-medium tracking-wider text-galaxy uppercase">{game.name}</p>
        <h3 className="font-sans text-[15px] leading-snug font-semibold">{course.title}</h3>

        <div className="flex items-center gap-2">
          <Avatar initials={creator.avatar} size={24} />
          <span className="text-xs text-muted-foreground">{creator.name}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <Stars value={creator.rating} size={11} />
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <Stars value={course.rating} />
          <span className="inline-flex items-center gap-1">
            <Users size={12} /> {course.students.toLocaleString()}
          </span>
          <span className="inline-flex items-center gap-1">
            <PlayCircle size={12} /> {lessonCount(course)} lessons
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} /> {course.hours}h
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <Pill>{course.difficulty}</Pill>
          <div className="flex items-baseline gap-2">
            {course.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${course.originalPrice}
              </span>
            )}
            <span className="font-sans text-base font-semibold">{priceLabel(course.price)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function CourseRail({ courses }: { courses: Course[] }) {
  return (
    <div className="no-scrollbar -mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
      {courses.map((c) => (
        <CourseCard key={c.slug} course={c} className="w-[78vw] shrink-0 snap-start sm:w-[320px] md:w-auto" />
      ))}
    </div>
  );
}
