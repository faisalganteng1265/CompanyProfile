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
const heroSlides = [
  {
    image: "dock",
    title: "Bahan baik.",
    ending: "Perjalanan yang berarti.",
    alt: "Area pemuatan gudang dalam dokumentasi Tatsuo Beef",
  },
  {
    image: "storage",
    title: "Terjaga di gudang.",
    ending: "Siap untuk langkah berikutnya.",
    alt: facilities[0].alt,
  },
  {
    image: "fleet",
    title: "Dari kami.",
    ending: "Untuk dapur Anda.",
    alt: facilities[2].alt,
  },
];

export default function DistributionExperience() {
  const root = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const inquiry = whatsapp(
    "Halo Tatsuo Beef, saya ingin berdiskusi tentang pengadaan dan pengiriman untuk usaha saya. Lokasi usaha saya: ",
  );

  useEffect(() => {
    const hero = root.current?.querySelector(".dist-hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    const onVisibility = () =>
      setVisible(
        document.visibilityState === "visible" &&
          hero.getBoundingClientRect().bottom > 0,
      );
    observer.observe(hero);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (
      paused ||
      !visible ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setTimeout(
      () => setSlide((value) => (value + 1) % heroSlides.length),
      5000,
    );
    return () => window.clearTimeout(timer);
  }, [slide, paused, visible]);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      const chapters = gsap.utils.toArray<HTMLElement>(".dist-chapter");
      chapters.forEach((chapter, index) => {
        ScrollTrigger.create({
          trigger: chapter,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
        });
      });
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".dist-hero-heading", {
          y: 45,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
        });
        gsap.to(".dist-hero-content", {
          y: -100,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".dist-hero",
            start: "top top",
            end: "bottom 25%",
            scrub: true,
          },
        });
        gsap.utils.toArray<HTMLElement>(".dist-reveal").forEach((item) => {
          gsap.fromTo(
            item,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });
      media.add(
        "(max-width: 999px) and (prefers-reduced-motion: no-preference)",
        () => {
          chapters.forEach((chapter) => {
            gsap.fromTo(
              chapter.querySelectorAll(
                ".dist-mobile-photo, .dist-chapter-copy",
              ),
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.12,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: chapter,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          });
        },
      );
      media.add(
        "(min-width: 1000px) and (prefers-reduced-motion: no-preference)",
        () => {
          // One persistent image frame travels from the gallery into its sticky slot.
          // Measure the static slot, not the sticky frame, so refresh works mid-scroll.
          const gallery = element.querySelector<HTMLElement>(
            ".dist-gallery-center",
          )!;
          const slot = element.querySelector<HTMLElement>(".dist-photo-slot")!;
          const frame =
            element.querySelector<HTMLElement>(".dist-sticky-photo")!;
          const geometry = () => {
            const source = gallery.getBoundingClientRect();
            const target = slot.getBoundingClientRect();
            return {
              x: source.left - target.left,
              y: source.top - target.top,
              width: source.width,
              height: source.height,
            };
          };
          gsap.set(gallery, { visibility: "hidden" });
          gsap.fromTo(
            frame,
            {
              x: () => geometry().x,
              y: () => geometry().y,
              width: () => geometry().width,
              height: () => geometry().height,
            },
            {
              x: 0,
              y: 0,
              width: () => slot.clientWidth,
              height: () =>
                Math.max(420, Math.min(850, window.innerHeight - 190)),
              ease: "none",
              scrollTrigger: {
                trigger: ".dist-gallery",
                start: "top 45%",
                endTrigger: ".dist-services",
                end: "top 145px",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".dist-gallery",
              start: "top 70%",
              end: "top 20%",
              scrub: true,
            },
          });
          timeline
            .to(
              ".dist-gallery-left",
              { xPercent: 100, opacity: 0, ease: "none" },
              0,
            )
            .to(
              ".dist-gallery-right",
              { xPercent: -100, opacity: 0, ease: "none" },
              0,
            );
          gsap.fromTo(
            ".dist-photo-count",
            { opacity: 0 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: ".dist-services",
                start: "top 60%",
                end: "top 145px",
                scrub: true,
              },
            },
          );
          chapters.forEach((chapter, index) => {
            const copy = chapter.querySelector(".dist-chapter-copy");
            gsap.fromTo(
              copy,
              { opacity: 0.22, y: 24 },
              {
                opacity: 1,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: chapter,
                  start: "top 85%",
                  end: "top 38%",
                  scrub: true,
                },
              },
            );
            if (index > 0) {
              const photo = element.querySelectorAll(".dist-service-photo")[
                index
              ];
              gsap.fromTo(
                photo,
                { clipPath: "inset(100% 0 0 0)" },
                {
                  clipPath: "inset(0% 0 0 0)",
                  ease: "none",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top 75%",
                    end: "top 35%",
                    scrub: 0.4,
                  },
                },
              );
              gsap.fromTo(
                photo.querySelector("img"),
                { scale: 1.12 },
                {
                  scale: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: chapter,
                    start: "top 75%",
                    end: "top 35%",
                    scrub: 0.4,
                  },
                },
              );
            }
          });
        },
      );
    }, element);
    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <main id="main" className="distribution-page" ref={root}>
      <section
        className="dist-hero"
        aria-labelledby="distribution-title"
        aria-roledescription="carousel"
        aria-label="Distribusi Tatsuo Beef"
      >
        <div className="dist-hero-images" aria-hidden="true">
          {heroSlides.map((item, index) => (
            <div
              key={item.image}
              className={`dist-hero-image ${slide === index ? "is-active" : ""}`}
            >
              <MobileOptimizedImage
                src={`/images/distribution/${item.image}-restored-v1.webp`}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
              />
            </div>
          ))}
        </div>
        <div className="dist-hero-shade" />
        <div className="dist-hero-content">
          <span className="dist-kicker">TATSUO BEEF / DISTRIBUSI</span>
          <h1 id="distribution-title" className="dist-hero-heading">
            Bahan pilihan.
            <br />
            <em>Terus bergerak.</em>
          </h1>
          <div className="dist-hero-bottom">
            <p key={slide} className="dist-slide-copy">
              {heroSlides[slide].title}
              <br />
              {heroSlides[slide].ending}
            </p>
            <a className="dist-round-link" href="#perjalanan">
              <span>Jelajahi perjalanan kami</span>
              <Arrow />
            </a>
          </div>
        </div>
        <div className="dist-hero-controls">
          <div className="dist-slide-buttons">
            {heroSlides.map((item, index) => (
              <button
                type="button"
                key={item.image}
                aria-label={`Tampilkan foto ${index + 1}: ${item.alt}`}
                aria-pressed={slide === index}
                onClick={() => setSlide(index)}
                className={slide === index ? "is-active" : ""}
              >
                <span>0{index + 1}</span>
                <span>{["Fasilitas", "Penyimpanan", "Pengiriman"][index]}</span>
                <i>
                  <b
                    key={`${slide}-${index}`}
                    style={{
                      animationPlayState:
                        paused || !visible ? "paused" : "running",
                    }}
                  />
                </i>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="dist-pause"
            aria-label={
              paused ? "Putar pergantian foto" : "Jeda pergantian foto"
            }
            onClick={() => setPaused(!paused)}
          >
            {paused ? "Putar" : "Jeda"}
          </button>
        </div>
      </section>

      <section id="perjalanan" className="dist-intro">
        <div className="dist-intro-heading dist-reveal">
          <span className="dist-kicker">
            SATU PERJALANAN. SETIAP TAHAP BERARTI.
          </span>
          <h2>
            Di balik sajian Anda,
            <br />
            <em>kami ikut bergerak.</em>
          </h2>
          <p>
            Dari ruang penyimpanan hingga persiapan pengiriman. Ada orang,
            fasilitas, dan perhatian di setiap langkahnya.
          </p>
        </div>
        <div className="dist-gallery">
          <div className="dist-gallery-side dist-gallery-left">
            <Image
              src="/images/distribution/storage-restored-v1.webp"
              alt="Penyimpanan barang di gudang"
              fill
              sizes="25vw"
            />
          </div>
          <div className="dist-gallery-center">
            <MobileOptimizedImage
              src="/images/distribution/storage-restored-v1.webp"
              alt="Ruang penyimpanan dalam dokumentasi Tatsuo Beef"
              fill
              sizes="(max-width:999px) 100vw, 65vw"
            />
            <span>DARI TATSUO, MENUJU DAPUR ANDA.</span>
          </div>
          <div className="dist-gallery-side dist-gallery-right">
            <Image
              src="/images/distribution/handling-restored-v1.webp"
              alt="Proses penanganan dengan forklift"
              fill
              sizes="25vw"
            />
          </div>
        </div>
      </section>

      <section className="dist-services" aria-label="Tahapan distribusi">
        <nav
          className="dist-service-nav"
          aria-label="Jelajahi tahapan distribusi"
        >
          <span className="dist-kicker">DI BALIK DISTRIBUSI</span>
          {facilities.map((item, index) => (
            <a
              href={`#distribusi-${item.image}`}
              key={item.image}
              className={active === index ? "is-active" : ""}
              aria-current={active === index ? "step" : undefined}
            >
              <small>0{index + 1}</small>
              {item.label}
              <Arrow diagonal />
            </a>
          ))}
          <Link href="/produk" className="dist-catalog-link">
            Lihat pilihan produk <Arrow diagonal />
          </Link>
        </nav>
        <div className="dist-photo-slot">
          <div className="dist-sticky-photo" aria-hidden="true">
            {facilities.map((item, index) => (
              <div
                key={item.image}
                className={`dist-service-photo ${active === index ? "is-active" : ""}`}
                style={{ zIndex: index }}
              >
                <MobileOptimizedImage
                  src={`/images/distribution/${item.image}-restored-v1.webp`}
                  alt=""
                  fill
                  sizes="44vw"
                />
              </div>
            ))}
            <span className="dist-photo-count">0{active + 1} / 03</span>
          </div>
        </div>
        <div className="dist-chapters">
          {facilities.map((item, index) => (
            <article
              id={`distribusi-${item.image}`}
              className="dist-chapter"
              key={item.image}
            >
              <div className="dist-mobile-photo">
                <MobileOptimizedImage
                  src={`/images/distribution/${item.image}-restored-v1.webp`}
                  alt={item.alt}
                  fill
                  sizes="(max-width:760px) calc(100vw - 40px), 80vw"
                />
              </div>
              <div className="dist-chapter-copy">
                <span className="dist-chapter-number">
                  0{index + 1}
                  <small> / {item.label}</small>
                </span>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
                <ul>
                  {item.items.map((feature) => (
                    <li key={feature}>
                      <span />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={inquiry}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dist-text-link"
                >
                  Bicarakan kebutuhan Anda <Arrow diagonal />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dist-closing" aria-labelledby="dist-contact-title">
        <div className="dist-closing-heading dist-reveal">
          <span className="dist-kicker">LANGKAH BERIKUTNYA, BERSAMA.</span>
          <h2 id="dist-contact-title">
            Dapur Anda.
            <br />
            <em>Tujuan kami berikutnya?</em>
          </h2>
        </div>
        <div className="dist-closing-bottom dist-reveal">
          <p>
            Ceritakan kebutuhan dan lokasi usaha Anda. Kita susun rencana
            pengadaan yang tepat, bersama.
          </p>
          <a
            href={inquiry}
            target="_blank"
            rel="noopener noreferrer"
            className="dist-cta"
          >
            Diskusikan pengiriman{" "}
            <span>
              <Arrow diagonal />
            </span>
          </a>
          <a
            href={company.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="dist-address"
          >
            Kartasura, Sukoharjo · Jawa Tengah <Arrow diagonal />
          </a>
        </div>
      </section>
    </main>
  );
}
