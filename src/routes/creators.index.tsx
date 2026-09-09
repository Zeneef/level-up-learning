import { createFileRoute, Link } from "@tanstack/react-router";
import { Avatar, Card, Pill, Stars } from "@/components/ui";
import { creators } from "@/lib/data";

export const Route = createFileRoute("/creators/")({
  head: () => ({
    meta: [
      { title: "Coaches and creators teaching on STARBOUND" },
      {
        name: "description",
        content:
          "Meet the ranked players, analysts and coaches publishing gaming courses on STARBOUND — verified results, real reviews.",
      },
      { property: "og:title", content: "The creators behind STARBOUND courses" },
      {
        property: "og:description",
        content: "Radiant, Challenger and Faceit 10 players who teach what got them there.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CreatorsPage,
});

function CreatorsPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <h1 className="font-sans text-3xl font-bold md:text-4xl">Creators</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Every creator shows their rank, results and student reviews before you spend a cent.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {creators.map((c) => (
          <Link key={c.username} to="/creators/$username" params={{ username: c.username }}>
            <Card className="h-full transition-colors hover:border-primary">
              <div className="flex items-center gap-3">
                <Avatar initials={c.avatar} size={44} />
                <div>
                  <p className="font-sans font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{c.bio}</p>
              <div className="mt-4 flex items-center justify-between">
                <Stars value={c.rating} />
                <Pill tone="brand">{c.badge}</Pill>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {c.students.toLocaleString()} students
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
