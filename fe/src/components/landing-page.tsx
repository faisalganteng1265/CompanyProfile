"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Ambient from "./ambient";

const navigation = [
  ["Tentang kami", "#tentang"],
  ["Pilihan produk", "#produk"],
  ["Kemitraan", "#kemitraan"],
];
const whatsapp = (message: string, number = "6281274877474") =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
const inquiry =
  "Halo Tatsuo Beef, saya ingin berdiskusi mengenai kebutuhan daging untuk bisnis saya.";
const products = [
  {
    id: "01",
    name: "Tenderloin Meltique",
    category: "Daging sapi",
    image: "/images/product-tenderloin.webp",
    note: "Tender. Juicy. Memorable.",
    use: "Steakhouse · Hotel · Restoran",
    description:
      "Potongan khas dalam meltique dengan tekstur lembut dan marbling yang kaya. Pilihan untuk menghadirkan sajian steak yang berkesan di meja pelanggan Anda.",
  },
  {
    id: "02",
    name: "Shortplate Beef",
    category: "Daging sapi",
    image: "/images/product-shortplate.webp",
    note: "Thin cuts. Full flavour.",
    use: "Shabu-shabu · Yakiniku · AYCE",
    description:
      "Irisan daging sapi dengan perpaduan daging dan lemak untuk cita rasa yang kaya. Fleksibel untuk menu grill, sukiyaki, dan shabu-shabu.",
  },
  {
    id: "03",
    name: "Boneless Dada Ayam",
    category: "Daging ayam",
    image: "/images/product-chicken.webp",
    note: "A kitchen essential.",
    use: "Katering · Restoran · Hotel",
    description:
      "Dada ayam tanpa tulang yang praktis untuk berbagai kreasi menu. Bahan andalan untuk dapur yang membutuhkan fleksibilitas dalam pengolahan.",
  },
];
type Product = (typeof products)[number];
const faqs = [
  [
    "Apakah Tatsuo melayani kebutuhan bisnis?",
    "Ya. Tatsuo Beef menyediakan bahan baku daging sapi impor, daging sapi lokal, dan ayam untuk kebutuhan usaha kuliner. Hubungi tim kami untuk mendiskusikan jenis produk dan pola pasokan yang Anda butuhkan.",
  ],
  [
    "Bagaimana cara mendapatkan katalog dan harga?",
    "Klik tombol konsultasi atau pilih produk yang Anda minati. Tim sales akan membantu memberikan katalog, informasi harga terbaru, dan ketersediaan produk melalui WhatsApp.",
  ],
  [
    "Apakah ada minimum pemesanan?",
    "Minimum pemesanan dapat berbeda untuk setiap produk. Sampaikan kebutuhan dan lokasi usaha Anda kepada tim sales untuk mendapatkan rincian penawaran yang sesuai.",
  ],
  [
    "Bagaimana dengan wilayah dan jadwal pengiriman?",
    "Tatsuo Beef berlokasi di Kartasura, Sukoharjo, Jawa Tengah. Untuk memastikan jangkauan, biaya, dan jadwal pengiriman ke lokasi Anda, silakan berkonsultasi langsung dengan tim kami.",
  ],
];

