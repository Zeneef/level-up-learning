import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import { Card, Pill, cx } from "@/components/ui";
import {
  categories,
  categoryName,
  coursesData,
  creatorOf,
  gameOf,
  games,
  lessonCount,
} from "@/lib/data";

type SearchParams = { q?: string };

export const Route = createFileRoute("/courses/")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "All gaming courses — search and filter | STARBOUND" },
      {
        name: "description",
        content:
          "Search gaming courses by game, category, price, difficulty, rating and duration. VALORANT aim, CS2 utility, Fortnite building and more.",
      },
      { property: "og:title", content: "Browse every course on STARBOUND" },
      {
        property: "og:description",
        content: "Filter by game, difficulty, price and rating to find your next improvement track.",
      },
    ],
  }),
  component: CoursesPage,
});

const difficulties = ["Beginner", "Intermediate", "Advanced"] as const;
const sorts = ["Most popular", "Newest", "Top rated", "Price: low to high"] as const;

function CoursesPage() {
  const { q: initialQ } = Route.useSearch();
  const [q, setQ] = useState(initialQ ?? "");
  const [game, setGame] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [priceMode, setPriceMode] = useState<"all" | "free" | "paid">("all");
  const [minRating, setMinRating] = useState(0);
  const [maxHours, setMaxHours] = useState(8);
  const [sort, setSort] = useState<(typeof sorts)[number]>("Most popular");
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let list = coursesData.filter((c) => {
      const haystack = [
        c.title,
        c.short,
        c.difficulty,
        gameOf(c).name,
        categoryName(c.category),
        creatorOf(c).name,
        creatorOf(c).role,
      ]
        .join(" ")
        .toLowerCase();
      if (needle && !haystack.includes(needle)) return false;
      if (game && c.gameSlug !== game) return false;
      if (category && c.category !== category) return false;
      if (difficulty && c.difficulty !== difficulty) return false;
      if (priceMode === "free" && c.price !== 0) return false;
      if (priceMode === "paid" && c.price === 0) return false;
      if (c.rating < minRating) return false;
      if (c.hours > maxHours) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "Newest") return a.publishedDaysAgo - b.publishedDaysAgo;
      if (sort === "Top rated") return b.rating - a.rating;
      if (sort === "Price: low to high") return a.price - b.price;
      return b.students - a.students;
    });
    return list;
  }, [q, game, category, difficulty, priceMode, minRating, maxHours, sort]);

  const chip = (active: boolean) =>
    cx(
      "rounded-full border px-3 py-1.5 text-xs transition-colors",
      active
        ? "border-primary bg-primary/20 text-foreground"
        : "border-border bg-surface text-muted-foreground hover:text-foreground",
    );

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
      <h1 className="font-sans text-3xl font-bold md:text-4xl">Find your next improvement</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Try “VALORANT aim”, “CS2 utility”, “Fortnite building”, “Jett mechanics” or “Radiant guide”.
      </p>

      <div className="mt-7 flex flex-col gap-3 md:flex-row md:items-center">
        <label className="flex h-12 flex-1 items-center gap-3 rounded-full border border-border bg-surface px-5 focus-within:border-primary">
          <Search size={17} className="text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search games, coaches, courses, topics, techniques"
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as (typeof sorts)[number])}
          className="h-12 rounded-full border border-border bg-surface px-5 text-sm outline-none"
        >
          {sorts.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <button
          onClick={() => setShowFilters((v) => !v)}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 text-sm lg:hidden"
        >
          <SlidersHorizontal size={15} /> Filters
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className={cx("space-y-5", showFilters ? "block" : "hidden lg:block")}>
          <Card className="space-y-5">
            <div>
              <p className="mb-2 text-xs tracking-wide text-muted-foreground uppercase">Game</p>
              <div className="flex flex-wrap gap-2">
                <button className={chip(!game)} onClick={() => setGame(null)}>
                  All
                </button>
                {games.map((g) => (
                  <button key={g.slug} className={chip(game === g.slug)} onClick={() => setGame(g.slug)}>
                    {g.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs tracking-wide text-muted-foreground uppercase">Category</p>
              <div className="flex flex-wrap gap-2">
                <button className={chip(!category)} onClick={() => setCategory(null)}>
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c.slug}
                    className={chip(category === c.slug)}
                    onClick={() => setCategory(c.slug)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs tracking-wide text-muted-foreground uppercase">Price</p>
              <div className="flex gap-2">
                {(["all", "free", "paid"] as const).map((p) => (
                  <button key={p} className={chip(priceMode === p)} onClick={() => setPriceMode(p)}>
                    {p === "all" ? "All" : p === "free" ? "Free" : "Paid"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs tracking-wide text-muted-foreground uppercase">Difficulty</p>
              <div className="flex flex-wrap gap-2">
                <button className={chip(!difficulty)} onClick={() => setDifficulty(null)}>
                  Any
                </button>
                {difficulties.map((d) => (
                  <button key={d} className={chip(difficulty === d)} onClick={() => setDifficulty(d)}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs tracking-wide text-muted-foreground uppercase">
                Minimum rating — {minRating.toFixed(1)}
              </p>
              <input
                type="range"
                min={0}
                max={5}
                step={0.1}
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
            </div>
            <div>
              <p className="mb-2 text-xs tracking-wide text-muted-foreground uppercase">
                Max duration — {maxHours}h
              </p>
              <input
                type="range"
                min={1}
                max={8}
                step={0.5}
                value={maxHours}
                onChange={(e) => setMaxHours(Number(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
            </div>
          </Card>
        </aside>

        <div>
          <p className="mb-4 text-sm text-muted-foreground">
            {results.length} course{results.length === 1 ? "" : "s"}
            {q && ` for “${q}”`}
          </p>
          {results.length === 0 ? (
            <Card className="py-16 text-center">
              <p className="font-sans font-semibold">No courses match those filters</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try widening the duration or clearing the game filter.
              </p>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((c) => (
                <CourseCard key={c.slug} course={c} />
              ))}
            </div>
          )}
          <div className="mt-8 flex flex-wrap gap-2">
            {coursesData.slice(0, 4).map((c) => (
              <Pill key={c.slug}>{lessonCount(c)} lessons · {c.title}</Pill>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
