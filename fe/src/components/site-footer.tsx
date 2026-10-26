import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./icons";
import { company } from "@/lib/company";

const navigation = [
  ["Tentang kami", "/tentang"],
  ["Pilihan produk", "/produk"],
  ["Distribusi", "/distribusi"],
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
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
          <div className="footer-address">
            <span className="eyebrow">COME SAY HELLO</span>
            <p>
              Jl. Kurma, Dregan RT03/RW06, Pabelan,
              <br />
              Kartasura, Sukoharjo, Jawa Tengah 57169
            </p>
            <a href={company.maps} target="_blank" rel="noopener noreferrer">
              Lihat di Google Maps <Arrow diagonal />
            </a>
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
            <a href={`mailto:${company.email}`}>
              Email kami <Arrow diagonal />
            </a>
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
