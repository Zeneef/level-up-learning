import { createFileRoute, redirect } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession, resetSession, useSession } from "@/lib/session";

export const Route = createFileRoute("/dashboard")({
  // Route guard: bounce signed-out visitors to /login before the page
  // renders. Uses the plain getSession() read (not the hook — hooks only
  // work inside components) since this runs before React mounts.
  beforeLoad: () => {
    if (typeof window !== "undefined" && !getSession().signedIn) {
      throw redirect({ to: "/login" });
    }
  },
  component: DashboardPage,
});

function DashboardPage() {
  const session = useSession();

  if (!session.signedIn) return null; // brief flash before the redirect lands

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Welcome back, {session.name}
          </h1>
          <p className="text-muted-foreground">
            {session.skill} · {session.goal}
          </p>
        </div>
        <Button variant="outline" onClick={() => resetSession()}>
          Sign out
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your courses</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          You haven't enrolled in any courses yet — browse the catalog to get
          started.
        </CardContent>
      </Card>
    </div>
  );
}
