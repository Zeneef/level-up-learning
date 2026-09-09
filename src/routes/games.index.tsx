import { createFileRoute, Link } from "@tanstack/react-router";
import { games, coursesData } from "@/lib/data";
import { Card, Pill } from "@/components/ui";

export const Route = createFileRoute("/games/")({
  head: () => ({
    meta: [
      { title: "Browse courses by game | STARBOUND" },
      {
        name: "description",
        content:
          "Pick your game and find coaching tracks built by high-rank players: VALORANT, CS2, League of Legends, Fortnite and Minecraft.",
      },
      { property: "og:title", content: "Every game on STARBOUND" },
      {
        property: "og:description",
        content: "Choose a game and jump straight into the courses built for it.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GamesPage,
});

function GamesPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <h1 className="font-sans text-3xl font-bold md:text-4xl">Games</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Start with the game you actually play. Every hub lists its courses, creators and the skills
        players are working on right now.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((g) => {
          const count = coursesData.filter((c) => c.gameSlug === g.slug).length;
          return (
            <Link key={g.slug} to="/games/$game" params={{ game: g.slug }} className="group">
              <Card className="overflow-hidden p-0 transition-colors group-hover:border-primary">
                <img
                  src={g.art}
                  alt={`${g.name} course artwork`}
                  loading="lazy"
                  className="h-40 w-full object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="font-sans font-semibold">{g.name}</h2>
                    <Pill tone="brand">{count} live</Pill>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{g.tagline}</p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {g.courses} courses · {g.players} players learning
                  </p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
