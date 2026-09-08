import { Link } from "@tanstack/react-router";

const columns = [
  {
    title: "Learn",
    links: [
      { to: "/discover", label: "Discover" },
      { to: "/courses", label: "All courses" },
      { to: "/games", label: "Games" },
      { to: "/categories", label: "Categories" },
    ],
  },
  {
    title: "Create",
    links: [
      { to: "/teach", label: "Become a creator" },
      { to: "/create-course", label: "Create a course" },
      { to: "/dashboard/earnings", label: "Earnings" },
      { to: "/creators", label: "Creators" },
    ],
  },
  {
    title: "Trust",
    links: [
      { to: "/legal", label: "Commission & fees" },
      { to: "/legal", label: "Refund policy" },
      { to: "/legal", label: "Community guidelines" },
      { to: "/legal", label: "Privacy policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-10 border-t border-border pb-24 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-8">
        <div>
          <p className="font-sans text-lg font-bold tracking-[0.18em]">
            STAR<span className="text-gradient">BOUND</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Gaming courses built by players who already climbed. Publishing is free — creators keep
            82% of every sale.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="font-sans text-sm font-semibold">{col.title}</p>
            <ul className="mt-3 grid gap-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs text-muted-foreground md:px-8">
          © {new Date().getFullYear()} STARBOUND. Built for gamers first.
        </p>
      </div>
    </footer>
  );
}
