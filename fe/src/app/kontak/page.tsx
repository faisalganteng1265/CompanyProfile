import type { Metadata } from "next";
import ComingSoon from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Hubungi Kami — Coming Soon — Tatsuo Beef",
  description:
    "Halaman hubungi kami Tatsuo Beef sedang kami siapkan. Hubungi tim kami untuk informasi lebih lanjut.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/kontak" },
};

export default function Page() {
  return <ComingSoon label="Hubungi Kami" />;
}
