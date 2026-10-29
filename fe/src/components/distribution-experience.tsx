"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow } from "./icons";
import MobileOptimizedImage from "./mobile-optimized-image";
import { company, whatsapp } from "@/lib/company";

const facilities = [
  {
    title: "Ruang untuk menjaga.",
    label: "Penyimpanan",
    image: "storage",
    alt: "Ruang penyimpanan dari dokumentasi Tatsuo dengan tumpukan karton dan palet",
    text: "Setiap bahan punya kebutuhan penanganan. Fasilitas penyimpanan beku, dingin, dan kering mendukung kebutuhan produk sebelum melanjutkan perjalanan.",
    items: ["Penyimpanan beku", "Penyimpanan dingin", "Penyimpanan kering"],
  },
  {
    title: "Ditangani dengan perhatian.",
    label: "Penanganan",
    image: "handling",
    alt: "Forklift gudang dalam dokumentasi distribusi Tatsuo",
    text: "Di balik pengadaan yang baik, ada proses penanganan yang tertata. Peralatan gudang membantu perpindahan barang dari area penyimpanan menuju persiapan pengiriman.",
    items: [
      "Forklift double deep",
      "Forklift counter balance",
      "Penanganan gudang",
    ],
  },
  {
    title: "Perjalanan berikutnya: dapur Anda.",
    label: "Pengiriman",
    image: "fleet",
    alt: "Dua truk berpendingin dalam dokumentasi distribusi Tatsuo",
    text: "Kendaraan pengiriman mendukung perjalanan produk menuju kebutuhan usaha Anda. Tim kami membantu mengonfirmasi area layanan, kebutuhan produk, dan jadwal pengiriman.",
    items: ["Kendaraan jarak jauh", "Truk beku", "Truk berpendingin"],
  },
];
const steps = [
  [
    "Ceritakan kebutuhan.",
    "Sampaikan pilihan produk, jumlah, dan lokasi usaha Anda.",
  ],
  [
    "Kita susun bersama.",
    "Tim kami mengonfirmasi ketersediaan, penawaran, dan rencana pengiriman.",
  ],
  [
    "Siap melangkah.",
    "Detail pesanan dan jadwal disepakati sebelum proses pengadaan dilanjutkan.",
  ],
];

