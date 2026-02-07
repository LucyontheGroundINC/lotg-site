import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Lucy On The Ground",
    template: "%s | Lucy On The Ground",
  },
  description:
    "Pop culture, romcoms, games, and thoughts I can’t keep to myself.",
  openGraph: {
    title: "Lucy On The Ground",
    description:
      "Pop culture, romcoms, games, and thoughts I can’t keep to myself.",
    url: "https://lucyontheground.com",
    siteName: "Lucy On The Ground",
    images: [
      {
        url: "https://lucyontheground.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lucy On The Ground",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucy On The Ground",
    description:
      "Pop culture, romcoms, games, and thoughts I can’t keep to myself.",
    images: ["https://lucyontheground.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
