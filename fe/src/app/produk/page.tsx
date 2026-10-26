import type { Metadata } from "next";
import ComingSoon from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "Pilihan Produk — Coming Soon — Tatsuo Beef",
  description:
    "Halaman pilihan produk Tatsuo Beef sedang kami siapkan. Hubungi tim kami untuk informasi lebih lanjut.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/produk" },
};

export default function Page() {
  return <ComingSoon label="Pilihan Produk" />;
}
