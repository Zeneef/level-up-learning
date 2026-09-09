import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, coursesData } from "@/lib/data";
import { Card } from "@/components/ui";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "Skill categories — aim, game sense, movement | STARBOUND" },
      {
        name: "description",
        content:
          "Browse gaming courses by skill: aim training, game sense, movement and mechanics, ranked climbing, team strategy and setup.",
      },
      { property: "og:title", content: "Learn by skill on STARBOUND" },
      {
        property: "og:description",
        content: "Pick the skill you want to fix and see the courses that teach it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <h1 className="font-sans text-3xl font-bold md:text-4xl">Categories</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Improvement is easier when you fix one thing at a time. Pick the skill you want to work on.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const live = coursesData.filter((x) => x.category === c.slug).length;
          return (
            <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }}>
              <Card className="h-full transition-colors hover:border-primary">
                <h2 className="font-sans font-semibold">{c.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {c.courses} courses across all games · {live} featured here
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
