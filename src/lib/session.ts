import { useEffect, useState } from "react";

const KEY = "starbound.session";

export type Session = {
  signedIn: boolean;
  name: string;
  initials: string;
  games: string[];
  goal: string;
  skill: string;
};

const guest: Session = {
  signedIn: false,
  name: "Guest",
  initials: "AE",
  games: ["valorant"],
  goal: "Aim & mechanics",
  skill: "Platinum",
};

const listeners = new Set<(s: Session) => void>();
let current: Session = guest;

function read(): Session {
  if (typeof window === "undefined") return guest;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...guest, ...(JSON.parse(raw) as Partial<Session>) } : guest;
  } catch {
    return guest;
  }
}

export function setSession(patch: Partial<Session>) {
  current = { ...current, ...patch };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(current));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l(current));
}

export function useSession() {
  const [session, setState] = useState<Session>(guest);

  useEffect(() => {
    current = read();
    setState(current);
    const listener = (s: Session) => setState(s);
    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  return session;
}
