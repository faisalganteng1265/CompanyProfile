import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./icons";
import { company, whatsapp } from "@/lib/company";

const navigation = [
  ["Tentang kami", "/tentang"],
  ["Pilihan produk", "/produk"],
  ["Distribusi", "/distribusi"],
];

function ContactIcon({ type }: { type: "phone" | "email" | "location" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {type === "phone" ? (
        <path d="m8 3 2.5 4.5-2.2 2.2a16 16 0 0 0 6 6l2.2-2.2L21 16v3a2 2 0 0 1-2.2 2C10.6 20.2 3.8 13.4 3 5.2A2 2 0 0 1 5 3h3Z" />
      ) : type === "email" ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="m3 6 9 7 9-7M3 18l6-6m12 6-6-6" />
        </>
      ) : (
        <>
          <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
          <circle cx="12" cy="10" r="2.3" />
        </>
      )}
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-block">
            <Link
              className="footer-brand-logo"
              href="/"
              aria-label="Tatsuo Beef — Beranda"
            >
              <Image
                src="/images/logo-original.jpg"
                alt="Tatsuo Beef"
                width={1600}
                height={703}
                sizes="190px"
              />
            </Link>
            <div className="footer-social">
              <p>Follow us on social media</p>
              <div className="footer-social-links">
                <a
                  href={company.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Tatsuo Beef — bosdagingsolo"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle
                      cx="17.4"
                      cy="6.8"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </a>
                <a
                  href={company.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok Tatsuo Beef — bosdagingsolo"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M15.7 3h-3.2v12.2a2.7 2.7 0 1 1-2.3-2.7V9.3a5.9 5.9 0 1 0 5.5 5.9V9a8 8 0 0 0 4.8 1.6V7.4A4.9 4.9 0 0 1 15.7 3Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-contact-details">
            <div className="footer-contact-item">
              <ContactIcon type="phone" />
              <div>
                <h3>Telepon</h3>
                {company.sales.map((sales) => (
                  <a
                    key={sales.number}
                    href={whatsapp(company.inquiry, sales.number)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sales.phone} <span>— {sales.name}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="footer-contact-item">
              <ContactIcon type="email" />
              <div>
                <h3>Email</h3>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </div>
            </div>
            <div className="footer-contact-item">
              <ContactIcon type="location" />
              <div>
                <h3>Lokasi</h3>
                <a
                  href={company.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {company.address}
                </a>
              </div>
            </div>
          </div>
          <div className="footer-connect">
            <span className="eyebrow">EXPLORE TATSUO</span>
            {[...navigation, ["Hubungi kami", "/kontak"]].map(
              ([label, href]) => (
                <Link key={href} href={href}>
                  {label}
                  <Arrow diagonal />
                </Link>
              ),
            )}
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          TATSUO BEEF<span>®</span>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {company.name}</span>
          <span>SELECTED WITH CARE. DELIVERED WITH PRIDE.</span>
          <a href="#">
            Kembali ke atas <Arrow className="arrow-up" />
          </a>
        </div>
      </div>
    </footer>
  );
}
