export interface VendorInvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface VendorInvoice {
  id: string;
  invoiceNumber: string;
  accountNumber: string;
  serviceAgreement: string;
  issueDate: string;
  dueDate: string;
  servicePeriodLabel: string;
  billingContact: string;
  propertyName: string;
  propertyCode: string;
  total: number;
  currency: "USD";
  lineItems: VendorInvoiceLineItem[];
}

export interface VendorStatement {
  id: string;
  statementNumber: string;
  accountNumber: string;
  periodLabel: string;
  statementDate: string;
  dueDate: string;
  propertyName: string;
  propertyCode: string;
  previousBalance: number;
  newCharges: number;
  paymentsReceived: number;
  balanceDue: number;
  currency: "USD";
}

const invoiceSeed: VendorInvoice[] = [
  {
    id: "invoice-janitorial-mar-2026",
    invoiceNumber: "RS-INV-260301",
    accountNumber: "A-24088",
    serviceAgreement: "Nightly janitorial and restroom stocking",
    issueDate: "2026-03-01",
    dueDate: "2026-03-15",
    servicePeriodLabel: "February 2026",
    billingContact: "AP Team",
    propertyName: "Lakeside Towers HOA",
    propertyCode: "LTHOA-01",
    total: 1840,
    currency: "USD",
    lineItems: [
      {
        description: "Nightly janitorial service",
        quantity: 20,
        unitPrice: 72
      },
      {
        description: "Restroom consumables replenishment",
        quantity: 1,
        unitPrice: 400
      }
    ]
  },
  {
    id: "invoice-elevator-q1-2026",
    invoiceNumber: "RS-INV-260302",
    accountNumber: "A-24088",
    serviceAgreement: "Elevator inspection and preventive maintenance",
    issueDate: "2026-03-03",
    dueDate: "2026-03-17",
    servicePeriodLabel: "Q1 2026",
    billingContact: "AP Team",
    propertyName: "Lakeside Towers HOA",
    propertyCode: "LTHOA-01",
    total: 2650,
    currency: "USD",
    lineItems: [
      {
        description: "Quarterly preventive maintenance",
        quantity: 1,
        unitPrice: 2250
      },
      {
        description: "Call-back adjustment labor",
        quantity: 2,
        unitPrice: 200
      }
    ]
  },
  {
    id: "invoice-landscape-mar-2026",
    invoiceNumber: "RS-INV-260303",
    accountNumber: "A-24088",
    serviceAgreement: "Landscape maintenance and irrigation checks",
    issueDate: "2026-03-05",
    dueDate: "2026-03-20",
    servicePeriodLabel: "March 2026",
    billingContact: "AP Team",
    propertyName: "Lakeside Towers HOA",
    propertyCode: "LTHOA-01",
    total: 1325,
    currency: "USD",
    lineItems: [
      {
        description: "Landscape maintenance visit",
        quantity: 5,
        unitPrice: 225
      },
      {
        description: "Irrigation controller inspection",
        quantity: 1,
        unitPrice: 200
      }
    ]
  }
];

const statementSeed: VendorStatement[] = [
  {
    id: "statement-2026-03",
    statementNumber: "RS-STMT-2603",
    accountNumber: "A-24088",
    periodLabel: "March 2026",
    statementDate: "2026-03-31",
    dueDate: "2026-04-15",
    propertyName: "Lakeside Towers HOA",
    propertyCode: "LTHOA-01",
    previousBalance: 1845,
    newCharges: 5815,
    paymentsReceived: 2100,
    balanceDue: 5560,
    currency: "USD"
  },
  {
    id: "statement-2026-02",
    statementNumber: "RS-STMT-2602",
    accountNumber: "A-24088",
    periodLabel: "February 2026",
    statementDate: "2026-02-28",
    dueDate: "2026-03-15",
    propertyName: "Lakeside Towers HOA",
    propertyCode: "LTHOA-01",
    previousBalance: 960,
    newCharges: 4440,
    paymentsReceived: 3555,
    balanceDue: 1845,
    currency: "USD"
  },
  {
    id: "statement-2026-01",
    statementNumber: "RS-STMT-2601",
    accountNumber: "A-24088",
    periodLabel: "January 2026",
    statementDate: "2026-01-31",
    dueDate: "2026-02-14",
    propertyName: "Lakeside Towers HOA",
    propertyCode: "LTHOA-01",
    previousBalance: 1320,
    newCharges: 3675,
    paymentsReceived: 4035,
    balanceDue: 960,
    currency: "USD"
  },
  {
    id: "statement-2025-12",
    statementNumber: "RS-STMT-2512",
    accountNumber: "A-24088",
    periodLabel: "December 2025",
    statementDate: "2025-12-31",
    dueDate: "2026-01-15",
    propertyName: "Lakeside Towers HOA",
    propertyCode: "LTHOA-01",
    previousBalance: 1480,
    newCharges: 3420,
    paymentsReceived: 3580,
    balanceDue: 1320,
    currency: "USD"
  },
  {
    id: "statement-2025-11",
    statementNumber: "RS-STMT-2511",
    accountNumber: "A-24088",
    periodLabel: "November 2025",
    statementDate: "2025-11-30",
    dueDate: "2025-12-15",
    propertyName: "Lakeside Towers HOA",
    propertyCode: "LTHOA-01",
    previousBalance: 1225,
    newCharges: 3890,
    paymentsReceived: 3635,
    balanceDue: 1480,
    currency: "USD"
  }
];

export function listInvoices(): VendorInvoice[] {
  return [...invoiceSeed];
}

export function getInvoiceById(invoiceId: string): VendorInvoice | null {
  return invoiceSeed.find((invoice) => invoice.id === invoiceId) || null;
}

export function listStatements(): VendorStatement[] {
  return [...statementSeed];
}

export function getStatementById(statementId: string): VendorStatement | null {
  return statementSeed.find((statement) => statement.id === statementId) || null;
}

export function invoiceTotals() {
  const invoices = listInvoices();
  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const statements = listStatements();
  const openAccountBalance = statements[0]?.balanceDue ?? totalAmount;

  return {
    openInvoiceCount: invoices.length,
    totalAmount,
    openAccountBalance,
    nextDueDate: invoices
      .map((invoice) => invoice.dueDate)
      .sort((left, right) => left.localeCompare(right))[0] || null
  };
}
