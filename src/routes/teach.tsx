import { createFileRoute } from "@tanstack/react-router";
import { BtnLink, Card, Pill } from "@/components/ui";
import { faqs } from "@/lib/data";

export const Route = createFileRoute("/teach")({
  head: () => ({
    meta: [
      { title: "Teach gaming — publish free, keep 82% | STARBOUND" },
      {
        name: "description",
        content:
          "Publishing a gaming course on STARBOUND is free. You only pay an 18% commission when a course sells. Keep your audience, keep your rules.",
      },
      { property: "og:title", content: "Turn your rank into income on STARBOUND" },
      {
        property: "og:description",
        content: "Free to publish, 18% commission only on sales, payouts twice a month.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeachPage,
});

const steps = [
  { n: "01", t: "Outline your course", d: "Modules, lessons and outcomes — our wizard walks you through it." },
  { n: "02", t: "Upload lessons", d: "Video, text, drills and demo reviews. Draft as long as you need." },
  { n: "03", t: "Set your price", d: "Free, paid, or a free intro track with a paid deep dive." },
  { n: "04", t: "Publish and earn", d: "You keep 82% of every sale. Payouts on the 1st and 15th." },
];

function TeachPage() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <Pill tone="bubblegum">Free to publish, forever</Pill>
        <h1 className="mt-5 max-w-3xl font-sans text-4xl font-bold md:text-6xl">
          Your rank is knowledge. <span className="text-gradient">Turn it into income.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Creating a course on STARBOUND costs nothing. We take an 18% commission only when you make
          a sale — no listing fees, no subscription, no exclusivity.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <BtnLink to="/create-course" size="lg">
            Start your course
          </BtnLink>
          <BtnLink to="/dashboard/earnings" variant="outline" size="lg">
            See the earnings model
          </BtnLink>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-6 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <Card key={s.n}>
              <p className="font-sans text-sm text-primary">{s.n}</p>
              <p className="mt-2 font-sans font-semibold">{s.t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <h2 className="text-xl font-semibold md:text-2xl">What you take home</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { p: "$19 course", y: "$15.58" },
            { p: "$39 course", y: "$31.98" },
            { p: "$65 course", y: "$53.30" },
          ].map((r) => (
            <Card key={r.p}>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">{r.p}</p>
              <p className="mt-2 font-sans text-2xl font-semibold">{r.y}</p>
              <p className="mt-1 text-xs text-muted-foreground">per sale after 18% commission</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 pb-20 md:px-8">
        <h2 className="text-xl font-semibold md:text-2xl">Creator questions</h2>
        <div className="mt-6 grid gap-3">
          {faqs.map((f) => (
            <Card key={f.q}>
              <p className="font-sans font-semibold">{f.q}</p>
              <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
