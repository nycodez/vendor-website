import Link from "next/link";
import { requireAuthenticatedUser } from "@/lib/auth";
import { invoiceTotals, listInvoices, listStatements } from "@/lib/invoices";

export default async function PortalHomePage() {
  const username = await requireAuthenticatedUser();
  const totals = invoiceTotals();
  const invoices = listInvoices().slice(0, 2);
  const statements = listStatements().slice(0, 5);

  return (
    <main className="shell">
      <header className="site-header">
        <Link href="/portal" className="site-brand">
          <p className="site-brand__title">Roam Vendor Billing Portal</p>
          <p className="site-brand__subtitle">Signed in as {username}</p>
        </Link>

        <div className="toolbar">
          <Link className="button--secondary" href="/portal/invoices">
            View All Invoices
          </Link>
          <form method="post" action="/api/auth/logout">
            <button className="button" type="submit">
              Sign Out
            </button>
          </form>
        </div>
      </header>

      <section className="panel">
        <span className="hero__eyebrow">Account Dashboard</span>
        <h1>Active service account for Lakeside Towers HOA</h1>
        <p>
          This protected account shows outstanding service invoices generated
          under the customer service agreements on file. Use the invoices page to
          download each invoice PDF.
        </p>
      </section>

      <section className="grid grid--three" style={{ marginTop: 24 }}>
        <article className="stats">
          <p className="stats__label">Open invoices</p>
          <p className="stats__value">{totals.openInvoiceCount}</p>
        </article>
        <article className="stats">
          <p className="stats__label">Outstanding amount</p>
          <p className="stats__value">
            $
            {totals.totalAmount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </p>
        </article>
        <article className="stats">
          <p className="stats__label">Open account balance</p>
          <p className="stats__value">
            ${totals.openAccountBalance.toLocaleString("en-US", {
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

      <section className="panel">
        <h2>Recent invoice activity</h2>
        <div className="grid grid--two">
          {invoices.map((invoice) => (
            <article className="invoice-card" key={invoice.id}>
              <span className="pill">Invoice ready</span>
              <h3>{invoice.invoiceNumber}</h3>
              <p>{invoice.serviceAgreement}</p>
              <div className="detail-grid">
                <div>
                  <strong>Service period</strong>
                  <span>{invoice.servicePeriodLabel}</span>
                </div>
                <div>
                  <strong>Due date</strong>
                  <span>{invoice.dueDate}</span>
                </div>
                <div>
                  <strong>Total due</strong>
                  <span>${invoice.total.toFixed(2)}</span>
                </div>
              </div>
              <div className="panel__actions" style={{ marginTop: 18 }}>
                <Link className="vendor-invoice-link" href="/portal/invoices">
                  Open invoice center
                </Link>
                <Link
                  className="vendor-download-link"
                  href={`/portal/invoices/${invoice.id}/download`}
                >
                  Download PDF
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="site-header" style={{ marginBottom: 16 }}>
          <div>
            <h2>Monthly statement downloads</h2>
            <p>
              Past five months of statements with current balance due and downloadable PDF copies.
            </p>
          </div>
          <Link className="button--secondary" href="/portal/invoices#statement-downloads">
            Open statements section
          </Link>
        </div>

        <div className="statement-grid">
          {statements.map((statement) => (
            <article className="invoice-card statement-card" key={statement.id}>
              <span className="pill">Statement available</span>
              <h3>{statement.periodLabel}</h3>
              <p>{statement.statementNumber}</p>
              <div className="detail-grid">
                <div>
                  <strong>Statement date</strong>
                  <span>{statement.statementDate}</span>
                </div>
                <div>
                  <strong>Due date</strong>
                  <span>{statement.dueDate}</span>
                </div>
                <div>
                  <strong>Balance due</strong>
                  <span>${statement.balanceDue.toFixed(2)}</span>
                </div>
              </div>
              <div className="panel__actions" style={{ marginTop: 18 }}>
                <a
                  className="vendor-statement-download-link"
                  href={`/portal/statements/${statement.id}/download`}
                >
                  Download statement PDF
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
