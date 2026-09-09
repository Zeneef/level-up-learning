import { createFileRoute, notFound } from "@tanstack/react-router";
import { CourseCard } from "@/components/CourseCard";
import { Avatar, BtnLink, Card, Pill, Stars } from "@/components/ui";
import { coursesData, getCreator } from "@/lib/data";

export const Route = createFileRoute("/creators/$username")({
  loader: ({ params }) => {
    const creator = getCreator(params.username);
    if (!creator) throw notFound();
    return { creator };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Creator not found | STARBOUND" }, { name: "robots", content: "noindex" }],
      };
    }
    const { creator } = loaderData;
    const title = `${creator.name} — ${creator.role} | STARBOUND`;
    return {
      meta: [
        { title },
        { name: "description", content: creator.bio },
        { property: "og:title", content: title },
        { property: "og:description", content: creator.bio },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CreatorPage,
});

function CreatorPage() {
  const { creator } = Route.useLoaderData();
  const list = coursesData.filter((c) => c.creator === creator.username);
  const students = list.reduce((n, c) => n + c.students, 0);

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <Card className="flex flex-col gap-6 md:flex-row md:items-center">
        <Avatar initials={creator.avatar} size={80} />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-sans text-2xl font-bold md:text-3xl">{creator.name}</h1>
            <Pill tone="brand">{creator.badge}</Pill>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{creator.role}</p>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{creator.bio}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <Stars value={creator.rating} />
            <span>{students.toLocaleString()} students</span>
            <span>{list.length} courses</span>
            {creator.socials.map((s) => (
              <span key={s.label}>
                {s.label}: {s.handle}
              </span>
            ))}
          </div>
        </div>
        <BtnLink to="/courses" variant="outline">
          See all courses
        </BtnLink>
      </Card>

      <div className="mt-6 flex flex-wrap gap-2">
        {creator.achievements.map((a) => (
          <Pill key={a} tone="galaxy">
            {a}
          </Pill>
        ))}
        {creator.gamesPlayed.map((g) => (
          <Pill key={g}>{g}</Pill>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-semibold md:text-2xl">Courses by {creator.name}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((c) => (
          <CourseCard key={c.slug} course={c} />
        ))}
      </div>
    </main>
  );
}
