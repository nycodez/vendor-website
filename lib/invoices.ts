import "server-only";

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

export type VendorProfileKey = "landscaping" | "plumber" | "doorking";

export interface VendorPortalProfile {
  key: VendorProfileKey;
  vendorName: string;
  portalName: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  dashboardTitle: string;
  dashboardDescription: string;
  accountLabel: string;
  serviceCategory: string;
  invoices: VendorInvoice[];
  statements: VendorStatement[];
}

const HOA_NAME = "Chattahoochee Reserve HOA";
const HOA_CODE = "CRHOA-01";

const profiles: Record<VendorProfileKey, VendorPortalProfile> = {
  landscaping: {
    key: "landscaping",
    vendorName: "Greenway Grounds & Irrigation",
    portalName: "Greenway Vendor Portal",
    heroEyebrow: "Landscape Services Portal",
    heroTitle: "Landscape maintenance billing portal for recurring grounds service.",
    heroDescription:
      "This deployment represents a recurring landscaping vendor that invoices monthly for mowing, irrigation inspection, seasonal planting, and enhancement work.",
    dashboardTitle: `Landscape service account for ${HOA_NAME}`,
    dashboardDescription:
      "Review recurring landscaping invoices, irrigation inspection charges, and monthly statements for the active grounds maintenance agreement.",
    accountLabel: "Landscape maintenance master agreement",
    serviceCategory: "landscaping",
    invoices: [
      {
        id: "landscape-invoice-2026-03",
        invoiceNumber: "GG-INV-260301",
        accountNumber: "LAND-24088",
        serviceAgreement: "Monthly grounds maintenance and irrigation inspection",
        issueDate: "2026-03-01",
        dueDate: "2026-03-15",
        servicePeriodLabel: "March 2026",
        billingContact: "AP Team",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        total: 2185,
        currency: "USD",
        lineItems: [
          { description: "Weekly landscape maintenance visits", quantity: 5, unitPrice: 325 },
          { description: "Irrigation controller and valve inspection", quantity: 1, unitPrice: 410 },
          { description: "Seasonal flower rotation", quantity: 1, unitPrice: 150 }
        ]
      },
      {
        id: "landscape-invoice-2026-02",
        invoiceNumber: "GG-INV-260201",
        accountNumber: "LAND-24088",
        serviceAgreement: "Monthly grounds maintenance and mulch refresh",
        issueDate: "2026-02-03",
        dueDate: "2026-02-17",
        servicePeriodLabel: "February 2026",
        billingContact: "AP Team",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        total: 2640,
        currency: "USD",
        lineItems: [
          { description: "Landscape maintenance visits", quantity: 4, unitPrice: 325 },
          { description: "Mulch top-off at entry beds", quantity: 1, unitPrice: 980 },
          { description: "Irrigation winterization follow-up", quantity: 1, unitPrice: 360 }
        ]
      },
      {
        id: "landscape-invoice-2026-01",
        invoiceNumber: "GG-INV-260101",
        accountNumber: "LAND-24088",
        serviceAgreement: "Monthly grounds maintenance and storm debris cleanup",
        issueDate: "2026-01-05",
        dueDate: "2026-01-19",
        servicePeriodLabel: "January 2026",
        billingContact: "AP Team",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        total: 2435,
        currency: "USD",
        lineItems: [
          { description: "Landscape maintenance visits", quantity: 4, unitPrice: 325 },
          { description: "Storm debris cleanup", quantity: 1, unitPrice: 840 },
          { description: "Tree staking adjustment", quantity: 1, unitPrice: 295 }
        ]
      }
    ],
    statements: [
      {
        id: "landscape-statement-2026-03",
        statementNumber: "GG-STMT-2603",
        accountNumber: "LAND-24088",
        periodLabel: "March 2026",
        statementDate: "2026-03-31",
        dueDate: "2026-04-15",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        previousBalance: 1620,
        newCharges: 2185,
        paymentsReceived: 1200,
        balanceDue: 2605,
        currency: "USD"
      },
      {
        id: "landscape-statement-2026-02",
        statementNumber: "GG-STMT-2602",
        accountNumber: "LAND-24088",
        periodLabel: "February 2026",
        statementDate: "2026-02-28",
        dueDate: "2026-03-15",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        previousBalance: 1180,
        newCharges: 2640,
        paymentsReceived: 2200,
        balanceDue: 1620,
        currency: "USD"
      },
      {
        id: "landscape-statement-2026-01",
        statementNumber: "GG-STMT-2601",
        accountNumber: "LAND-24088",
        periodLabel: "January 2026",
        statementDate: "2026-01-31",
        dueDate: "2026-02-15",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        previousBalance: 980,
        newCharges: 2435,
        paymentsReceived: 2235,
        balanceDue: 1180,
        currency: "USD"
      },
      {
        id: "landscape-statement-2025-12",
        statementNumber: "GG-STMT-2512",
        accountNumber: "LAND-24088",
        periodLabel: "December 2025",
        statementDate: "2025-12-31",
        dueDate: "2026-01-15",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        previousBalance: 765,
        newCharges: 2215,
        paymentsReceived: 2000,
        balanceDue: 980,
        currency: "USD"
      },
      {
        id: "landscape-statement-2025-11",
        statementNumber: "GG-STMT-2511",
        accountNumber: "LAND-24088",
        periodLabel: "November 2025",
        statementDate: "2025-11-30",
        dueDate: "2025-12-15",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        previousBalance: 540,
        newCharges: 1985,
        paymentsReceived: 1760,
        balanceDue: 765,
        currency: "USD"
      }
    ]
  },
  plumber: {
    key: "plumber",
    vendorName: "Rapid Response Plumbing Co.",
    portalName: "Rapid Response Service Portal",
    heroEyebrow: "Emergency Plumbing Portal",
    heroTitle: "Emergency plumbing service portal for on-call dispatch and remediation invoices.",
    heroDescription:
      "This deployment represents an on-call plumbing vendor with urgent service invoices, diagnostic charges, and account statements tied to after-hours work orders.",
    dashboardTitle: `Emergency plumbing account for ${HOA_NAME}`,
    dashboardDescription:
      "Review after-hours dispatch tickets, leak mitigation invoices, and monthly account statements for the plumbing response agreement.",
    accountLabel: "24/7 emergency plumbing response agreement",
    serviceCategory: "plumber",
    invoices: [
      {
        id: "plumber-invoice-2026-03",
        invoiceNumber: "RRP-INV-260301",
        accountNumber: "PLUMB-7742",
        serviceAgreement: "After-hours slab leak response and shutoff repair",
        issueDate: "2026-03-08",
        dueDate: "2026-03-22",
        servicePeriodLabel: "March 2026",
        billingContact: "AP Team",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        total: 3425,
        currency: "USD",
        lineItems: [
          { description: "Emergency dispatch and diagnosis", quantity: 1, unitPrice: 425 },
          { description: "Leak isolation labor", quantity: 6, unitPrice: 320 },
          { description: "Ball valve replacement materials", quantity: 1, unitPrice: 1080 }
        ]
      },
      {
        id: "plumber-invoice-2026-02",
        invoiceNumber: "RRP-INV-260201",
        accountNumber: "PLUMB-7742",
        serviceAgreement: "Drain backup remediation and jetting",
        issueDate: "2026-02-14",
        dueDate: "2026-02-28",
        servicePeriodLabel: "February 2026",
        billingContact: "AP Team",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        total: 2760,
        currency: "USD",
        lineItems: [
          { description: "Emergency dispatch and diagnosis", quantity: 1, unitPrice: 425 },
          { description: "Main line jetting", quantity: 1, unitPrice: 1450 },
          { description: "Camera verification", quantity: 1, unitPrice: 885 }
        ]
      },
      {
        id: "plumber-invoice-2026-01",
        invoiceNumber: "RRP-INV-260101",
        accountNumber: "PLUMB-7742",
        serviceAgreement: "Booster pump room flood response",
        issueDate: "2026-01-11",
        dueDate: "2026-01-25",
        servicePeriodLabel: "January 2026",
        billingContact: "AP Team",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        total: 3155,
        currency: "USD",
        lineItems: [
          { description: "After-hours dispatch", quantity: 1, unitPrice: 475 },
          { description: "Pump room dewatering and repair labor", quantity: 7, unitPrice: 310 },
          { description: "Pressure switch replacement", quantity: 1, unitPrice: 510 }
        ]
      }
    ],
    statements: [
      {
        id: "plumber-statement-2026-03",
        statementNumber: "RRP-STMT-2603",
        accountNumber: "PLUMB-7742",
        periodLabel: "March 2026",
        statementDate: "2026-03-31",
        dueDate: "2026-04-15",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        previousBalance: 1875,
        newCharges: 3425,
        paymentsReceived: 1400,
        balanceDue: 3900,
        currency: "USD"
      },
      {
        id: "plumber-statement-2026-02",
        statementNumber: "RRP-STMT-2602",
        accountNumber: "PLUMB-7742",
        periodLabel: "February 2026",
        statementDate: "2026-02-28",
        dueDate: "2026-03-15",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        previousBalance: 920,
        newCharges: 2760,
        paymentsReceived: 1805,
        balanceDue: 1875,
        currency: "USD"
      },
      {
        id: "plumber-statement-2026-01",
        statementNumber: "RRP-STMT-2601",
        accountNumber: "PLUMB-7742",
        periodLabel: "January 2026",
        statementDate: "2026-01-31",
        dueDate: "2026-02-15",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        previousBalance: 510,
        newCharges: 3155,
        paymentsReceived: 2745,
        balanceDue: 920,
        currency: "USD"
      },
      {
        id: "plumber-statement-2025-12",
        statementNumber: "RRP-STMT-2512",
        accountNumber: "PLUMB-7742",
        periodLabel: "December 2025",
        statementDate: "2025-12-31",
        dueDate: "2026-01-15",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        previousBalance: 0,
        newCharges: 2510,
        paymentsReceived: 2000,
        balanceDue: 510,
        currency: "USD"
      },
      {
        id: "plumber-statement-2025-11",
        statementNumber: "RRP-STMT-2511",
        accountNumber: "PLUMB-7742",
        periodLabel: "November 2025",
        statementDate: "2025-11-30",
        dueDate: "2025-12-15",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        previousBalance: 240,
        newCharges: 1980,
        paymentsReceived: 2220,
        balanceDue: 0,
        currency: "USD"
      }
    ]
  },
  doorking: {
    key: "doorking",
    vendorName: "DoorKing Access Systems Service",
    portalName: "DoorKing Service Portal",
    heroEyebrow: "Gate Access Systems Portal",
    heroTitle: "Entrance gate and access control billing portal for service contracts.",
    heroDescription:
      "This deployment represents a DoorKing-style access systems vendor with monthly maintenance invoices, gate call-out charges, and downloadable account statements.",
    dashboardTitle: `Access systems account for ${HOA_NAME}`,
    dashboardDescription:
      "Review preventive maintenance invoices, gate operator service calls, and rolling statements for your DoorKing entrance control agreement.",
    accountLabel: "Entrance gate and access control service agreement",
    serviceCategory: "doorking",
    invoices: [
      {
        id: "doorking-invoice-2026-03",
        invoiceNumber: "DK-INV-260301",
        accountNumber: "ACCESS-9017",
        serviceAgreement: "Quarterly gate operator maintenance and clicker audit",
        issueDate: "2026-03-04",
        dueDate: "2026-03-18",
        servicePeriodLabel: "March 2026",
        billingContact: "AP Team",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        total: 2895,
        currency: "USD",
        lineItems: [
          { description: "Preventive maintenance visit", quantity: 1, unitPrice: 1380 },
          { description: "Telephone entry system board inspection", quantity: 1, unitPrice: 665 },
          { description: "Remote inventory audit and reprogramming", quantity: 1, unitPrice: 850 }
        ]
      },
      {
        id: "doorking-invoice-2026-02",
        invoiceNumber: "DK-INV-260201",
        accountNumber: "ACCESS-9017",
        serviceAgreement: "After-hours gate entrapment service call",
        issueDate: "2026-02-09",
        dueDate: "2026-02-23",
        servicePeriodLabel: "February 2026",
        billingContact: "AP Team",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        total: 1760,
        currency: "USD",
        lineItems: [
          { description: "Emergency dispatch", quantity: 1, unitPrice: 390 },
          { description: "Limit switch adjustment labor", quantity: 3, unitPrice: 235 },
          { description: "Safety edge replacement", quantity: 1, unitPrice: 665 }
        ]
      },
      {
        id: "doorking-invoice-2026-01",
        invoiceNumber: "DK-INV-260101",
        accountNumber: "ACCESS-9017",
        serviceAgreement: "Entry system telephone line conversion support",
        issueDate: "2026-01-18",
        dueDate: "2026-02-01",
        servicePeriodLabel: "January 2026",
        billingContact: "AP Team",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        total: 2240,
        currency: "USD",
        lineItems: [
          { description: "Service coordination and testing", quantity: 1, unitPrice: 540 },
          { description: "Control board programming labor", quantity: 4, unitPrice: 275 },
          { description: "Surge suppressor replacement", quantity: 1, unitPrice: 600 }
        ]
      }
    ],
    statements: [
      {
        id: "doorking-statement-2026-03",
        statementNumber: "DK-STMT-2603",
        accountNumber: "ACCESS-9017",
        periodLabel: "March 2026",
        statementDate: "2026-03-31",
        dueDate: "2026-04-15",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        previousBalance: 980,
        newCharges: 2895,
        paymentsReceived: 1500,
        balanceDue: 2375,
        currency: "USD"
      },
      {
        id: "doorking-statement-2026-02",
        statementNumber: "DK-STMT-2602",
        accountNumber: "ACCESS-9017",
        periodLabel: "February 2026",
        statementDate: "2026-02-28",
        dueDate: "2026-03-15",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        previousBalance: 1260,
        newCharges: 1760,
        paymentsReceived: 2040,
        balanceDue: 980,
        currency: "USD"
      },
      {
        id: "doorking-statement-2026-01",
        statementNumber: "DK-STMT-2601",
        accountNumber: "ACCESS-9017",
        periodLabel: "January 2026",
        statementDate: "2026-01-31",
        dueDate: "2026-02-15",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        previousBalance: 845,
        newCharges: 2240,
        paymentsReceived: 1825,
        balanceDue: 1260,
        currency: "USD"
      },
      {
        id: "doorking-statement-2025-12",
        statementNumber: "DK-STMT-2512",
        accountNumber: "ACCESS-9017",
        periodLabel: "December 2025",
        statementDate: "2025-12-31",
        dueDate: "2026-01-15",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        previousBalance: 610,
        newCharges: 1985,
        paymentsReceived: 1750,
        balanceDue: 845,
        currency: "USD"
      },
      {
        id: "doorking-statement-2025-11",
        statementNumber: "DK-STMT-2511",
        accountNumber: "ACCESS-9017",
        periodLabel: "November 2025",
        statementDate: "2025-11-30",
        dueDate: "2025-12-15",
        propertyName: HOA_NAME,
        propertyCode: HOA_CODE,
        previousBalance: 390,
        newCharges: 1820,
        paymentsReceived: 1600,
        balanceDue: 610,
        currency: "USD"
      }
    ]
  }
};

