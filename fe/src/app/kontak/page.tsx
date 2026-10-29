import type { Metadata } from "next";
import ContactExperience from "@/components/contact-experience";
import "./contact.css";

export const metadata: Metadata = {
  title: "Hubungi Kami — Tatsuo Beef",
  description:
    "Diskusikan kebutuhan daging dan bahan pangan usaha Anda dengan tim Tatsuo Beef. Hubungi Izzud atau Kriss melalui WhatsApp, email, atau temukan alamat kami di Kartasura.",
  alternates: { canonical: "/kontak" },
};

export default function ContactPage() {
  return <ContactExperience />;
}
