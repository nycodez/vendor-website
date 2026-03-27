import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  buildSessionToken,
  sessionCookieOptions,
  validateCredentials
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  if (!validateCredentials(username, password)) {
    return NextResponse.redirect(
      new URL("/login?error=invalid_credentials", request.url),
      { status: 303 }
    );
  }

  const response = NextResponse.redirect(new URL("/portal", request.url), {
    status: 303
  });
  response.cookies.set(
    SESSION_COOKIE_NAME,
    buildSessionToken(username),
    sessionCookieOptions()
  );

  return response;
}
