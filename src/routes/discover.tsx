import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CourseRail } from "@/components/CourseCard";
import { Btn, Card, Section, cx } from "@/components/ui";
import { categories, coursesData, games } from "@/lib/data";
import { setSession, useSession } from "@/lib/session";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover — a learning feed tuned to your games | STARBOUND" },
      {
        name: "description",
        content:
          "Tell STARBOUND which games you play, what you want to improve and your current rank, and get a personalized gaming course feed.",
      },
      { property: "og:title", content: "Discover courses picked for your rank" },
      {
        property: "og:description",
        content: "Personalize your STARBOUND feed by game, goal and skill level.",
      },
    ],
  }),
  component: Discover,
});

const skills = ["New player", "Gold", "Platinum", "Diamond", "Immortal / Radiant"];
const goals = ["Aim & mechanics", "Game sense", "Rank climbing", "Team play", "Content creation"];

function Discover() {
  const session = useSession();
  const [picked, setPicked] = useState<string[]>(session.games);
  const [goal, setGoal] = useState(session.goal);
  const [skill, setSkill] = useState(session.skill);

  const chip = (active: boolean) =>
    cx(
      "rounded-full border px-4 py-2 text-sm transition-colors",
      active
        ? "border-primary bg-primary/20 text-foreground"
        : "border-border bg-surface text-muted-foreground hover:text-foreground",
    );

  const feed = coursesData.filter((c) => picked.includes(c.gameSlug));
  const list = feed.length ? feed : coursesData;

  return (
    <main>
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <h1 className="font-sans text-3xl font-bold md:text-4xl">Tune your feed</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          The more you tell us, the sharper your homepage gets.
        </p>

        <Card className="mt-8 space-y-6">
          <div>
            <p className="mb-3 font-sans text-sm font-semibold">What games do you play?</p>
            <div className="flex flex-wrap gap-2">
              {games.map((g) => (
                <button
                  key={g.slug}
                  className={chip(picked.includes(g.slug))}
                  onClick={() =>
                    setPicked((p) =>
                      p.includes(g.slug) ? p.filter((x) => x !== g.slug) : [...p, g.slug],
                    )
                  }
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 font-sans text-sm font-semibold">What are you trying to improve?</p>
            <div className="flex flex-wrap gap-2">
              {goals.map((g) => (
                <button key={g} className={chip(goal === g)} onClick={() => setGoal(g)}>
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 font-sans text-sm font-semibold">What is your current skill level?</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <button key={s} className={chip(skill === s)} onClick={() => setSkill(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <Btn onClick={() => setSession({ games: picked, goal, skill })}>Save preferences</Btn>
        </Card>
      </div>

      <Section title={`Recommended for ${skill} players`} subtitle={`Focused on ${goal.toLowerCase()}.`}>
        <CourseRail courses={list.slice(0, 4)} />
      </Section>

      <Section title="Courses similar students loved">
        <CourseRail courses={[...list].sort((a, b) => b.reviews - a.reviews).slice(0, 4)} />
      </Section>

      <Section title="Browse by category">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Card key={c.slug} className="card-hover">
              <p className="font-sans font-semibold">{c.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{c.courses} courses</p>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
