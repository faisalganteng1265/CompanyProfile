import type { Metadata } from "next";
import AboutExperience from "@/components/about-experience";
import "./about.css";

export const metadata: Metadata = {
  title: "Tentang Kami — Tatsuo Beef",
  description:
    "Kenali PT. Tatsuo Beef Indonesia, mitra pengadaan bahan pangan sejak 2023. Cerita kami, visi, misi, nilai, dan informasi sertifikasi halal.",
  alternates: { canonical: "/tentang" },
};

export default function AboutPage() {
  return <AboutExperience />;
}
