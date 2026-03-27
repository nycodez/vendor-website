import Link from "next/link";
import { redirectIfAuthenticated } from "@/lib/auth";
import { getVendorProfile } from "@/lib/invoices";

export default async function LoginPage({
  searchParams
}: {
  searchParams?: {
    error?: string;
  };
}) {
  await redirectIfAuthenticated();

  const invalidCredentials = searchParams?.error === "invalid_credentials";
  const profile = getVendorProfile();

  return (
    <main className="login-wrap">
      <section className="login-card">
        <span className="hero__eyebrow">{profile.heroEyebrow}</span>
        <h1>Sign in to {profile.portalName}</h1>
        <p>
          Use the configured portal credentials to review{" "}
          {profile.serviceCategory} invoices and download PDF copies for{" "}
          {profile.vendorName}.
        </p>

        {invalidCredentials ? (
          <div className="callout callout--error">
            The username or password was not recognized.
          </div>
        ) : (
          <div className="callout callout--info">
            Stable selectors: <code>#username</code>, <code>#password</code>,{" "}
            <code>#vendor-login-submit</code>.
          </div>
        )}

        <form
          id="vendor-portal-login-form"
          className="form-grid"
          method="post"
          action="/api/auth/login"
        >
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>

          <button id="vendor-login-submit" className="button" type="submit">
            Sign In
          </button>
        </form>

        <p className="muted" style={{ marginTop: 20 }}>
          Need the public landing page instead? <Link href="/">Go back home</Link>.
        </p>
      </section>
    </main>
  );
}
