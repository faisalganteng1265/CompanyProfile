"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LandingHero from "./landing-hero";
import WhyChooseUs from "./why-choose-us";
import PartnersCarousel from "./partners-carousel";
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
];
const questions = [
  [
    "Apakah Tatsuo melayani kebutuhan bisnis?",
    "Ya. Tatsuo menyediakan daging sapi impor, daging sapi lokal, ayam, dan pilihan seafood untuk kebutuhan usaha kuliner. Ceritakan menu dan pola kebutuhan Anda kepada tim kami.",
  ],
  [
    "Bagaimana mendapatkan katalog dan harga?",
    "Pilih produk untuk mengenal potongannya, atau hubungi tim sales melalui WhatsApp. Kami bantu memberikan informasi spesifikasi, harga terbaru, dan ketersediaan produk.",
  ],
  [
    "Apakah ada minimum pemesanan?",
    "Minimum pemesanan dapat berbeda untuk setiap produk. Sampaikan pilihan produk, perkiraan jumlah, dan lokasi usaha agar tim dapat menyiapkan penawaran yang sesuai.",
  ],
  [
    "Apakah pengiriman bisa ke lokasi usaha saya?",
    "Tatsuo berlokasi di Kartasura, Sukoharjo. Diskusikan tujuan pengiriman dengan tim kami untuk mengonfirmasi jangkauan, jadwal, dan biayanya.",
  ],
];
const voices = [
  {
    quote:
      "Stok Shortplate Beef mereka selalu kontinu, dan tim sales-nya sangat responsif. Sangat fair dan profesional.",
    name: "Arief",
    role: "Manajer Pembelian, Seoul Grill",
    label: "A PARTNER YOU CAN COUNT ON",
  },
  {
    quote:
      "Kualitas buntut sapinya konsisten, dagingnya empuk, dan membuat kaldu kami benar-benar kaya rasa.",
    name: "Chef Budi",
    role: "Waroeng SS Sambal",
    label: "GOOD INGREDIENTS. MEMORABLE DISHES.",
  },
  {
    quote:
      "Tekstur juicy dan kelembutannya sempurna untuk menu steak kami. Pelayanan juga selalu prima.",
    name: "Maria",
    role: "Pemilik Western Steakhouse",
    label: "THE DETAILS MAKE A DIFFERENCE",
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
function Eyebrow({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="v2-eyebrow">
      <span>{number}</span>
      <span>{children}</span>
      <span className="v2-eyebrow-rule" />
    </div>
  );
}

export default function LandingV2() {
  const root = useRef<HTMLDivElement>(null);
  const [question, setQuestion] = useState<number | null>(0);
  const [voice, setVoice] = useState(0);
  const current = voices[voice];
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
          .forEach((el, index) => {
            gsap.from(el, {
              y: index % 2 ? 70 : 35,
              opacity: 0,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 95%", once: true },
              clearProps: "transform,opacity",
            });
          });
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
        gsap.from(".v2-about-word", {
          color: "#c6c0b5",
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".v2-about-statement",
            start: "top 80%",
            end: "bottom 45%",
            scrub: 1,
          },
        });
        gsap.fromTo(
          ".v2-about-image img",
          { yPercent: -6, scale: 1.1 },
          {
            yPercent: 6,
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: ".v2-about",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
        gsap.to(".v2-progress", {
          scaleX: 1,
          transformOrigin: "left",
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
        });
      });
      media.add(
        "(min-width: 1000px) and (prefers-reduced-motion: no-preference)",
        () => {
          const headerHeight =
            document.querySelector(".site-header")?.getBoundingClientRect()
              .height || 96;
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".v2-craft",
              start: `top ${headerHeight}`,
              end: "+=105%",
              pin: true,
              scrub: 1,
              anticipatePin: 1,
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
        },
      );
      media.add(
        "(max-width: 999px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.fromTo(
            ".v2-craft-image",
            { scale: 1.15, yPercent: -5 },
            {
              scale: 1.03,
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: ".v2-craft",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        },
      );
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
    <div ref={root} className="home-v2">
      <main id="main">
        <LandingHero />
        <section
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
              pengadaan daging sapi, ayam, dan bahan pangan pilihan untuk bisnis
              kuliner. Kami membantu restoran, hotel, dan katering menemukan
              bahan yang tepat untuk setiap sajian.
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
          <span className="v2-running-caption">THE TATSUO WAY / EST. 2023</span>
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
                    <Image
                      src={`/images/${cut.image}.webp`}
                      alt={cut.name}
                      width={1000}
                      height={1000}
                      sizes="(max-width: 600px) 90vw, (max-width: 1000px) 44vw, 23vw"
                    />
                  </div>
                </Link>
                <h3>
                  <Link href={`/produk/${cut.slug}`}>{cut.name}</Link>
                </h3>
                <div className="v2-cut-bottom">
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

        <WhyChooseUs />

        <section className="v2-craft" aria-labelledby="v2-craft-heading">
          <div className="v2-craft-mask">
            <Image
              className="v2-craft-image"
              src="/images/story-selection-v2.webp"
              alt="Butcher memilih ribeye bermarbling dengan cermat"
              width={1122}
              height={1402}
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

        <section id="tentang" className="v2-about container">
          <div className="v2-about-intro">
            <Eyebrow number="03">GOOD PEOPLE. GOOD PARTNERSHIP.</Eyebrow>
            <p className="v2-about-statement">
              {"Bukan sekadar bahan yang Anda beli. Tapi mitra yang Anda percaya."
                .split(" ")
                .map((word, i) => (
                  <span className="v2-about-word" key={`${word}-${i}`}>
                    {word}{" "}
                  </span>
                ))}
            </p>
          </div>
          <div className="v2-about-lower">
            <div className="v2-about-image">
              <Image
                src="/images/hero.webp"
                alt="Detail marbling daging sapi pilihan"
                width={1672}
                height={941}
                sizes="(max-width: 760px) 90vw, 38vw"
              />
              <div className="v2-butcher-ticket">
                <span>THE GOOD CUT</span>
                <strong>2023</strong>
                <span>OUR STORY BEGINS.</span>
                <div aria-hidden="true" className="v2-barcode" />
              </div>
            </div>
            <div className="v2-about-copy v2-reveal">
              <p className="v2-about-lead">
                Di dapur Anda, setiap bahan punya peran.
                <br />
                Dalam bisnis Anda, setiap mitra juga.
              </p>
              <p>
                Sejak 2023, PT. Tatsuo Beef Indonesia hadir untuk memenuhi
                kebutuhan daging sapi, ayam, dan bahan pangan pilihan bagi usaha
                kuliner. Dari menu yang baru direncanakan hingga sajian yang
                sudah menjadi favorit.
              </p>
              <p>
                Kami menjaga hubungan melalui hal-hal sederhana: pilihan yang
                tepat, komunikasi yang terbuka, dan komitmen untuk tumbuh
                bersama.
              </p>
              <Link href="/tentang" className="v2-underlined-link">
                Kenali Tatsuo lebih dekat <Arrow diagonal />
              </Link>
              <div className="v2-business-types">
                <span>RESTAURANTS</span>
                <span>HOSPITALITY</span>
                <span>FOOD SERVICE</span>
              </div>
            </div>
          </div>
        </section>

        <section className="v2-voices">
          <div className="container">
            <div className="v2-voices-top">
              <CutMark light />
              <span>GOOD WORDS FROM GOOD COMPANY</span>
              <span>0{voice + 1} / 03</span>
            </div>
            <div className="v2-voice-content" aria-live="polite">
              <span className="v2-voice-label">{current.label}</span>
              <blockquote key={voice}>{current.quote}</blockquote>
              <div className="v2-voice-bottom">
                <div>
                  <span className="v2-voice-name">{current.name}</span>
                  <span className="v2-voice-role">{current.role}</span>
                </div>
                <div className="v2-voice-controls">
                  <button
                    type="button"
                    aria-label="Testimoni sebelumnya"
                    onClick={() => setVoice((voice + 2) % 3)}
                  >
                    <Arrow className="arrow-back" />
                  </button>
                  <button
                    type="button"
                    aria-label="Testimoni berikutnya"
                    onClick={() => setVoice((voice + 1) % 3)}
                  >
                    <Arrow />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <PartnersCarousel />

        <section className="v2-questions container">
          <div className="v2-questions-intro">
            <span className="v2-small-label">A FEW THINGS TO KNOW</span>
            <h2>
              Good
              <br />
              <em>questions.</em>
            </h2>
            <p>
              Hal-hal yang mungkin ingin Anda tahu
              <br />
              sebelum kita mulai bekerja sama.
            </p>
            <a
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="v2-underlined-link"
            >
              Tanya langsung <Arrow diagonal />
            </a>
          </div>
          <div className="v2-question-list">
            {questions.map(([title, answer], index) => (
              <div
                className={`v2-question ${question === index ? "is-open" : ""}`}
                key={title}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() =>
                      setQuestion(question === index ? null : index)
                    }
                    aria-expanded={question === index}
                    aria-controls={`v2-answer-${index}`}
                  >
                    <span className="v2-question-index">0{index + 1}</span>
                    <span>{title}</span>
                    <span className="v2-question-toggle" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`v2-answer-${index}`}
                  className="v2-answer"
                  hidden={question !== index}
                >
                  <p>{answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <div className="scroll-progress v2-progress" aria-hidden="true" />
    </div>
  );
}
