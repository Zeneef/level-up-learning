import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import { Btn, BtnLink, Card, Pill, cx } from "@/components/ui";
import { categories, games } from "@/lib/data";

export const Route = createFileRoute("/create-course")({
  head: () => ({
    meta: [
      { title: "Create a course — free to publish | STARBOUND" },
      {
        name: "description",
        content:
          "Build your gaming course in four steps: basics, curriculum, pricing and review. Free to publish, 18% commission only on sales.",
      },
      { property: "og:title", content: "Create a gaming course on STARBOUND" },
      {
        property: "og:description",
        content: "Outline, upload, price and publish — no fees until you sell.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CreateCoursePage,
});

const stepNames = ["Basics", "Curriculum", "Pricing", "Review"];

type Lesson = { title: string; type: "video" | "text"; minutes: number };
type Module = { title: string; lessons: Lesson[] };

function CreateCoursePage() {
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState("");
  const [short, setShort] = useState("");
  const [game, setGame] = useState(games[0].slug);
  const [category, setCategory] = useState(categories[0].slug);
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [price, setPrice] = useState(29);
  const [free, setFree] = useState(false);
  const [published, setPublished] = useState(false);
  const [modules, setModules] = useState<Module[]>([
    { title: "Module 1 — Fundamentals", lessons: [{ title: "Introduction", type: "video", minutes: 6 }] },
  ]);

  const totalLessons = modules.reduce((n, m) => n + m.lessons.length, 0);
  const totalMinutes = modules.reduce(
    (n, m) => n + m.lessons.reduce((x, l) => x + (Number(l.minutes) || 0), 0),
    0,
  );
  const payout = free ? 0 : Math.round(price * 0.82 * 100) / 100;

  const field =
    "mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary";

  function addModule() {
    setModules((m) => [...m, { title: `Module ${m.length + 1} — New module`, lessons: [] }]);
  }
  function addLesson(mi: number) {
    setModules((m) =>
      m.map((mod, i) =>
        i === mi
          ? { ...mod, lessons: [...mod.lessons, { title: "New lesson", type: "video", minutes: 10 }] }
          : mod,
      ),
    );
  }
  function patchLesson(mi: number, li: number, patch: Partial<Lesson>) {
    setModules((m) =>
      m.map((mod, i) =>
        i === mi
          ? { ...mod, lessons: mod.lessons.map((l, j) => (j === li ? { ...l, ...patch } : l)) }
          : mod,
      ),
    );
  }

  if (published) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-24 text-center md:px-8">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand">
          <Check size={26} className="text-primary-foreground" />
        </div>
        <h1 className="mt-6 font-sans text-3xl font-bold">Course submitted for review</h1>
        <p className="mt-3 text-muted-foreground">
          “{title || "Untitled course"}” is queued for quality review. Most courses go live within 24
          hours, and you keep 82% of every sale.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <BtnLink to="/dashboard">Go to dashboard</BtnLink>
          <Btn variant="outline" onClick={() => setPublished(false)}>
            Keep editing
          </Btn>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-10 md:px-8 md:py-14">
      <Pill tone="galaxy">Publishing is free</Pill>
      <h1 className="mt-4 font-sans text-3xl font-bold md:text-4xl">Create a course</h1>
      <p className="mt-2 text-muted-foreground">
        You only pay an 18% commission when a student buys. Drafts are saved as you go.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {stepNames.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={cx(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              i === step
                ? "border-primary bg-primary/20 text-foreground"
                : i < step
                  ? "border-galaxy/50 bg-galaxy/15 text-foreground"
                  : "border-border bg-surface text-muted-foreground",
            )}
          >
            {i + 1}. {s}
          </button>
        ))}
      </div>

      <Card className="mt-6 space-y-6">
        {step === 0 && (
          <>
            <div>
              <label className="text-sm font-medium">Course title</label>
              <input
                className={field}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Radiant Aim System"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Short description</label>
              <textarea
                className={field}
                rows={3}
                value={short}
                onChange={(e) => setShort(e.target.value)}
                placeholder="What will a student be able to do after this course?"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="text-sm font-medium">Game</label>
                <select className={field} value={game} onChange={(e) => setGame(e.target.value)}>
                  {games.map((g) => (
                    <option key={g.slug} value={g.slug}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <select
                  className={field}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Difficulty</label>
                <select
                  className={field}
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  {["Beginner", "Intermediate", "Advanced"].map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <div className="space-y-5">
            {modules.map((mod, mi) => (
              <div key={mi} className="rounded-xl border border-border p-4">
                <input
                  className="w-full bg-transparent font-sans font-semibold outline-none"
                  value={mod.title}
                  onChange={(e) =>
                    setModules((m) =>
                      m.map((x, i) => (i === mi ? { ...x, title: e.target.value } : x)),
                    )
                  }
                />
                <div className="mt-3 grid gap-2">
                  {mod.lessons.map((l, li) => (
                    <div
                      key={li}
                      className="flex flex-wrap items-center gap-2 rounded-lg bg-surface px-3 py-2"
                    >
                      <input
                        className="flex-1 bg-transparent text-sm outline-none"
                        value={l.title}
                        onChange={(e) => patchLesson(mi, li, { title: e.target.value })}
                      />
                      <select
                        className="rounded-md bg-surface-2 px-2 py-1 text-xs outline-none"
                        value={l.type}
                        onChange={(e) =>
                          patchLesson(mi, li, { type: e.target.value as "video" | "text" })
                        }
                      >
                        <option value="video">Video</option>
                        <option value="text">Text</option>
                      </select>
                      <input
                        type="number"
                        min={1}
                        className="w-16 rounded-md bg-surface-2 px-2 py-1 text-xs outline-none"
                        value={l.minutes}
                        onChange={(e) => patchLesson(mi, li, { minutes: Number(e.target.value) })}
                      />
                      <button
                        aria-label="Remove lesson"
                        onClick={() =>
                          setModules((m) =>
                            m.map((x, i) =>
                              i === mi
                                ? { ...x, lessons: x.lessons.filter((_, j) => j !== li) }
                                : x,
                            ),
                          )
                        }
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => addLesson(mi)}
                  className="mt-3 inline-flex items-center gap-1 text-xs text-primary"
                >
                  <Plus size={13} /> Add lesson
                </button>
              </div>
            ))}
            <Btn variant="outline" size="sm" onClick={addModule}>
              <Plus size={14} /> Add module
            </Btn>
            <p className="text-xs text-muted-foreground">
              {modules.length} modules · {totalLessons} lessons · {Math.round(totalMinutes / 6) / 10}h
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex gap-2">
              <button
                onClick={() => setFree(true)}
                className={cx(
                  "rounded-full border px-4 py-2 text-sm",
                  free ? "border-primary bg-primary/20" : "border-border bg-surface",
                )}
              >
                Free course
              </button>
              <button
                onClick={() => setFree(false)}
                className={cx(
                  "rounded-full border px-4 py-2 text-sm",
                  !free ? "border-primary bg-primary/20" : "border-border bg-surface",
                )}
              >
                Paid course
              </button>
            </div>
            {!free && (
              <div>
                <label className="text-sm font-medium">Price (USD) — ${price}</label>
                <input
                  type="range"
                  min={5}
                  max={199}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="mt-3 w-full accent-[var(--primary)]"
                />
              </div>
            )}
            <div className="rounded-xl border border-border bg-surface p-4 text-sm">
              <p className="text-muted-foreground">You keep per sale</p>
              <p className="mt-1 font-sans text-2xl font-semibold">${payout.toFixed(2)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                18% STARBOUND commission · nothing charged until a sale happens
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-3 text-sm">
            <Row k="Title" v={title || "Untitled course"} />
            <Row k="Description" v={short || "—"} />
            <Row k="Game" v={games.find((g) => g.slug === game)!.name} />
            <Row k="Category" v={categories.find((c) => c.slug === category)!.name} />
            <Row k="Difficulty" v={difficulty} />
            <Row k="Curriculum" v={`${modules.length} modules · ${totalLessons} lessons`} />
            <Row k="Price" v={free ? "Free" : `$${price}`} />
            <Row k="Your payout" v={free ? "—" : `$${payout.toFixed(2)} per sale`} />
          </div>
        )}

        <div className="flex justify-between border-t border-border pt-5">
          <Btn variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))}>
            Back
          </Btn>
          {step < 3 ? (
            <Btn onClick={() => setStep((s) => Math.min(3, s + 1))}>Continue</Btn>
          ) : (
            <Btn onClick={() => setPublished(true)}>Publish course</Btn>
          )}
        </div>
      </Card>
    </main>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border/70 pb-2">
      <span className="text-muted-foreground">{k}</span>
      <span className="text-right font-medium">{v}</span>
    </div>
  );
}
