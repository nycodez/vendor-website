import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roam Vendor Portal",
  description: "Mock vendor invoice portal for browser automation testing."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
