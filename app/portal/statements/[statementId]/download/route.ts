import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getStatementById } from "@/lib/invoices";

function money(amount: number): string {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { statementId: string } }
) {
  await requireAuthenticatedUser();

  const statement = getStatementById(params.statementId);
  if (!statement) {
    return NextResponse.json({ error: "Statement not found." }, { status: 404 });
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
  page.drawText(`Account Statement ${statement.statementNumber}`, {
    x: 48,
    y,
    size: 15,
    font: fontBold
  });

  y -= 32;
  const rows = [
    `Account Number: ${statement.accountNumber}`,
    `Property: ${statement.propertyName} (${statement.propertyCode})`,
    `Statement Period: ${statement.periodLabel}`,
    `Statement Date: ${statement.statementDate}`,
    `Payment Due Date: ${statement.dueDate}`
  ];

  for (const row of rows) {
    page.drawText(row, {
      x: 48,
      y,
      size: 11,
      font
    });
    y -= 18;
  }

  y -= 24;
  page.drawText("Account Activity", {
    x: 48,
    y,
    size: 13,
    font: fontBold
  });

  y -= 24;
  const amounts: Array<[string, number]> = [
    ["Previous balance", statement.previousBalance],
    ["New charges", statement.newCharges],
    ["Payments received", -statement.paymentsReceived],
    ["Balance due", statement.balanceDue]
  ];

  for (const [label, amount] of amounts) {
    page.drawText(label, {
      x: 48,
      y,
      size: 11,
      font
    });
    page.drawText(
      `${amount < 0 ? "-" : ""}$${money(Math.abs(amount))}`,
      {
        x: 470,
        y,
        size: 11,
        font: label === "Balance due" ? fontBold : font
      }
    );
    y -= 20;
  }

  y -= 32;
  page.drawText("Please remit the balance due by the payment due date.", {
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
      "Content-Disposition": `attachment; filename="${statement.statementNumber}.pdf"`,
      "Cache-Control": "private, no-store"
    }
  });
}
