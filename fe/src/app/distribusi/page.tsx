import type { Metadata } from "next";
import DistributionExperience from "@/components/distribution-experience";
import "./distribution.css";

export const metadata: Metadata = {
  title: "Distribusi & Kemitraan — Tatsuo Beef",
  description:
    "Kenali fasilitas penyimpanan, penanganan gudang, dan logistik Tatsuo Beef. Diskusikan kebutuhan pengadaan serta pengiriman untuk bisnis kuliner Anda.",
  alternates: { canonical: "/distribusi" },
};

export default function DistributionPage() {
  return <DistributionExperience />;
}