export default function DistributionExperience() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const facility = facilities[active];
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".distribution-hero-enter", {
          y: 25,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
        gsap.utils
          .toArray<HTMLElement>(".distribution-reveal")
          .forEach((item) => {
            gsap.fromTo(
              item,
              { y: 26, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: item,
                  start: "top 92%",
                  end: "bottom top",
                  toggleActions: "restart reset restart reset",
                },
              },
            );
          });
      });
    }, element);
    return () => {
      media.revert();
      context.revert();
    };
  }, []);
  const inquiry = whatsapp(
    "Halo Tatsuo Beef, saya ingin berdiskusi tentang pengadaan dan pengiriman untuk usaha saya. Lokasi usaha saya: ",
  );
  return (
    <main id="main" className="distribution-page" ref={root}>
      <section
        className="distribution-hero"
        aria-labelledby="distribution-title"
      >
        <div className="container distribution-hero-top distribution-hero-enter">
          <span className="distribution-eyebrow">
            TATSUO / DISTRIBUSI &amp; KEMITRAAN
          </span>
          <span className="distribution-hero-index">
            DARI GUDANG. UNTUK DAPUR.
          </span>
        </div>
        <div className="container distribution-headline distribution-hero-enter">
          <h1 id="distribution-title">
            Bahan baik.
            <br />
            <em>Perjalanan baik.</em>
          </h1>
          <div>
            <p>
              Ada banyak hal di balik sajian istimewa. Salah satunya, perjalanan
              bahan sebelum tiba di dapur Anda.
            </p>
            <a href="#fasilitas" className="distribution-text-link">
              Ikuti perjalanannya <Arrow diagonal />
            </a>
          </div>
        </div>
        <div className="distribution-hero-panorama distribution-hero-enter">
          <MobileOptimizedImage
            src="/images/distribution/dock-restored-v1.webp"
            alt="Area bongkar muat dari dokumentasi pusat distribusi Tatsuo Beef"
            width={1600}
            height={736}
            priority
            sizes="100vw"
          />
          <div className="distribution-photo-shade" />
          <div className="distribution-dispatch-note">
            <span>TATSUO BEEF INDONESIA</span>
            <strong>
              Handled
              <br />
              <em>with care.</em>
            </strong>
            <span className="distribution-note-rule" />
            <span>PENYIMPANAN → PENANGANAN → PENGIRIMAN</span>
          </div>
          <div className="container distribution-panorama-caption">
            <span>PUSAT DISTRIBUSI</span>
            <span>01 — AWAL PERJALANAN</span>
          </div>
        </div>
      </section>

      <section
        id="fasilitas"
        className="container distribution-facilities"
        aria-labelledby="facilities-heading"
      >
        <header className="distribution-section-heading distribution-reveal">
          <span className="distribution-eyebrow">01 / DI BALIK DISTRIBUSI</span>
          <h2 id="facilities-heading">
            Bukan sekadar berpindah.
            <br />
            <em>Setiap tahap berarti.</em>
          </h2>
        </header>
        <div className="distribution-facility-layout distribution-reveal">
          <div className="distribution-facility-menu">
            <div
              role="tablist"
              aria-label="Fasilitas distribusi"
              className="distribution-tabs"
            >
              {facilities.map((item, index) => (
                <button
                  type="button"
                  role="tab"
                  id={`facility-tab-${index}`}
                  aria-controls="facility-panel"
                  aria-selected={active === index}
                  tabIndex={active === index ? 0 : -1}
                  key={item.label}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => {
                    const next =
                      event.key === "ArrowDown" || event.key === "ArrowRight"
                        ? (index + 1) % facilities.length
                        : event.key === "ArrowUp" || event.key === "ArrowLeft"
                          ? (index + facilities.length - 1) % facilities.length
                          : event.key === "Home"
                            ? 0
                            : event.key === "End"
                              ? facilities.length - 1
                              : null;
                    if (next !== null) {
                      event.preventDefault();
                      setActive(next);
                      document.getElementById(`facility-tab-${next}`)?.focus();
                    }
                  }}
                >
                  <span>0{index + 1}</span>
                  <strong>{item.label}</strong>
                  <Arrow diagonal />
                </button>
              ))}
            </div>
            <p className="distribution-menu-note">
              Dari penyimpanan hingga pengiriman, setiap bagian punya perannya.
            </p>
            <Link href="/produk" className="distribution-text-link">
              Kenali pilihan produknya <Arrow diagonal />
            </Link>
          </div>
          <div
            id="facility-panel"
            role="tabpanel"
            aria-labelledby={`facility-tab-${active}`}
            tabIndex={0}
          >
            <div className="distribution-facility-panel" key={facility.image}>
              <figure>
                <Image
                  src={`/images/distribution/${facility.image}-restored-v1.webp`}
                  alt={facility.alt}
                  width={1200}
                  height={1200}
                  sizes="(max-width: 760px) calc(100vw - 40px), 58vw"
                />
                <figcaption>
                  DOKUMENTASI DISTRIBUSI TATSUO · 0{active + 1} / 03
                </figcaption>
              </figure>
              <div className="distribution-facility-copy">
                <h3>{facility.title}</h3>
                <p>{facility.text}</p>
                <ul>
                  {facility.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="distribution-road"
        aria-labelledby="distribution-road-heading"
      >
        <div className="container">
          <div className="distribution-road-top distribution-reveal">
            <span className="distribution-eyebrow">02 / MULAI BERMITRA</span>
            <h2 id="distribution-road-heading">
              Jarak boleh jauh.
              <br />
              <em>Komunikasi tetap dekat.</em>
            </h2>
            <p>
              Mulai dari percakapan sederhana.
              <br />
              Kita temukan rencana yang tepat untuk usaha Anda.
            </p>
          </div>
          <div className="distribution-steps">
            {steps.map(([title, text], index) => (
              <article
                key={title}
                className="distribution-step distribution-reveal"
              >
                <span className="distribution-step-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="container distribution-onward"
        aria-labelledby="distribution-onward-heading"
      >
        <div className="distribution-onward-photo distribution-reveal">
          <Image
            src="/images/distribution/delivery-restored-v1.webp"
            alt="Armada truk pada dokumentasi distribusi Tatsuo Beef"
            width={1440}
            height={1080}
            sizes="(max-width: 760px) calc(100vw - 40px), 48vw"
          />
          <span>UNTUK PERJALANAN BERIKUTNYA.</span>
        </div>
        <div className="distribution-onward-copy distribution-reveal">
          <span className="distribution-eyebrow">
            DARI KARTASURA, MARI BICARA.
          </span>
          <h2 id="distribution-onward-heading">
            Dapur Anda.
            <br />
            <em>Tujuan kami berikutnya?</em>
          </h2>
          <p>
            Ceritakan lokasi dan kebutuhan usaha Anda. Tim Tatsuo siap membantu
            mengecek area layanan serta rencana pengadaan.
          </p>
          <a
            className="distribution-button"
            href={inquiry}
            target="_blank"
            rel="noopener noreferrer"
          >
            Diskusikan pengiriman <Arrow diagonal />
          </a>
          <a
            className="distribution-location"
            href={company.maps}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Temui kami</span>
            <strong>
              Kartasura, Sukoharjo
              <br />
              Jawa Tengah
            </strong>
            <Arrow diagonal />
          </a>
        </div>
      </section>
      <div className="container distribution-documentation-note">
        Foto bersumber dari dokumentasi di situs Tatsuo Beef sebelumnya, dengan
        penyuntingan pencahayaan, warna, dan penghapusan watermark kamera.
      </div>
    </main>
  );
}
