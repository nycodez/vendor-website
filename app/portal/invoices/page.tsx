import Link from "next/link";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getVendorProfile, listInvoices, listStatements } from "@/lib/invoices";

export default async function InvoicesPage() {
  await requireAuthenticatedUser();
  const profile = getVendorProfile();
  const invoices = listInvoices();
  const statements = listStatements();

  return (
    <main className="shell">
      <header className="site-header">
        <Link href="/portal" className="site-brand">
          <p className="site-brand__title">{profile.vendorName} Invoice Center</p>
          <p className="site-brand__subtitle">
            Protected billing resources and downloadable {profile.serviceCategory} invoices
          </p>
        </Link>

        <div className="toolbar">
          <Link className="button--secondary" href="/portal">
            Back to dashboard
          </Link>
          <form method="post" action="/api/auth/logout">
            <button className="button" type="submit">
              Sign Out
            </button>
          </form>
        </div>
      </header>

      <section className="panel">
        <span className="hero__eyebrow">Invoice Downloads</span>
        <h1>{profile.vendorName} invoices ready for retrieval</h1>
        <p>
          Each invoice includes a stable direct download link. The recommended
          browser automation target URL is <code>/portal/invoices</code> and the
          recommended selector is <code>.vendor-download-link</code>.
        </p>
      </section>

      <section className="invoice-table">
        <table id="vendor-invoice-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Service period</th>
              <th>Issue date</th>
              <th>Due date</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr className="vendor-invoice-row" id={invoice.id} key={invoice.id}>
                <td>
                  <strong>{invoice.invoiceNumber}</strong>
                  <div className="muted">{invoice.serviceAgreement}</div>
                </td>
                <td>{invoice.servicePeriodLabel}</td>
                <td>{invoice.issueDate}</td>
                <td>{invoice.dueDate}</td>
                <td>${invoice.total.toFixed(2)}</td>
                <td>
                  <div className="invoice-actions">
                    <Link
                      className="vendor-invoice-link"
                      href={`/portal/invoices#${invoice.id}`}
                    >
                      View row
                    </Link>
                    <Link
                      className="vendor-download-link"
                      href={`/portal/invoices/${invoice.id}/download`}
                    >
                      Download PDF
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="invoice-table" id="statement-downloads">
        <table id="vendor-statement-table">
          <thead>
            <tr>
              <th>Statement period</th>
              <th>Statement date</th>
              <th>Due date</th>
              <th>Previous balance</th>
              <th>New charges</th>
              <th>Balance due</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {statements.map((statement) => (
              <tr className="vendor-statement-row" id={statement.id} key={statement.id}>
                <td>
                  <strong>{statement.periodLabel}</strong>
                  <div className="muted">{statement.statementNumber}</div>
                </td>
                <td>{statement.statementDate}</td>
                <td>{statement.dueDate}</td>
                <td>${statement.previousBalance.toFixed(2)}</td>
                <td>${statement.newCharges.toFixed(2)}</td>
                <td>${statement.balanceDue.toFixed(2)}</td>
                <td>
                  <div className="invoice-actions">
                    <Link
                      className="vendor-invoice-link"
                      href={`/portal/invoices#${statement.id}`}
                    >
                      View row
                    </Link>
                    <a
                      className="vendor-statement-download-link"
                      href={`/portal/statements/${statement.id}/download`}
                    >
                      Download statement PDF
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
