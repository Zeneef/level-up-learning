import { createFileRoute, notFound } from "@tanstack/react-router";
import { CourseCard } from "@/components/CourseCard";
import { Card, Pill } from "@/components/ui";
import { categories, coursesData } from "@/lib/data";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const category = categories.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Category not found | STARBOUND" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.category.name} courses | STARBOUND`;
    const description = `${loaderData.category.courses} gaming courses focused on ${loaderData.category.name.toLowerCase()}, taught by high-rank players.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const list = coursesData.filter((c) => c.category === category.slug);

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <Pill tone="bubblegum">Skill track</Pill>
      <h1 className="mt-4 font-sans text-3xl font-bold md:text-4xl">{category.name}</h1>
      <p className="mt-2 text-muted-foreground">{category.courses} courses in this category</p>

      {list.length === 0 ? (
        <Card className="mt-8 py-16 text-center">
          <p className="font-sans font-semibold">Nothing published here yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            New courses land in this category every week.
          </p>
        </Card>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      )}
    </main>
  );
}
