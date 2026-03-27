import "server-only";

import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SESSION_COOKIE_NAME = "vendor_portal_session";

function configuredCredentials() {
  return {
    username: process.env.VENDOR_PORTAL_USERNAME || "landscaping-demo",
    password: process.env.VENDOR_PORTAL_PASSWORD || "Roam2023"
  };
}

function sessionSecret(): string {
  return process.env.VENDOR_PORTAL_SESSION_SECRET || "local-demo-session-secret";
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 12
  };
}

export function buildSessionToken(username: string): string {
  return crypto
    .createHmac("sha256", sessionSecret())
    .update(username)
    .digest("hex");
}

export function validateCredentials(username: string, password: string): boolean {
  const expected = configuredCredentials();
  return username === expected.username && password === expected.password;
}

export async function getAuthenticatedUser(): Promise<string | null> {
  const cookieStore = await cookies();
  const currentToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const expectedUsername = configuredCredentials().username;

  if (!currentToken) {
    return null;
  }

  return currentToken === buildSessionToken(expectedUsername) ? expectedUsername : null;
}

export async function requireAuthenticatedUser(): Promise<string> {
  const username = await getAuthenticatedUser();

  if (!username) {
    redirect("/login");
  }

  return username;
}

export async function redirectIfAuthenticated(): Promise<void> {
  const username = await getAuthenticatedUser();
  if (username) {
    redirect("/portal");
  }
}
