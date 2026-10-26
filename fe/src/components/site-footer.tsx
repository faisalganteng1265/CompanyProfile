import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./icons";
import { company, whatsapp } from "@/lib/company";

export default function SiteFooter() {
  return (
    <footer className="tatsuo-footer">
      <section
        className="tatsuo-footer-invitation"
        aria-labelledby="footer-invitation-heading"
        style={{ position: "relative", minHeight: 360 }}
      >
        <svg
          className="footer-sunrays"
          viewBox="0 0 1440 450"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {Array.from({ length: 15 }, (_, i) => (
            <path
              key={i}
              d={`M720 580L${-180 + i * 130} -130`}
              stroke="currentColor"
              strokeWidth="9"
            />
          ))}
        </svg>
        <div
          className="footer-product footer-product-beef"
          style={{ position: "absolute" }}
          aria-hidden="true"
        >
          <Image
            src="/images/hero-good-cut-v2.webp"
            alt=""
            width={1500}
            height={1000}
            sizes="(max-width: 760px) 180px, 400px"
          />
        </div>
        <div
          className="footer-product footer-product-chicken"
          style={{ position: "absolute" }}
          aria-hidden="true"
        >
          <Image
            src="/images/footer-chicken-v2.webp"
            alt=""
            width={1100}
            height={734}
            sizes="(max-width: 760px) 180px, 400px"
          />
        </div>
        <div className="container footer-invitation-copy">
          <span className="eyebrow">GOOD MEAT. GREAT THINGS AHEAD.</span>
          <h2 id="footer-invitation-heading">
            Punya rencana besar?
            <br />
            <em>Kami siapkan bahannya.</em>
          </h2>
          <p>
            Menu baru, kebutuhan pasokan, atau langkah usaha berikutnya.
            <br />
            Mari mulai dengan percakapan yang baik.
          </p>
          <Link className="footer-invitation-button" href="/kontak">
            Mulai percakapan <Arrow diagonal />
          </Link>
        </div>
        <div className="footer-wave" aria-hidden="true">
          <svg viewBox="0 0 2880 80" preserveAspectRatio="none">
            <path
              d="M0 35Q180 80 360 35T720 35T1080 35T1440 35T1800 35T2160 35T2520 35T2880 35V80H0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>
      <div className="tatsuo-footer-body">
        <div className="container">
          <div className="tatsuo-footer-grid">
            <div className="footer-company-block">
              <Link href="/" className="footer-brand-name">
                TATSUO<span>BEEF INDONESIA</span>
              </Link>
              <span className="footer-column-label">OUR HOME</span>
              <address>
                Jl. Kurma, Dregan RT03/RW06, Pabelan,
                <br />
                Kartasura, Sukoharjo,
                <br />
                Jawa Tengah 57169
              </address>
              <a
                href={company.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-map-link"
              >
                Temukan kami <Arrow diagonal />
              </a>
            </div>
            <div className="footer-link-columns">
              <div>
                <h3>Jelajahi</h3>
                <Link href="/">Beranda</Link>
                <Link href="/tentang">Tentang kami</Link>
                <Link href="/produk">Pilihan produk</Link>
                <Link href="/distribusi">Distribusi</Link>
              </div>
              <div>
                <h3>Pilihan kami</h3>
                <Link href="/produk/tenderloin-meltique">Tenderloin</Link>
                <Link href="/produk/shortplate-beef">Shortplate</Link>
                <Link href="/produk/buntut-center-cut">Buntut sapi</Link>
                <Link href="/produk/boneless-dada-ayam">Daging ayam</Link>
              </div>
              <div>
                <h3>Mari bicara</h3>
                <Link href="/kontak">Hubungi kami</Link>
                {company.sales.map((s) => (
                  <a
                    href={whatsapp(company.inquiry, s.number)}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={s.number}
                  >
                    {s.name}
                    <span className="footer-sales-phone">{s.phone}</span>
                  </a>
                ))}
                <a href={`mailto:${company.email}`}>
                  Email kami <Arrow diagonal />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-final-line">
            <span>© 2026 PT. Tatsuo Beef Indonesia</span>
            <span>SELECTED WITH CARE. DELIVERED WITH PRIDE.</span>
            <a href="#">
              Kembali ke atas <Arrow className="arrow-up" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
