import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Btn, Card, cx } from "@/components/ui";
import { games } from "@/lib/data";
import { setSession } from "@/lib/session";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up free — STARBOUND gaming courses" },
      {
        name: "description",
        content:
          "Create a free STARBOUND account, pick your games and goals, and get course recommendations built for your rank.",
      },
      { property: "og:title", content: "Join STARBOUND free" },
      { property: "og:description", content: "Tell us your games and goals — we'll build your track." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignupPage,
});

const field =
  "mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary";
const goals = ["Aim & mechanics", "Game sense", "Ranked climbing", "Team play", "Content creation"];
const skills = ["New to the game", "Bronze–Gold", "Platinum", "Diamond+", "Pro path"];

function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [picked, setPicked] = useState<string[]>([games[0].slug]);
  const [goal, setGoal] = useState(goals[0]);
  const [skill, setSkill] = useState(skills[2]);

  const chip = (active: boolean) =>
    cx(
      "rounded-full border px-4 py-2 text-sm transition-colors",
      active
        ? "border-primary bg-primary/20 text-foreground"
        : "border-border bg-surface text-muted-foreground hover:text-foreground",
    );

  function finish() {
    const clean = name.trim() || "Player";
    setSession({
      signedIn: true,
      name: clean,
      initials: clean.slice(0, 2).toUpperCase(),
      games: picked,
      goal,
      skill,
    });
    navigate({ to: "/dashboard" });
  }

  return (
    <main className="mx-auto max-w-xl px-5 py-16 md:px-8 md:py-24">
      <h1 className="font-sans text-3xl font-bold">
        {step === 0 ? "Create your account" : "Let's tune your feed"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {step === 0 ? (
          <>
            Free forever for learners. Already have one?{" "}
            <Link to="/login" className="text-primary">
              Log in
            </Link>
            .
          </>
        ) : (
          "Three quick questions so your recommendations actually fit."
        )}
      </p>

      <Card className="mt-8 space-y-6">
        {step === 0 ? (
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setStep(1);
            }}
          >
            <div>
              <label className="text-sm font-medium">Display name</label>
              <input
                className={field}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your gamertag"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input className={field} type="email" required placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input className={field} type="password" required placeholder="••••••••" />
            </div>
            <Btn type="submit" className="w-full">
              Continue
            </Btn>
          </form>
        ) : (
          <>
            <div>
              <p className="text-sm font-medium">Which games do you play?</p>
              <div className="mt-3 flex flex-wrap gap-2">
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
              <p className="text-sm font-medium">What do you want to improve?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {goals.map((g) => (
                  <button key={g} className={chip(goal === g)} onClick={() => setGoal(g)}>
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Where are you now?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <button key={s} className={chip(skill === s)} onClick={() => setSkill(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <Btn className="w-full" onClick={finish}>
              Build my feed
            </Btn>
          </>
        )}
      </Card>
    </main>
  );
}
