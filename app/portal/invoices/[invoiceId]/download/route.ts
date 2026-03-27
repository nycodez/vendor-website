import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getInvoiceById } from "@/lib/invoices";

function money(amount: number): string {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { invoiceId: string } }
) {
  await requireAuthenticatedUser();

  const invoice = getInvoiceById(params.invoiceId);
  if (!invoice) {
    return NextResponse.json(
      { error: "Invoice not found." },
      { status: 404 }
    );
  }

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([612, 792]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  let y = 738;
  page.drawText("Roam Vendor Services", {
    x: 48,
    y,
    size: 22,
    font: fontBold,
    color: rgb(0.06, 0.22, 0.42)
  });

  y -= 28;
  page.drawText(`Invoice ${invoice.invoiceNumber}`, {
    x: 48,
    y,
    size: 15,
    font: fontBold
  });

  y -= 32;
  const headerRows = [
    `Account Number: ${invoice.accountNumber}`,
    `Property: ${invoice.propertyName} (${invoice.propertyCode})`,
    `Service Agreement: ${invoice.serviceAgreement}`,
    `Service Period: ${invoice.servicePeriodLabel}`,
    `Issue Date: ${invoice.issueDate}`,
    `Due Date: ${invoice.dueDate}`,
    `Billing Contact: ${invoice.billingContact}`
  ];

  for (const row of headerRows) {
    page.drawText(row, {
      x: 48,
      y,
      size: 11,
      font
    });
    y -= 18;
  }

  y -= 12;
  page.drawText("Line items", {
    x: 48,
    y,
    size: 13,
    font: fontBold
  });

  y -= 22;
  for (const item of invoice.lineItems) {
    const lineTotal = item.quantity * item.unitPrice;
    page.drawText(item.description, {
      x: 48,
      y,
      size: 11,
      font
    });
    page.drawText(`${item.quantity} x $${money(item.unitPrice)}`, {
      x: 360,
      y,
      size: 11,
      font
    });
    page.drawText(`$${money(lineTotal)}`, {
      x: 500,
      y,
      size: 11,
      font
    });
    y -= 18;
  }

  y -= 20;
  page.drawText(`Total Due: $${money(invoice.total)}`, {
    x: 392,
    y,
    size: 14,
    font: fontBold
  });

  y -= 40;
  page.drawText("This is a mock invoice generated for browser automation testing.", {
    x: 48,
    y,
    size: 10,
    font,
    color: rgb(0.32, 0.39, 0.48)
  });

  const bytes = await pdf.save();

  return new NextResponse(Buffer.from(bytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${invoice.invoiceNumber}.pdf"`,
      "Cache-Control": "private, no-store"
    }
  });
}
