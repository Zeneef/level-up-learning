import { z } from "zod";

import { setSession } from "@/lib/session";

// ---------- Validation schemas ----------

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginValues = z.infer<typeof loginSchema>;

// ---------- Credential storage ----------
// Deliberately separate from session.ts: `session.ts` owns the *public*
// broadcast profile (name, initials, games, signedIn...) that Nav and
// everything else reads. This file holds the private bits — email +
// hashed password — needed only to verify a login, and only ever touches
// the shared session by calling `setSession()`.

interface StoredCredential {
  email: string;
  passwordHash: string;
  salt: string;
  name: string;
}

const CREDENTIALS_KEY = "starbound.credentials";

function randomSalt(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hashPassword(password: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(salt + password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getCredentials(): StoredCredential[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(CREDENTIALS_KEY);
  return raw ? (JSON.parse(raw) as StoredCredential[]) : [];
}

function saveCredentials(list: StoredCredential[]) {
  window.localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(list));
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export async function registerUser(values: SignUpValues): Promise<void> {
  const credentials = getCredentials();
  const exists = credentials.some(
    (c) => c.email.toLowerCase() === values.email.toLowerCase(),
  );
  if (exists) {
    throw new Error("An account with this email already exists");
  }

  const salt = randomSalt();
  const passwordHash = await hashPassword(values.password, salt);
  saveCredentials([
    ...credentials,
    { email: values.email, passwordHash, salt, name: values.name },
  ]);

  // This is what makes Nav, the dashboard, etc. see the new user —
  // session.ts broadcasts this to every `useSession()` listener.
  setSession({
    signedIn: true,
    name: values.name,
    initials: getInitials(values.name),
  });
}

export async function loginUser(values: LoginValues): Promise<void> {
  const credentials = getCredentials();
  const match = credentials.find(
    (c) => c.email.toLowerCase() === values.email.toLowerCase(),
  );
  if (!match) {
    throw new Error("No account found with this email");
  }

  const hash = await hashPassword(values.password, match.salt);
  if (hash !== match.passwordHash) {
    throw new Error("Incorrect password");
  }

  setSession({
    signedIn: true,
    name: match.name,
    initials: getInitials(match.name),
  });
}
