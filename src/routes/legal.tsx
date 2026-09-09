import { createFileRoute } from "@tanstack/react-router";
import { Card, Pill } from "@/components/ui";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Commission, refunds and community rules | STARBOUND" },
      {
        name: "description",
        content:
          "How STARBOUND handles commission and payouts, refunds within 14 days, community guidelines and privacy.",
      },
      { property: "og:title", content: "STARBOUND trust and policies" },
      {
        property: "og:description",
        content: "Clear commission, a 14-day refund window and rules that protect learners.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LegalPage,
});

const sections = [
  {
    id: "commission",
    title: "Commission & fees",
    body: [
      "Creating and publishing a course is free. There are no listing fees and no subscription.",
      "STARBOUND charges an 18% commission on each completed sale. Creators keep 82%.",
      "Payment processing is included in the commission. Free courses cost creators nothing.",
      "Payouts run on the 1st and 15th of each month, with a $25 minimum balance.",
    ],
  },
  {
    id: "refunds",
    title: "Refund policy",
    body: [
      "Paid courses are refundable within 14 days of purchase if less than 30% of the lessons have been completed.",
      "Refunds are returned to the original payment method within 5–10 business days.",
      "Repeated refund abuse can result in purchase restrictions on the account.",
    ],
  },
  {
    id: "guidelines",
    title: "Community guidelines",
    body: [
      "Courses must teach legitimate skill improvement. Cheats, exploits, account boosting and account selling are banned.",
      "Creators must own or license all footage and audio they upload.",
      "Reviews must come from real students. Incentivised or traded reviews are removed.",
      "Harassment, hate speech and doxxing lead to immediate removal from the platform.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy policy",
    body: [
      "We collect the account details you give us plus basic learning progress so your courses resume correctly.",
      "We never sell personal data. Payment details are handled by our payment processor, not stored by us.",
      "You can export or delete your account data at any time from your dashboard settings.",
    ],
  },
];

function LegalPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10 md:px-8 md:py-14">
      <Pill tone="galaxy">Trust centre</Pill>
      <h1 className="mt-4 font-sans text-3xl font-bold md:text-4xl">Policies</h1>
      <p className="mt-2 text-muted-foreground">
        Plain-language terms. Last updated {new Date().getFullYear()}.
      </p>

      <nav className="mt-6 flex flex-wrap gap-2">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`}>
            <Pill>{s.title}</Pill>
          </a>
        ))}
      </nav>

      <div className="mt-8 grid gap-4">
        {sections.map((s) => (
          <Card key={s.id} className="scroll-mt-24" >
            <h2 id={s.id} className="font-sans text-lg font-semibold">
              {s.title}
            </h2>
            <ul className="mt-3 grid gap-2">
              {s.body.map((b) => (
                <li key={b} className="text-sm text-muted-foreground">
                  {b}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </main>
  );
}
