"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandingHero from "./landing-hero";
import LandingIntro from "./landing-intro";
import WhyChooseUs from "./why-choose-us";
import TatsuoBenefits from "./tatsuo-benefits";
import PartnersCarousel from "./partners-carousel";
import JournalPreview from "./journal-preview";
import { Arrow } from "./icons";
import { whatsapp } from "@/lib/company";

const cuts = [
  {
    name: "Buntut Sapi",
    slug: "buntut-center-cut",
    image: "product-oxtail",
  },
  {
    name: "Tenderloin Meltique",
    slug: "tenderloin-meltique",
    image: "product-tenderloin",
  },
  {
    name: "Shortplate Beef",
    slug: "shortplate-beef",
    image: "product-shortplate",
  },
  {
    name: "Boneless Dada Ayam",
    slug: "boneless-dada-ayam",
    image: "product-chicken",
  },
  {
    name: "Sirloin Meltique",
    slug: "sirloin-meltique",
    image: "product-sirloin",
  },
  {
    name: "Saikoro",
    slug: "saikoro",
    image: "product-saikoro",
  },
  {
    name: "Salmon Fillet",
    slug: "salmon-fillet",
    image: "product-salmon",
  },
  {
    name: "Udang Vaname",
    slug: "udang-vaname",
    image: "product-shrimp",
  },
];
function CutMark({ light = false }: { light?: boolean }) {
  return (
    <span
      className={`v2-cut-mark ${light ? "is-light" : ""}`}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
    </span>
  );
}
export default function LandingV2() {
  const root = useRef<HTMLDivElement>(null);
  const [introReady, setIntroReady] = useState(false);
  const revealLanding = useCallback(() => setIntroReady(true), []);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".v2-reveal").forEach((el) => {
          gsap.from(el, {
            y: 42,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
            clearProps: "transform,opacity",
          });
        });
        gsap.utils
          .toArray<HTMLElement>(".v2-favourite")
          .forEach((card, index) => {
            const frame = card.querySelector(".v2-favourite-image-link");
            const photo = card.querySelector(".v2-product-photo-motion");
            const title = card.querySelector("h3");
            const details = card.querySelector(".v2-cut-bottom");
            if (!frame || !photo || !title || !details) return;
            const entrance = gsap.timeline({
              delay: (index % 4) * 0.09,
              scrollTrigger: {
                trigger: card,
                start: "top 91%",
                end: "bottom top",
                toggleActions: "restart reset restart reset",
              },
            });
            entrance
              .fromTo(
                frame,
                {
                  clipPath: "inset(0% 0% 100% 0%)",
                  y: 32,
                },
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  y: 0,
                  duration: 1.2,
                  ease: "power3.inOut",
                },
                0,
              )
              .fromTo(
                photo,
                { scale: 1.2, yPercent: -7 },
                {
                  scale: 1,
                  yPercent: 0,
                  duration: 1.65,
                  ease: "power3.out",
                },
                0.08,
              )
              .fromTo(
                title,
                { y: 22, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  ease: "power3.out",
                },
                0.5,
              )
              .fromTo(
                details,
                { y: 14, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.7,
                  ease: "power3.out",
                },
                0.67,
              );
          });
        const closingEntrance = gsap.timeline({
          scrollTrigger: {
            trigger: ".v2-closing-cta",
            start: "top 92%",
            end: "bottom top",
            toggleActions: "restart reset restart reset",
          },
        });
        closingEntrance
          .fromTo(
            ".v2-closing-background",
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.95,
              ease: "power3.inOut",
            },
            0,
          )
          .fromTo(
            ".v2-closing-cta .v2-closing-reveal",
            {
              x: -20,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.12,
              ease: "power3.out",
            },
            0.55,
          );
        gsap.to(".v2-running-copy", {
          xPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: ".v2-running-line",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
        gsap.to(".v2-progress", {
          scaleX: 1,
          transformOrigin: "left",
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
        });
      });
      media.add(
        "(min-width: 761px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            ".v2-why-wing",
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: ".v2-why-surround",
                start: "top 94%",
                end: "top 40%",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            },
          );
        },
      );
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const stage =
          root.current?.querySelector<HTMLElement>(".v2-craft-stage");
        const header = document.querySelector<HTMLElement>(".site-header");
        const syncOffset = () =>
          stage?.style.setProperty(
            "--craft-top",
            `${header?.getBoundingClientRect().height ?? 96}px`,
          );
        syncOffset();
        const observer = new ResizeObserver(syncOffset);
        if (header) observer.observe(header);
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".v2-craft-stage",
            start: () =>
              `top ${header?.getBoundingClientRect().height ?? 96}px`,
            end: () =>
              `+=${Math.max(1, (stage?.offsetHeight ?? 0) - (stage?.querySelector<HTMLElement>(".v2-craft")?.offsetHeight ?? 0))}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        timeline
          .to(
            ".v2-craft-mask",
            {
              clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
              ease: "none",
              duration: 1,
            },
            0,
          )
          .to(
            ".v2-craft-image",
            { scale: 1.03, xPercent: -3, ease: "none", duration: 1 },
            0,
          )
          .to(
            ".v2-craft-slash",
            { xPercent: -100, opacity: 0, duration: 0.7 },
            0,
          )
          .to(".v2-craft-first", { y: -45, opacity: 0, duration: 0.35 }, 0.4)
          .fromTo(
            ".v2-craft-last",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4 },
            0.65,
          );
        return () => observer.disconnect();
      });
    }, root);
    let active = true;
    document.fonts.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });
    return () => {
      active = false;
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <div
      ref={root}
      className="home-v2"
      data-intro={introReady ? "ready" : "loading"}
    >
      <LandingIntro onReveal={revealLanding} />
      <main id="main">
        <LandingHero introReady={introReady} />
        <div className="v2-page-content">
          <div className="v2-hero-continuation">
            <section
              id="tentang"
              className="v2-about-brief container"
              aria-labelledby="v2-about-brief-heading"
            >
              <div className="v2-about-halal v2-reveal">
                <Image
                  src="/images/tatsuo-halal-certificate.png"
                  alt="Informasi sertifikasi halal produk Tatsuo Beef beserta kode QR"
                  width={196}
                  height={196}
                  sizes="196px"
                  unoptimized
                />
              </div>
              <h2 id="v2-about-brief-heading" className="v2-reveal">
                Bahan pilihan.
                <br />
                <em>Mitra untuk dapur Anda.</em>
              </h2>
              <div className="v2-about-brief-copy v2-reveal">
                <p>
                  Sejak 2023, PT. Tatsuo Beef Indonesia hadir sebagai mitra
                  pengadaan daging sapi, ayam, dan bahan pangan pilihan untuk
                  bisnis kuliner. Kami membantu restoran, hotel, dan katering
                  menemukan bahan yang tepat untuk setiap sajian.
                </p>
                <Link href="/tentang" className="v2-underlined-link">
                  Tentang Kami <Arrow diagonal />
                </Link>
              </div>
            </section>
            <div className="v2-running-line" aria-hidden="true">
              <div className="v2-running-copy">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i}>
                    GOOD MEAT <CutMark /> GREAT PARTNERSHIP <CutMark />
                  </span>
                ))}
              </div>
              <span className="v2-running-caption">
                THE TATSUO WAY / EST. 2023
              </span>
            </div>

            <section id="produk" className="v2-favourites container">
              <h2 className="v2-favourites-title v2-reveal">Produk Unggulan</h2>
              <div className="v2-favourites-grid">
                {cuts.map((cut) => (
                  <article className="v2-favourite" key={cut.slug}>
                    <Link
                      className="v2-favourite-image-link"
                      href={`/produk/${cut.slug}`}
                      aria-label={`Kenali ${cut.name}`}
                    >
                      <div
                        className="v2-favourite-image"
                        style={{ aspectRatio: "4 / 3", position: "relative" }}
                      >
                        <div className="v2-product-photo-motion">
                          <Image
                            src={`/images/${cut.image}.webp`}
                            alt={cut.name}
                            width={1000}
                            height={1000}
                            sizes="(max-width: 600px) 90vw, (max-width: 1000px) 44vw, 23vw"
                          />
                        </div>
                      </div>
                    </Link>
                    <h3>
                      <Link href={`/produk/${cut.slug}`}>{cut.name}</Link>
                    </h3>
                    <div className="v2-cut-bottom">
                      <span
                        className="v2-product-rating"
                        role="img"
                        aria-label="Rating 4,5 dari 5 bintang"
                      >
                        {[0, 1, 2, 3, 4].map((star) => (
                          <svg
                            key={star}
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            aria-hidden="true"
                          >
                            <path
                              d="m12 2.5 2.9 5.9 6.5.95-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.95Z"
                              fill="#e4dcd0"
                            />
                            <path
                              d="m12 2.5 2.9 5.9 6.5.95-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.95Z"
                              fill="currentColor"
                              style={
                                star === 4
                                  ? { clipPath: "inset(0 50% 0 0)" }
                                  : undefined
                              }
                            />
                          </svg>
                        ))}
                      </span>
                      <Link
                        href={`/produk/${cut.slug}`}
                        aria-label={`Lihat detail ${cut.name}`}
                      >
                        LIHAT PRODUK{" "}
                        <span>
                          <Arrow />
                        </span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <div className="v2-why-surround">
              <span
                className="v2-why-wing v2-why-wing-left"
                aria-hidden="true"
              />
              <span
                className="v2-why-wing v2-why-wing-right"
                aria-hidden="true"
              />
              <WhyChooseUs />
              <TatsuoBenefits />
            </div>
          </div>

          <div className="v2-craft-stage">
            <section className="v2-craft" aria-labelledby="v2-craft-heading">
              <div className="v2-craft-mask">
                <Image
                  className="v2-craft-image"
                  src="/images/craft-butcher-hands-v1.webp"
                  alt="Tangan butcher memotong daging dengan teliti di atas meja kayu, tanpa wajah terlihat"
                  width={1672}
                  height={941}
                  sizes="100vw"
                  loading="eager"
                />
              </div>
              <div className="v2-craft-scrim" />
              <span className="v2-craft-slash" aria-hidden="true" />
              <div className="container v2-craft-content">
                <div className="v2-craft-top">
                  <span>THE ART BEHIND THE CUT</span>
                  <span>02 / THE SELECTION</span>
                </div>
                <div className="v2-craft-first">
                  <h2 id="v2-craft-heading">
                    Behind
                    <br />
                    every
                    <br />
                    <em>great dish.</em>
                  </h2>
                  <p>
                    Ada pilihan yang cermat.
                    <br />
                    Ada perhatian pada detail.
                    <br />
                    Ada mitra yang peduli.
                  </p>
                </div>
                <div className="v2-craft-last" aria-hidden="true">
                  <span>IT ALWAYS STARTS WITH</span>
                  <p>
                    A little
                    <br />
                    <em>more care.</em>
                  </p>
                </div>
                <div className="v2-craft-bottom">
                  <span>
                    SELECTED WITH INTENTION.
                    <br />
                    DELIVERED WITH PRIDE.
                  </span>
                  <Link href="/tentang">
                    Cerita di balik Tatsuo <Arrow diagonal />
                  </Link>
                </div>
              </div>
            </section>
          </div>
          <JournalPreview />

          <section
            className="v2-closing-cta"
            aria-labelledby="closing-cta-heading"
          >
            <div className="v2-closing-background" aria-hidden="true" />
            <div className="container v2-closing-layout">
              <h2 id="closing-cta-heading" className="v2-closing-reveal">
                Pasokan terbaik untuk sajian istimewa Anda.
              </h2>
              <div className="v2-closing-copy">
                <a
                  href={whatsapp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v2-closing-button v2-closing-reveal"
                >
                  Minta Katalog &amp; Harga
                </a>
              </div>
            </div>
          </section>
          <PartnersCarousel />
        </div>
      </main>
      <div className="scroll-progress v2-progress" aria-hidden="true" />
    </div>
  );
}
