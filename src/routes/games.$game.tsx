import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CourseCard } from "@/components/CourseCard";
import { BtnLink, Card, Pill } from "@/components/ui";
import { categories, coursesData, creators, getGame } from "@/lib/data";

export const Route = createFileRoute("/games/$game")({
  loader: ({ params }) => {
    const game = getGame(params.game);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Game not found | STARBOUND" }, { name: "robots", content: "noindex" }],
      };
    }
    const { game } = loaderData;
    const title = `${game.name} courses and coaching | STARBOUND`;
    const description = `${game.tagline}. ${game.courses} ${game.name} courses from ranked players and coaches.`;
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
  component: GamePage,
});

function GamePage() {
  const { game } = Route.useLoaderData();
  const list = coursesData.filter((c) => c.gameSlug === game.slug);
  const gameCreators = creators.filter((cr) => list.some((c) => c.creator === cr.username));

  return (
    <main>
      <section className="relative overflow-hidden border-b border-border">
        <img src={game.art} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <Pill tone="galaxy">Game hub</Pill>
          <h1 className="mt-4 font-sans text-4xl font-bold md:text-5xl">{game.name}</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">{game.tagline}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {game.courses} courses · {game.players} players learning
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <BtnLink to="/courses">Browse all courses</BtnLink>
            <BtnLink to="/create-course" variant="outline">
              Teach {game.name}
            </BtnLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <h2 className="text-xl font-semibold md:text-2xl">Courses for {game.name}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>

        <h2 className="mt-14 text-xl font-semibold md:text-2xl">Creators to follow</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gameCreators.map((cr) => (
            <Link key={cr.username} to="/creators/$username" params={{ username: cr.username }}>
              <Card className="transition-colors hover:border-primary">
                <p className="font-sans font-semibold">{cr.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{cr.role}</p>
                <p className="mt-3 text-sm text-muted-foreground">{cr.bio}</p>
              </Card>
            </Link>
          ))}
        </div>

        <h2 className="mt-14 text-xl font-semibold md:text-2xl">Skills players work on</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }}>
              <Pill>{c.name}</Pill>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
