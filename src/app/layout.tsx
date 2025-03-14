import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Both-sides form validation with Next.js",
  description:
    "Both-sides form validation with Next.js (React Hook Form & next-safe-action) • https://www.arnaudrenaud.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
