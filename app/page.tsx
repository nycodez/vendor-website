import Link from "next/link";
import { invoiceTotals, listInvoices } from "@/lib/invoices";

export default function HomePage() {
  const totals = invoiceTotals();
  const invoices = listInvoices();

  return (
    <main className="shell">
      <section className="hero">
        <span className="hero__eyebrow">Vendor Portal Demo</span>
        <h1>Authenticated vendor billing website for browser automation testing.</h1>
        <p>
          This mock portal is designed to behave like a real service vendor site:
          operators log in with a username and password, land on a protected account
          dashboard, and download invoice PDFs from a stable invoice listing.
        </p>
        <div className="hero__actions">
          <Link className="button" href="/login">
            Sign In To Portal
          </Link>
          <a className="button--secondary" href="#automation-notes">
            View Automation Notes
          </a>
        </div>
      </section>

      <section className="grid grid--three" style={{ marginTop: 24 }}>
        <article className="stats">
          <p className="stats__label">Open invoices</p>
          <p className="stats__value">{totals.openInvoiceCount}</p>
        </article>
        <article className="stats">
          <p className="stats__label">Amount due</p>
          <p className="stats__value">
            $
            {totals.totalAmount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
        </article>
        <article className="stats">
          <p className="stats__label">Next due date</p>
          <p className="stats__value">{totals.nextDueDate || "N/A"}</p>
        </article>
      </section>

      <section className="panel" id="automation-notes">
        <h2>Stable selectors for browser automation</h2>
        <p>
          The portal intentionally includes stable ids and classes so the Roam
          browser automation feature can target it reliably.
        </p>
        <div className="grid grid--two">
          <article className="invoice-card">
            <h3>Login page</h3>
            <ul className="line-items">
              <li>
                Username input: <code>#username</code>
              </li>
              <li>
                Password input: <code>#password</code>
              </li>
              <li>
                Submit button: <code>#vendor-login-submit</code>
              </li>
            </ul>
          </article>
          <article className="invoice-card">
            <h3>Invoice page</h3>
            <ul className="line-items">
              <li>
                Invoice list rows: <code>.vendor-invoice-row</code>
              </li>
              <li>
                Download links: <code>.vendor-download-link</code>
              </li>
              <li>
                Protected invoice listing URL: <code>/portal/invoices</code>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel">
        <h2>Current service invoices</h2>
        <p>
          These are the mock invoices that will appear after authentication.
        </p>
        <div className="grid grid--three">
          {invoices.map((invoice) => (
            <article className="invoice-card" key={invoice.id}>
              <span className="pill">Ready for download</span>
              <h3>{invoice.invoiceNumber}</h3>
              <p>{invoice.serviceAgreement}</p>
              <div className="invoice-card__meta">
                <span>Service period: {invoice.servicePeriodLabel}</span>
                <span>Due: {invoice.dueDate}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
