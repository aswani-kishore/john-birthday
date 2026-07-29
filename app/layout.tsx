import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { birthdayConfig } from "@/lib/config/birthday";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `Happy Birthday, ${birthdayConfig.recipient.name} 💕`,
  description: `A special birthday surprise for ${birthdayConfig.recipient.name} — made with love by ${birthdayConfig.sender.name}.`,
  openGraph: {
    title: `Happy Birthday, ${birthdayConfig.recipient.name}!`,
    description: "Someone made you something special. Open with love.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased gradient-bg">{children}</body>
    </html>
  );
}
