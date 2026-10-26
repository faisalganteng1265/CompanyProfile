import type { Metadata } from "next";
import ComingSoon from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Distribusi & Kemitraan — Coming Soon — Tatsuo Beef",
  description:
    "Halaman distribusi & kemitraan Tatsuo Beef sedang kami siapkan. Hubungi tim kami untuk informasi lebih lanjut.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/distribusi" },
};

export default function Page() {
  return <ComingSoon label="Distribusi & Kemitraan" />;
}