function Arrow({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="36"
      height="36"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      {[0, 45, 90, 135].map((r) => (
        <path
          key={r}
          d="M20 3v34"
          stroke="currentColor"
          strokeWidth="3"
          transform={`rotate(${r} 20 20)`}
        />
      ))}
    </svg>
  );
}
function SectionLabel({
  number,
  children,
  light = false,
}: {
  number: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`section-label ${light ? "label-light" : ""}`}>
      <span className="section-number">{number}</span>
      <span>{children}</span>
      <span className="label-line" />
    </div>
  );
}
function Contours({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 800"
      fill="none"
      className={`contours ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse
          key={i}
          cx="400"
          cy="400"
          rx={100 + i * 28}
          ry={140 + i * 24}
          stroke="currentColor"
          strokeWidth="0.7"
          transform={`rotate(${i * 5} 400 400)`}
        />
      ))}
    </svg>
  );
}

export default function LandingPage() {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("Semua pilihan");
  const [selected, setSelected] = useState<Product | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [testimonial, setTestimonial] = useState(0);
  const visibleProducts = products.filter(
    (p) => filter === "Semua pilihan" || p.category === filter,
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".hero-line > span", {
          yPercent: 110,
          rotate: 3,
          duration: 1.3,
          stagger: 0.13,
          ease: "power4.out",
          delay: 0.15,
        });
        gsap.from(".hero-reveal", {
          y: 22,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          delay: 0.6,
          ease: "power3.out",
        });
        gsap.fromTo(
          ".hero-image",
          { scale: 1.12 },
          { scale: 1, duration: 2.2, ease: "power2.out" },
        );
        gsap.to(".hero-image-wrap", {
          yPercent: 16,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(".hero-copy", {
          y: 80,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "20% top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
          gsap.from(el, {
            y: 45,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 91%", once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>(".parallax-image").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -7, scale: 1.12 },
            {
              yPercent: 7,
              scale: 1.12,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });
        gsap.to(".promise-watermark", {
          xPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: ".promise",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
        gsap.to(".story-word", {
          xPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: ".story",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
        gsap.utils.toArray<SVGPathElement>(".route-path").forEach((path) => {
          const length = path.getTotalLength();
          gsap.fromTo(
            path,
            { strokeDasharray: length, strokeDashoffset: length },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: ".partnership",
                start: "top 75%",
                end: "65% center",
                scrub: 1,
              },
            },
          );
        });
        gsap.to(".scroll-progress", {
          scaleX: 1,
          transformOrigin: "left",
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
        });
      });
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [filter]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", close);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (selected && dialog.current && !dialog.current.open)
      dialog.current.showModal();
    if (!selected && dialog.current?.open) dialog.current.close();
  }, [selected]);

  const testimonials = [
    {
      quote:
        "Stok Shortplate Beef mereka selalu kontinu, dan tim sales-nya sangat responsif. Sangat fair dan profesional.",
      name: "Arief",
      role: "Manajer Pembelian, Seoul Grill",
      type: "Kemitraan yang bisa diandalkan",
    },
    {
      quote:
        "Kualitas buntut sapinya konsisten, dagingnya empuk, dan membuat kaldu kami benar-benar kaya rasa. Pelanggan kami selalu puas!",
      name: "Chef Budi",
      role: "Waroeng SS Sambal",
      type: "Kualitas dalam setiap sajian",
    },
    {
      quote:
        "Tekstur juicy dan kelembutannya sempurna untuk menu steak kami. Pelayanan juga selalu prima.",
      name: "Maria",
      role: "Pemilik Western Steakhouse",
      type: "Pilihan untuk menu istimewa",
    },
  ];
  const current = testimonials[testimonial];

  return (
    <div ref={root} className="site-root">
      <a href="#main" className="skip-link">
        Langsung ke konten
      </a>
      <div className="announcement">
        <span>PREMIUM MEAT. EXCELLENT SERVICE.</span>
        <span>
          BASED IN SOLO, SERVING YOUR VISION <span className="status-dot" />
        </span>
      </div>
      <header className="site-header">
        <a className="brand" href="#" aria-label="Tatsuo Beef — Beranda">
          <Image
            src="/images/logo-original.jpg"
            width={144}
            height={63}
            alt="Tatsuo Beef"
            priority
          />
          <span className="brand-sub">INDONESIA · EST. 2023</span>
        </a>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          {navigation.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-contact" href="#kontak">
          Mari bicara <Arrow diagonal />
        </a>
        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
        >
          <span />
          <span />
        </button>
        {menuOpen && (
          <nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Navigasi mobile"
          >
            {[...navigation, ["Hubungi kami", "#kontak"]].map(
              ([label, href], i) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                  <small>0{i + 1}</small>
                  {label}
                  <Arrow diagonal />
                </a>
              ),
            )}
            <p>GOOD MEAT. GREAT PARTNERSHIP.</p>
          </nav>
        )}
      </header>
      <main id="main" inert={menuOpen}>
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-image-wrap">
            <Image
              className="hero-image"
              src="/images/hero.webp"
              alt="Potongan ribeye dengan marbling di atas papan kayu gelap"
              fill
              priority
              sizes="100vw"
              quality={90}
            />
          </div>
          <div className="hero-shade" />
          <div className="hero-light" aria-hidden="true" />
          <Ambient />
          <div className="hero-copy container">
            <p className="eyebrow hero-reveal">
              <span className="tiny-cross">+</span> THE ART OF GOOD MEAT
            </p>
            <h1 id="hero-heading">
              <span className="hero-line">
                <span>Good meat.</span>
              </span>
              <span className="hero-line">
                <span>Great</span>
              </span>
              <span className="hero-line">
                <span className="hero-last-line">partnership.</span>
              </span>
            </h1>
            <p className="hero-description hero-reveal">
              Di balik setiap hidangan istimewa,
              <br />
              ada bahan pilihan dan mitra yang tepat.
            </p>
            <a href="#produk" className="button button-red hero-reveal">
              <span>Temukan pilihan Anda</span>
              <Arrow diagonal />
            </a>
          </div>
          <div className="quality-seal" aria-hidden="true">
            <svg viewBox="0 0 140 140">
              <defs>
                <path
                  id="seal-circle"
                  d="M70,70m-52,0a52,52 0 1,1 104,0a52,52 0 1,1 -104,0"
                />
              </defs>
              <text>
                <textPath href="#seal-circle" textLength="324">
                  TATSUO BEEF · SELECTED WITH CARE ·{" "}
                </textPath>
              </text>
            </svg>
            <Asterisk />
            <span>
              EST.
              <br />
              2023
            </span>
          </div>
          <div className="hero-bottom container">
            <a href="#tentang" className="scroll-cue">
              <span className="scroll-stem" />
              SCROLL TO DISCOVER
            </a>
            <span className="hero-caption">
              SELECTED CUTS.
              <br />
              UNCOMPROMISING QUALITY.
            </span>
            <span className="hero-counter">
              01 <span>/ 04</span>
            </span>
          </div>
          <div className="hero-edge" aria-hidden="true">
            THE BEGINNING OF SOMETHING GREAT
          </div>
        </section>

        <section id="tentang" className="intro section-space container">
          <SectionLabel number="01">Lebih dari sekadar supplier</SectionLabel>
          <div className="intro-grid">
            <div className="intro-title reveal">
              <h2>
                Bahan yang baik.
                <br />
                Hubungan yang
                <br />
                <em>lebih berarti.</em>
              </h2>
              <Asterisk className="intro-asterisk" />
            </div>
            <div className="intro-copy reveal">
              <p className="lead">
                Kami percaya, rasa yang luar biasa dimulai jauh sebelum api
                dinyalakan.
              </p>
              <p>
                Sejak 2023, PT. Tatsuo Beef Indonesia hadir untuk menghubungkan
                bisnis kuliner dengan pilihan daging sapi dan ayam berkualitas.
                Dari potongan untuk steak andalan hingga kebutuhan dapur
                sehari-hari.
              </p>
              <p>
                Kami tumbuh bersama Anda. Dengan pasokan yang konsisten,
                komunikasi yang terbuka, dan perhatian pada setiap kebutuhan.
              </p>
              <a className="text-link" href="#kemitraan">
                Kenali cara kami bekerja <Arrow diagonal />
              </a>
            </div>
          </div>
          <div className="intro-foot reveal">
            <span>SUMBER PILIHAN. TUJUAN YANG SAMA.</span>
            <div>
              <span>Restoran & café</span>
              <span>Hotel & hospitality</span>
              <span>Katering & food service</span>
            </div>
          </div>
        </section>

        <div
          className="marquee"
          aria-label="Selected with care. Delivered with pride."
        >
          <div className="marquee-track">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} aria-hidden={i > 0}>
                SELECTED WITH CARE <Asterisk /> DELIVERED WITH PRIDE{" "}
                <Asterisk />
              </span>
            ))}
          </div>
        </div>

        <section id="produk" className="products section-space container">
          <SectionLabel number="02">The selection</SectionLabel>
          <div className="section-heading reveal">
            <h2>
              Potongan tepat.
              <br />
              <em>Untuk setiap kreasi.</em>
            </h2>
            <p>
              Kenali bahan di balik menu unggulan Anda.
              <br />
              Dipilih dengan cermat, untuk rasa yang berkesan.
            </p>
          </div>
          <div className="catalog-toolbar">
            <div
              className="filters"
              role="group"
              aria-label="Filter kategori produk"
            >
              {["Semua pilihan", "Daging sapi", "Daging ayam"].map((label) => (
                <button
                  key={label}
                  onClick={() => setFilter(label)}
                  aria-pressed={filter === label}
                  className={filter === label ? "active" : ""}
                >
                  {label}
                  <span>
                    {label === "Semua pilihan"
                      ? "03"
                      : label === "Daging sapi"
                        ? "02"
                        : "01"}
                  </span>
                </button>
              ))}
            </div>
            <span className="catalog-note">OUR SIGNATURE SELECTION</span>
          </div>
          <div className="product-grid" aria-live="polite">
            {visibleProducts.map((product) => (
              <button
                key={product.id}
                className="product-card"
                onClick={() => setSelected(product)}
                aria-label={`Lihat detail ${product.name}`}
              >
                <div className="product-image">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 900px) 45vw, 31vw"
                  />
                  <span className="product-category">{product.category}</span>
                  <span className="product-index">N° {product.id}</span>
                  <span className="product-view">
                    Explore cut <Arrow diagonal />
                  </span>
                </div>
                <div className="product-meta">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.note}</p>
                  </div>
                  <span className="circle-arrow">
                    <Arrow diagonal />
                  </span>
                </div>
                <span className="product-use">{product.use}</span>
              </button>
            ))}
          </div>
          <div className="catalog-bottom">
            <p>Ada kebutuhan potongan lain? Kami bantu carikan.</p>
            <a
              href={whatsapp(
                "Halo Tatsuo Beef, boleh kirimkan katalog lengkap dan daftar harga terbaru?",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Minta katalog lengkap <Arrow diagonal />
            </a>
          </div>
        </section>

        <section className="promise" aria-labelledby="promise-title">
          <Contours />
          <div className="promise-watermark" aria-hidden="true">
            NO COMPROMISE.
          </div>
          <div className="container promise-inner">
            <div className="promise-top">
              <span className="eyebrow">THE TATSUO STANDARD</span>
              <Asterisk />
            </div>
            <h2 id="promise-title" className="reveal">
              Yang kami jaga,
              <br />
              bukan hanya <em>kualitas.</em>
            </h2>
            <div className="promise-grid">
              {[
                [
                  "01",
                  "Mutu yang dipilih.",
                  "Bahan pilihan dengan perhatian pada kualitas, dari sumber hingga kebutuhan dapur Anda.",
                ],
                [
                  "02",
                  "Pasokan yang terjaga.",
                  "Ketersediaan produk yang kontinu untuk membantu bisnis Anda bergerak setiap hari.",
                ],
                [
                  "03",
                  "Mitra yang hadir.",
                  "Tim yang responsif, harga yang kompetitif, dan komunikasi yang mudah sejak awal.",
                ],
              ].map(([num, title, description]) => (
                <div className="promise-item reveal" key={num}>
                  <span className="promise-num">
                    {num}
                    <span> /</span>
                  </span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="story section-space container">
          <div className="story-visual">
            <div className="story-photo">
              <Image
                src="/images/story-selection-v2.webp"
                alt="Butcher memilih potongan ribeye bermarbling di atas meja kayu"
                fill
                className="parallax-image"
                quality={90}
                sizes="(max-width: 760px) 100vw, 50vw"
              />
            </div>
            <div className="story-photo-caption">
              <span>THE DETAILS MAKE THE DIFFERENCE.</span>
              <span>SO DOES YOUR SUPPLIER.</span>
            </div>
            <div className="story-word" aria-hidden="true">
              Selected.
            </div>
          </div>
          <div className="story-copy">
            <SectionLabel number="03">
              From our selection to your signature
            </SectionLabel>
            <h2 className="reveal">
              Anda meracik
              <br />
              ceritanya.
              <br />
              <em>
                Kami siapkan
                <br />
                bahan terbaiknya.
              </em>
            </h2>
            <p className="reveal">
              Dari steak yang menjadi favorit pelanggan, hingga sajian hangat
              yang selalu dirindukan. Setiap dapur punya cerita. Kami ada untuk
              membantu Anda mewujudkannya.
            </p>
            <a className="text-link reveal" href="#kontak">
              Ceritakan kebutuhan dapur Anda <Arrow diagonal />
            </a>
            <span className="story-signature">
              A good partnership makes all the difference.
            </span>
          </div>
        </section>

        <section id="kemitraan" className="partnership section-space">
          <div className="container">
            <SectionLabel number="04">A better way, together</SectionLabel>
            <div className="section-heading reveal">
              <h2>
                Dari percakapan pertama,
                <br />
                <em>ke kemitraan berikutnya.</em>
              </h2>
              <p>
                Langkah sederhana untuk menemukan
                <br />
                pasokan yang tepat bagi usaha Anda.
              </p>
            </div>
            <div className="partnership-content">
              <div className="distribution-visual">
                <svg viewBox="0 0 500 380" fill="none" aria-hidden="true">
                  <g stroke="currentColor" opacity=".13">
                    {Array.from({ length: 9 }, (_, i) => (
                      <ellipse
                        key={i}
                        cx="250"
                        cy="190"
                        rx={40 + i * 24}
                        ry={35 + i * 17}
                      />
                    ))}
                    <path d="M0 190h500M250 0v380" />
                  </g>
                  <path
                    className="route-path"
                    d="M90 90Q250 15 330 94T405 215Q320 330 250 205Q170 100 100 270"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="5 5"
                  />
                  <circle cx="250" cy="205" r="9" fill="currentColor" />
                  <circle
                    className="map-pulse"
                    cx="250"
                    cy="205"
                    r="19"
                    stroke="currentColor"
                  />
                  <circle cx="90" cy="90" r="4" fill="currentColor" />
                  <circle cx="330" cy="94" r="4" fill="currentColor" />
                  <circle cx="405" cy="215" r="4" fill="currentColor" />
                  <circle cx="100" cy="270" r="4" fill="currentColor" />
                  <path
                    d="m242 205 6 6 10-13"
                    stroke="var(--cream)"
                    strokeWidth="2"
                  />
                </svg>
                <span className="map-origin">
                  KARTASURA, SOLO<span>7.55° S · 110.75° E</span>
                </span>
                <span className="map-label">
                  YOUR NEXT GOOD PARTNERSHIP
                  <br />
                  STARTS RIGHT HERE.
                </span>
              </div>
              <div className="steps">
                {[
                  [
                    "01",
                    "Mari saling kenal.",
                    "Ceritakan usaha, menu, dan kebutuhan pasokan Anda kepada tim kami.",
                  ],
                  [
                    "02",
                    "Temukan pilihan Anda.",
                    "Diskusikan potongan, ketersediaan, dan penawaran yang sesuai dengan kebutuhan dapur.",
                  ],
                  [
                    "03",
                    "Siap tumbuh bersama.",
                    "Sepakati pemesanan dan pengiriman. Kami bantu menjaga pasokan untuk langkah berikutnya.",
                  ],
                ].map(([n, title, desc]) => (
                  <div className="step reveal" key={n}>
                    <span>{n}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{desc}</p>
                    </div>
                    <Arrow diagonal />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="testimonial-section section-space container">
          <div className="testimonial-aside">
            <span className="eyebrow">
              GOOD WORDS.
              <br />
              GREAT PARTNERS.
            </span>
            <Asterisk />
            <span className="quote-mark" aria-hidden="true">
              “
            </span>
          </div>
          <div className="testimonial-main" aria-live="polite">
            <span className="quote-type">{current.type}</span>
            <blockquote key={testimonial}>{current.quote}</blockquote>
            <div className="quote-bottom">
              <div>
                <span className="quote-name">{current.name}</span>
                <span className="quote-role">{current.role}</span>
              </div>
              <div className="quote-controls">
                <span>
                  0{testimonial + 1} <span>/ 03</span>
                </span>
                <button
                  onClick={() => setTestimonial((testimonial + 2) % 3)}
                  aria-label="Testimoni sebelumnya"
                >
                  <Arrow className="arrow-back" />
                </button>
                <button
                  onClick={() => setTestimonial((testimonial + 1) % 3)}
                  aria-label="Testimoni berikutnya"
                >
                  <Arrow />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section container section-space">
          <div className="faq-intro reveal">
            <span className="eyebrow">A FEW THINGS TO KNOW</span>
            <h2>
              Sebelum kita
              <br />
              <em>mulai bicara.</em>
            </h2>
            <p>
              Masih ada yang ingin ditanyakan?
              <br />
              Tim kami siap membantu.
            </p>
            <a
              href={whatsapp(inquiry)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Tanya langsung <Arrow diagonal />
            </a>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], i) => (
              <div
                className={`faq-item ${openFaq === i ? "expanded" : ""}`}
                key={question}
              >
                <h3>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-${i}`}
                  >
                    <span>
                      <small>0{i + 1}</small>
                      {question}
                    </span>
                    <span className="faq-plus" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  className="faq-answer"
                  id={`faq-${i}`}
                  hidden={openFaq !== i}
                >
                  <p>{answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="kontak" className="contact-section">
          <Contours className="contact-contours" />
          <div className="container">
            <div className="contact-top">
              <span className="eyebrow">
                <span className="status-dot" /> LET’S MAKE SOMETHING GREAT
              </span>
              <span>YOUR NEXT CHAPTER STARTS HERE.</span>
            </div>
            <div className="contact-main">
              <h2 className="reveal">
                Good meat.
                <br />
                <em>Better together.</em>
              </h2>
              <a
                className="contact-orb"
                href={whatsapp(inquiry)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Arrow diagonal />
                <span>
                  Mulai
                  <br />
                  percakapan
                </span>
              </a>
            </div>
            <div className="contact-bottom">
              <p>
                Produk yang tepat. Mitra yang peduli.
                <br />
                Mari bangun sesuatu yang baik bersama.
              </p>
              <div className="sales-links">
                <a
                  href={whatsapp(inquiry)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>IZZUD · SALES</span>0812 7487 7474 <Arrow diagonal />
                </a>
                <a
                  href={whatsapp(inquiry, "6281330273323")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>KRISS · SALES</span>0813 3027 3323 <Arrow diagonal />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer" inert={menuOpen}>
        <div className="container">
          <div className="footer-top">
            <a className="footer-title" href="#">
              TATSUO<span>BEEF INDONESIA</span>
            </a>
            <div className="footer-address">
              <span className="eyebrow">COME SAY HELLO</span>
              <p>
                Jl. Kurma, Dregan RT03/RW06, Pabelan,
                <br />
                Kartasura, Sukoharjo, Jawa Tengah 57169
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Jl.+Kurma+Dregan+Pabelan+Kartasura+Sukoharjo"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lihat di Google Maps <Arrow diagonal />
              </a>
            </div>
            <div className="footer-connect">
              <span className="eyebrow">STAY CONNECTED</span>
              <a href="mailto:tatsuobeefindonesia@gmail.com">
                Email kami <Arrow diagonal />
              </a>
              <a href="#produk">
                Pilihan produk <Arrow diagonal />
              </a>
              <a href="#tentang">
                Tentang Tatsuo <Arrow diagonal />
              </a>
            </div>
          </div>
          <div className="footer-wordmark" aria-hidden="true">
            TATSUO BEEF<span>®</span>
          </div>
          <div className="footer-bottom">
            <span>© 2026 PT. Tatsuo Beef Indonesia</span>
            <span>SELECTED WITH CARE. DELIVERED WITH PRIDE.</span>
            <a href="#">
              Kembali ke atas <Arrow className="arrow-up" />
            </a>
          </div>
        </div>
      </footer>
      <div className="scroll-progress" aria-hidden="true" />
      <dialog
        ref={dialog}
        aria-label="Detail produk"
        className="product-dialog"
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
      >
        {selected && (
          <div className="dialog-grid">
            <button
              className="dialog-close"
              aria-label="Tutup detail produk"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <div className="dialog-image">
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                sizes="(max-width: 760px) 90vw, 45vw"
              />
            </div>
            <div className="dialog-copy">
              <span className="eyebrow">THE SELECTION / N° {selected.id}</span>
              <h2>{selected.name}</h2>
              <p className="dialog-note">{selected.note}</p>
              <p>{selected.description}</p>
              <dl>
                <div>
                  <dt>Kategori</dt>
                  <dd>{selected.category}</dd>
                </div>
                <div>
                  <dt>Ideal untuk</dt>
                  <dd>{selected.use}</dd>
                </div>
              </dl>
              <p className="dialog-price">
                Harga dan stok terkini tersedia melalui tim sales.
              </p>
              <a
                className="button button-red"
                href={whatsapp(
                  `Halo Tatsuo Beef, saya tertarik dengan ${selected.name}. Boleh minta info harga dan ketersediaannya?`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Tanyakan produk ini <Arrow diagonal />
              </a>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
