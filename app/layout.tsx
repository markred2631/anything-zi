import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Limitless",
  description: "Achieve your goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
