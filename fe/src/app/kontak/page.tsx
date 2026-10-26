import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import MotionPage from "@/components/motion-page";
import ContactForm from "@/components/contact-form";
import { Breadcrumb } from "@/components/page-parts";
import { Arrow, Asterisk, Contours } from "@/components/icons";
import { company, whatsapp } from "@/lib/company";
export const metadata: Metadata = {
  title: "Hubungi Kami — Tatsuo Beef",
  description:
    "Mulai percakapan bersama Tatsuo Beef. Konsultasikan produk, harga, kebutuhan pasokan, dan pengiriman untuk usaha kuliner Anda.",
  alternates: { canonical: "/kontak" },
};
export default function ContactPage() {
  return (
    <MotionPage className="contact-page">
      <main id="main">
        <div className="container">
          <Breadcrumb current="Hubungi kami" />
        </div>
        <section className="contact-page-hero container">
          <div>
            <span className="eyebrow page-enter">
              04 / EVERY GOOD PARTNERSHIP STARTS HERE
            </span>
            <h1 className="page-enter">
              Let’s talk
              <br />
              <em>something good.</em>
            </h1>
          </div>
          <div className="contact-hero-note page-enter">
            <Asterisk />
            <p>
              Punya menu baru, rencana pasokan,
              <br />
              atau sekadar ingin saling kenal?
              <br />
              Kami siap mendengar.
            </p>
            <span>GOOD MEAT. GREAT CONVERSATIONS.</span>
          </div>
        </section>
        <section className="contact-workspace container">
          <aside className="contact-sidebar">
            <div className="direct-contact">
              <span className="eyebrow">PREFER A DIRECT CONVERSATION?</span>
              <h2>
                Orang yang tepat.
                <br />
                <em>Satu pesan saja.</em>
              </h2>
              {company.sales.map((s, i) => (
                <a
                  key={s.number}
                  className="sales-person"
                  href={whatsapp(company.inquiry, s.number)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sales-initial">{s.name[0]}</span>
                  <div>
                    <span className="eyebrow">SALES / 0{i + 1}</span>
                    <h3>{s.name}</h3>
                    <p>{s.phone}</p>
                  </div>
                  <Arrow diagonal />
                </a>
              ))}
            </div>
            <div className="contact-email">
              <span className="eyebrow">OR DROP US A LINE</span>
              <a href={`mailto:${company.email}`}>
                tatsuobeefindonesia
                <br />
                @gmail.com <Arrow diagonal />
              </a>
            </div>
            <div className="contact-side-note">
              <Asterisk />
              <p>
                Produk yang tepat.
                <br />
                Mitra yang peduli.
                <br />
                <em>Kita mulai dari sini.</em>
              </p>
            </div>
          </aside>
          <Suspense
            fallback={
              <div className="consultation-form form-loading">
                <span className="eyebrow">MENYIAPKAN PERCAKAPAN ANDA...</span>
              </div>
            }
          >
            <ContactForm />
          </Suspense>
        </section>
        <section className="location-section">
          <div className="container">
            <div className="location-copy">
              <span className="eyebrow">COME SAY HELLO</span>
              <h2 className="page-reveal">
                Berawal di Solo.
                <br />
                <em>Terbuka untuk Anda.</em>
              </h2>
              <address>
                {company.name}
                <br />
                Jl. Kurma, Dregan RT03/RW06, Pabelan,
                <br />
                Kartasura, Sukoharjo,
                <br />
                Jawa Tengah 57169
              </address>
              <a
                className="text-link"
                href={company.maps}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buka lokasi di Google Maps <Arrow diagonal />
              </a>
              <p className="visit-note">
                Hubungi tim kami terlebih dahulu untuk merencanakan kunjungan.
              </p>
            </div>
            <div className="location-art">
              <Contours />
              <div className="location-grid" />
              <div className="location-crosshair">
                <span />
                <span />
              </div>
              <span className="location-pin">
                <span className="status-dot" />
                TATSUO BEEF
                <br />
                <small>KARTASURA, SOLO</small>
              </span>
              <span className="location-coordinates">
                7.55° S<br />
                110.75° E
              </span>
              <a
                href={company.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="location-open"
                aria-label="Lihat alamat Tatsuo Beef di Google Maps"
              >
                <Arrow diagonal />
              </a>
              <span className="location-caption">
                ILUSTRASI LOKASI · LIHAT PETA UNTUK PETUNJUK ARAH
              </span>
            </div>
          </div>
        </section>
        <section className="contact-page-end container">
          <span className="eyebrow">BEFORE WE SAY HELLO</span>
          <p>Ingin mengenal pilihan kami lebih dulu?</p>
          <Link className="text-link" href="/produk">
            Jelajahi koleksi <Arrow diagonal />
          </Link>
        </section>
      </main>
    </MotionPage>
  );
}