function resolveVendorProfileKey(): VendorProfileKey {
  const raw = String(process.env.VENDOR_PROFILE || "landscaping")
    .trim()
    .toLowerCase();

  if (raw === "plumber" || raw === "doorking" || raw === "landscaping") {
    return raw;
  }

  return "landscaping";
}

export function getVendorProfile(): VendorPortalProfile {
  return profiles[resolveVendorProfileKey()];
}

export function listInvoices(): VendorInvoice[] {
  return [...getVendorProfile().invoices];
}

export function getInvoiceById(invoiceId: string): VendorInvoice | null {
  return getVendorProfile().invoices.find((invoice) => invoice.id === invoiceId) || null;
}

export function listStatements(): VendorStatement[] {
  return [...getVendorProfile().statements];
}

export function getStatementById(statementId: string): VendorStatement | null {
  return getVendorProfile().statements.find((statement) => statement.id === statementId) || null;
}

export function invoiceTotals() {
  const invoices = listInvoices();
  const statements = listStatements();
  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const openAccountBalance = statements[0]?.balanceDue ?? totalAmount;

  return {
    openInvoiceCount: invoices.length,
    totalAmount,
    openAccountBalance,
    nextDueDate:
      invoices
        .map((invoice) => invoice.dueDate)
        .sort((left, right) => left.localeCompare(right))[0] || null
  };
}
