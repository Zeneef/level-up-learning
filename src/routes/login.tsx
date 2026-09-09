import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Btn, Card } from "@/components/ui";
import { setSession } from "@/lib/session";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in to STARBOUND" },
      {
        name: "description",
        content: "Log in to continue your gaming courses, track progress and manage your creator studio.",
      },
      { property: "og:title", content: "Log in to STARBOUND" },
      { property: "og:description", content: "Pick up your courses where you left off." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

const field =
  "mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-primary";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const name = email.split("@")[0] || "Player";
    setSession({
      signedIn: true,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      initials: name.slice(0, 2).toUpperCase(),
    });
    navigate({ to: "/dashboard" });
  }

  return (
    <main className="mx-auto flex max-w-md flex-col px-5 py-16 md:px-8 md:py-24">
      <h1 className="font-sans text-3xl font-bold">Welcome back</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Log in to keep climbing. No account?{" "}
        <Link to="/signup" className="text-primary">
          Sign up free
        </Link>
        .
      </p>

      <Card className="mt-8">
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              className={field}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input className={field} type="password" required placeholder="••••••••" />
          </div>
          <Btn type="submit" className="w-full">
            Log in
          </Btn>
        </form>
      </Card>
    </main>
  );
}
