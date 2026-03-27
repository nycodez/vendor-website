# vendor-website

Mock vendor billing portal for testing Roam browser automation against a real
username/password workflow.

## Purpose

This app is meant to be deployed to Vercel and used as a stable test target for:

- authenticated browser login
- portal navigation as a registered user
- invoice discovery
- invoice PDF downloads
- AP-style browser automation runs

## Stack

- Next.js App Router
- TypeScript
- Server-side cookie auth
- Generated PDF invoices via `pdf-lib`

## Environment variables

Copy `.env.example` into `.env.local` for local testing.

Required values:

- `VENDOR_PROFILE`
- `VENDOR_PORTAL_USERNAME`
- `VENDOR_PORTAL_PASSWORD`
- `VENDOR_PORTAL_SESSION_SECRET`

Available profile keys:

- `landscaping`
- `plumber`
- `doorking`

## Local run

```bash
npm install
npm run dev
```

## Vercel deployment

1. Create a new Vercel project from this folder.
2. Set the environment variables from `.env.example`.
3. Deploy.

## Stable selectors for browser automation

Login page:

- username: `#username`
- password: `#password`
- submit: `#vendor-login-submit`

Invoice page:

- target URL: `/portal/invoices`
- invoice rows: `.vendor-invoice-row`
- download links: `.vendor-download-link`
- statement rows: `.vendor-statement-row`
- statement download links: `.vendor-statement-download-link`

## Recommended Roam browser automation test config

- `baseUrl`: deployed site base URL
- `loginUrl`: `/login`
- `usernameSelector`: `#username`
- `passwordSelector`: `#password`
- `submitSelector`: `#vendor-login-submit`
- `taskType`: `download_files`
- `targetUrl`: `/portal/invoices`
- `downloadSelector`: `.vendor-download-link`

## Demo defaults

If no environment variables are set, the app falls back to:

- profile: `landscaping`
- username: `portal-demo`
- password: `demo-password-2026`

These defaults are for development only.
