import type { Metadata } from "next";
import ComingSoon from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Tentang Kami — Coming Soon — Tatsuo Beef",
  description:
    "Halaman tentang kami Tatsuo Beef sedang kami siapkan. Hubungi tim kami untuk informasi lebih lanjut.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/tentang" },
};

export default function Page() {
  return <ComingSoon label="Tentang Kami" />;
}
