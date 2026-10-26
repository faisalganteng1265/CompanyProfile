import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: "./fonts/TrajanPro3-Regular.woff2",
  variable: "--font-display",
  display: "swap",
});
const editorial = localFont({
  src: "./fonts/Antwerp-Regular.woff2",
  variable: "--font-editorial",
  display: "swap",
});
const sans = localFont({
  src: "./fonts/SweetSansProRegular.woff",
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tatsuobeef.co.id"),
  title: "Tatsuo Beef — Good Meat. Great Partnership.",
  description:
    "Mitra pengadaan daging sapi dan ayam untuk bisnis kuliner Anda. Temukan pilihan daging premium bersama PT. Tatsuo Beef Indonesia, Sukoharjo.",
  openGraph: {
    title: "Tatsuo Beef — Good Meat. Great Partnership.",
    description: "Pilihan daging yang baik. Awal kemitraan yang lebih baik.",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/hero.webp",
        width: 1920,
        height: 1080,
        alt: "Daging sapi pilihan Tatsuo Beef",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${editorial.variable} ${sans.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
