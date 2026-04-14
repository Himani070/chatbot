import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "GridBot AI — F1 Chatbot",
  description: "Everything you want to know about Formula 1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
