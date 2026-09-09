import { createFileRoute } from "@tanstack/react-router";
import { BtnLink, Card, Pill, Stat } from "@/components/ui";
import { coursesData } from "@/lib/data";

export const Route = createFileRoute("/dashboard/earnings")({
  head: () => ({
    meta: [
      { title: "Earnings and payouts | STARBOUND" },
      {
        name: "description",
        content:
          "See sales, commission and payout schedule for your gaming courses. Creators keep 82% of every sale.",
      },
      { property: "og:title", content: "Creator earnings on STARBOUND" },
      { property: "og:description", content: "82% revenue share, payouts on the 1st and 15th." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EarningsPage,
});

const months = [
  { m: "Apr", v: 1420 },
  { m: "May", v: 2180 },
  { m: "Jun", v: 1960 },
  { m: "Jul", v: 3240 },
  { m: "Aug", v: 4120 },
  { m: "Sep", v: 4870 },
];

function EarningsPage() {
  const mine = coursesData.filter((c) => c.creator === "fytch");
  const peak = Math.max(...months.map((m) => m.v));
  const lifetime = mine.reduce((n, c) => n + c.price * c.students * 0.82, 0);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <Pill tone="galaxy">82% revenue share</Pill>
      <h1 className="mt-4 font-sans text-3xl font-bold md:text-4xl">Earnings</h1>
      <p className="mt-2 text-muted-foreground">
        Commission is only charged on completed sales. Payouts run on the 1st and 15th.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Available balance" value="$1,284.40" hint="Next payout Sep 15" />
        <Stat label="This month" value="$4,870" hint="+18% vs August" />
        <Stat label="Lifetime payout" value={`$${Math.round(lifetime).toLocaleString()}`} />
        <Stat label="Refund rate" value="1.4%" hint="Platform average: 2.1%" />
      </div>

      <Card className="mt-8">
        <p className="font-sans font-semibold">Last 6 months</p>
        <div className="mt-6 flex h-40 items-end gap-3">
          {months.map((m) => (
            <div key={m.m} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-lg bg-gradient-brand"
                style={{ height: `${(m.v / peak) * 100}%` }}
                title={`$${m.v}`}
              />
              <span className="text-xs text-muted-foreground">{m.m}</span>
            </div>
          ))}
        </div>
      </Card>

      <h2 className="mt-12 text-xl font-semibold">Per course</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs tracking-wide text-muted-foreground uppercase">
              <th className="py-3">Course</th>
              <th className="py-3">Price</th>
              <th className="py-3">Students</th>
              <th className="py-3">Gross</th>
              <th className="py-3">Your share</th>
            </tr>
          </thead>
          <tbody>
            {mine.map((c) => {
              const gross = c.price * c.students;
              return (
                <tr key={c.slug} className="border-b border-border/70">
                  <td className="py-3 font-medium">{c.title}</td>
                  <td className="py-3">{c.price === 0 ? "Free" : `$${c.price}`}</td>
                  <td className="py-3">{c.students.toLocaleString()}</td>
                  <td className="py-3">${gross.toLocaleString()}</td>
                  <td className="py-3 text-foreground">
                    ${Math.round(gross * 0.82).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <BtnLink to="/create-course">Create another course</BtnLink>
        <BtnLink to="/legal" variant="outline">
          Commission & payout terms
        </BtnLink>
      </div>
    </main>
  );
}
