"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow, Asterisk } from "./icons";
import MobileOptimizedImage from "./mobile-optimized-image";
import { whatsapp } from "@/lib/company";

const missions = [
  {
    title: "Menghadirkan bahan bermutu.",
    text: "Menyediakan pilihan bahan pangan dengan perhatian pada kualitas produk konsumsi.",
  },
  {
    title: "Melayani dengan sepenuh hati.",
    text: "Menempatkan kebutuhan pelanggan sebagai dasar pelayanan dan hubungan kerja sama.",
  },
  {
    title: "Tumbuh dalam kemitraan.",
    text: "Membangun ekosistem usaha yang baik dan berkelanjutan bersama mitra.",
  },
];
const principles = [
  ["Mutu", "Bahan yang baik adalah awal dari sajian yang baik."],
  ["Komitmen", "Menjaga tanggung jawab dalam setiap hubungan usaha."],
  ["Keterbukaan", "Berbisnis dengan adil dan komunikasi yang jelas."],
];
const partners = [
  ["Kanzler", "kanzler"],
  ["Mie Gacoan", "mie-gacoan"],
  ["Waroeng SS", "waroeng-ss"],
  ["Dkriuk Fried Chicken", "dkriuk"],
  ["Steak Moen-Moen", "steak-moen-moen"],
  ["Bale Bebakaran", "bale-bebakaran"],
];

export default function AboutExperience() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 760px)",
          desktop: "(min-width: 761px)",
        },
        (match) => {
          if (!match.conditions?.motion) return;
          const mobile = Boolean(match.conditions.mobile);
          const reveal = (
            targets: gsap.TweenTarget,
            trigger: Element,
            vars = {},
          ) =>
            gsap.fromTo(
              targets,
              { y: mobile ? 22 : 38, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: mobile ? 0.7 : 0.9,
                stagger: 0.09,
                ease: "power3.out",
                ...vars,
                scrollTrigger: {
                  trigger,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
                },
              },
            );

          const opening = gsap.timeline();
          opening
            .from(".about-manifesto-title b", {
              yPercent: 110,
              rotation: mobile ? 0 : 3,
              duration: 1.1,
              stagger: 0.14,
              ease: "power4.out",
            })
            .from(
              ".tatsuo-about-enter",
              {
                y: 18,
                opacity: 0,
                duration: 0.7,
                stagger: 0.1,
              },
              0.35,
            );

          // Animate the photograph inside each frame, keeping scroll transforms separate.
          const film = element.querySelector(".about-filmstrip")!;
          reveal(".about-filmstrip figure", film);
          gsap.fromTo(
            ".about-film-main img",
            { scale: 1.14 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: film,
                start: "top 95%",
                end: "center 40%",
                scrub: true,
              },
            },
          );
          gsap.fromTo(
            ".about-film-side:first-child img",
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: film,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
          gsap.fromTo(
            ".about-film-side:last-child img",
            { yPercent: 5 },
            {
              yPercent: -5,
              ease: "none",
              scrollTrigger: {
                trigger: film,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
          gsap.fromTo(
            ".about-film-seal",
            { rotation: -12, scale: 0.85 },
            {
              rotation: 3,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: film,
                start: "top 85%",
                end: "bottom 30%",
                scrub: true,
              },
            },
          );

          // A single staggered reading timeline replaces one trigger per word.
          gsap.fromTo(
            ".about-read-word",
            { opacity: 0.25 },
            {
              opacity: 1,
              stagger: 0.15,
              ease: "none",
              scrollTrigger: {
                trigger: "#about-vision-heading",
                start: "top 80%",
                end: "bottom 55%",
                scrub: true,
              },
            },
          );
          gsap.to(".tatsuo-about-vision > svg", {
            rotation: 150,
            ease: "none",
            scrollTrigger: {
              trigger: ".tatsuo-about-purpose",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });

          // General reveals exclude sections that have their own choreography.
          gsap.utils
            .toArray<HTMLElement>(".tatsuo-about-reveal")
            .forEach((item) => {
              if (
                item.matches(
                  ".tatsuo-about-story-copy, .tatsuo-about-vision, .tatsuo-about-mission, .tatsuo-about-principle, .tatsuo-about-halal-document, .tatsuo-about-partners, .tatsuo-about-outro-inner",
                )
              )
                return;
              reveal(item, item);
            });
          const story = element.querySelector(".tatsuo-about-story-copy")!;
          reveal(story.children, story);
          const vision = element.querySelector(".tatsuo-about-vision")!;
          reveal(vision.querySelectorAll(".tatsuo-about-label, p"), vision);
          gsap.utils
            .toArray<HTMLElement>(
              ".tatsuo-about-mission, .tatsuo-about-principle",
            )
            .forEach((row) => {
              reveal(row.children, row);
              gsap.fromTo(
                row,
                { "--about-rule": 0 },
                {
                  "--about-rule": 1,
                  duration: 0.9,
                  ease: "power3.inOut",
                  scrollTrigger: {
                    trigger: row,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                  },
                },
              );
            });
          const documentCard = element.querySelector(
            ".tatsuo-about-halal-document",
          )!;
          gsap.fromTo(
            documentCard,
            { y: mobile ? 28 : 50, rotation: mobile ? -2 : -5, opacity: 0 },
            {
              y: 0,
              rotation: 0,
              opacity: 1,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: {
                trigger: documentCard,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            },
          );
          const partnerGrid = element.querySelector(".tatsuo-about-partners")!;
          reveal(partnerGrid.children, partnerGrid, {
            stagger: mobile ? 0.08 : 0.12,
          });
          const outro = element.querySelector(".tatsuo-about-outro-inner")!;
          reveal(outro.children, outro, { stagger: 0.16 });
          gsap.fromTo(
            ".tatsuo-about-outro",
            { "--about-curtain": 0 },
            {
              "--about-curtain": 1,
              duration: 1.1,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: ".tatsuo-about-outro",
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            },
          );
        },
      );
    }, element);
    return () => {
      media.revert();
      context.revert();
    };
  }, []);
  return (
    <main id="main" className="tatsuo-about" ref={root}>
      <section className="about-manifesto-hero" aria-labelledby="about-title">
        <div className="container">
          <div className="about-manifesto-meta tatsuo-about-enter">
            <span>PT. TATSUO BEEF INDONESIA</span>
            <span>BERMULA DI 2023 — BERTUMBUH BERSAMA.</span>
          </div>
          <h1 id="about-title" className="about-manifesto-title">
            <span>
              <b>Good meat.</b>
            </span>
            <span>
              <b>
                Great <em>people.</em>
              </b>
            </span>
          </h1>
          <div className="about-manifesto-intro tatsuo-about-enter">
            <span>
              TENTANG KAMI <Arrow />
            </span>
            <p>
              Bahan pilihan mempertemukan kita.
              <br />
              Kepercayaan membuat kita tumbuh bersama.
            </p>
            <a href="#cerita-kami" aria-label="Baca cerita Tatsuo">
              <Arrow />
            </a>
          </div>
        </div>
        <div className="about-filmstrip">
          <figure className="about-film-side">
            <Image
              src="/images/distribution/dock-restored-v1.webp"
              alt="Dokumentasi area distribusi Tatsuo"
              width={1600}
              height={736}
              sizes="(max-width: 760px) 25vw, 25vw"
            />
            <figcaption>01 / DARI TEMPAT KAMI</figcaption>
          </figure>
          <figure className="about-film-main">
            <MobileOptimizedImage
              src="/images/craft-butcher-hands-v1.webp"
              alt="Ilustrasi ketelitian dalam menyiapkan bahan pilihan"
              width={1672}
              height={941}
              priority
              sizes="(max-width: 760px) 80vw, 60vw"
            />
            <figcaption>02 / DENGAN PERHATIAN</figcaption>
            <span className="about-film-seal">
              <Asterisk />
              <span>
                GOOD THINGS
                <br />
                START HERE.
              </span>
            </span>
          </figure>
          <figure className="about-film-side">
            <Image
              src="/images/product-shortplate.webp"
              alt="Irisan daging pilihan Tatsuo"
              width={1000}
              height={1000}
              sizes="25vw"
            />
            <figcaption>03 / UNTUK DAPUR ANDA</figcaption>
          </figure>
        </div>
      </section>

      <section
        id="cerita-kami"
        className="container tatsuo-about-story"
        aria-labelledby="about-story-heading"
      >
        <div className="tatsuo-about-story-aside tatsuo-about-reveal">
          <span className="tatsuo-about-label">01 / CERITA KAMI</span>
          <div className="tatsuo-about-identity">
            <Image
              src="/images/logo-vertical-original.png"
              alt="Tatsuo Beef"
              width={300}
              height={300}
              sizes="140px"
            />
            <span>
              PT. Tatsuo Beef Indonesia
              <br />
              Kartasura, Sukoharjo
            </span>
          </div>
        </div>
        <div className="tatsuo-about-story-copy tatsuo-about-reveal">
          <h2 id="about-story-heading">
            Lebih dekat dengan dapur.
            <br />
            <em>Lebih jauh dalam kemitraan.</em>
          </h2>
          <p>
            Sejak 2023, PT. Tatsuo Beef Indonesia hadir untuk membantu usaha
            kuliner memenuhi kebutuhan bahan pangan. Kami menyediakan ayam,
            daging sapi impor, dan daging sapi lokal untuk beragam kebutuhan
            dapur.
          </p>
          <p>
            Tujuan kami tumbuh bersama Anda: membangun hubungan usaha yang baik,
            terbuka, dan berkelanjutan. Karena bahan yang Anda pilih hari ini
            adalah bagian dari cerita usaha Anda berikutnya.
          </p>
          <div className="tatsuo-about-selection">
            <span>Daging sapi impor &amp; lokal</span>
            <span>Daging ayam</span>
            <span>Bahan pangan pilihan</span>
          </div>
        </div>
      </section>

      <section
        className="tatsuo-about-purpose"
        aria-labelledby="about-vision-heading"
      >
        <div className="container">
          <div className="tatsuo-about-vision tatsuo-about-reveal">
            <span className="tatsuo-about-label">02 / VISI KAMI</span>
            <Asterisk />
            <h2
              id="about-vision-heading"
              aria-label="Menjadi pilihan terdepan untuk bahan pangan bermutu dan pelayanan yang berarti."
            >
              {"Menjadi pilihan terdepan untuk bahan pangan bermutu dan pelayanan yang berarti."
                .split(" ")
                .map((word, index) => (
                  <span
                    className="about-read-word"
                    aria-hidden="true"
                    key={index}
                  >
                    {word}{" "}
                  </span>
                ))}
            </h2>
            <p>
              Inilah arah yang kami tuju. Langkahnya dimulai dari cara kami
              bekerja setiap hari.
            </p>
          </div>
          <div className="tatsuo-about-missions">
            <div className="tatsuo-about-reveal">
              <span className="tatsuo-about-label">MISI KAMI</span>
              <h3>
                Untuk sampai ke sana,
                <br />
                <em>ini langkah kami.</em>
              </h3>
            </div>
            <div>
              {missions.map((item, index) => (
                <article
                  className="tatsuo-about-mission tatsuo-about-reveal"
                  key={item.title}
                >
                  <span>0{index + 1}</span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                  <Arrow diagonal />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="container tatsuo-about-principles"
        aria-labelledby="about-values-heading"
      >
        <header className="tatsuo-about-reveal">
          <span className="tatsuo-about-label">
            03 / NILAI YANG KAMI PEGANG
          </span>
          <h2 id="about-values-heading">
            Cara kami bekerja.
            <br />
            <em>Alasan Anda percaya.</em>
          </h2>
        </header>
        <div className="tatsuo-about-principles-grid">
          {principles.map(([title, text], index) => (
            <article
              className="tatsuo-about-principle tatsuo-about-reveal"
              key={title}
            >
              <span>0{index + 1}</span>
              <h3>
                {title}
                <em>.</em>
              </h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="halal"
        className="tatsuo-about-halal"
        aria-labelledby="about-halal-heading"
      >
        <div className="container tatsuo-about-halal-inner">
          <div className="tatsuo-about-halal-copy tatsuo-about-reveal">
            <span className="tatsuo-about-label">04 / KOMITMEN HALAL</span>
            <h2 id="about-halal-heading">
              Bukan sekadar pilihan.
              <br />
              <em>Soal ketenangan.</em>
            </h2>
            <p>
              Kepercayaan berawal dari informasi yang jelas. Berikut informasi
              sertifikasi halal produk Tatsuo Beef yang juga kami tampilkan di
              halaman utama.
            </p>
            <a
              className="tatsuo-about-link"
              href={whatsapp(
                "Halo Tatsuo Beef, saya ingin meminta informasi dan dokumen sertifikasi halal untuk kebutuhan pengadaan usaha saya.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tanyakan dokumen halal <Arrow diagonal />
            </a>
          </div>
          <figure className="tatsuo-about-halal-document tatsuo-about-reveal">
            <div className="tatsuo-about-document-header">
              <span>INFORMASI SERTIFIKASI HALAL</span>
              <span>TATSUO BEEF</span>
            </div>
            <Image
              src="/images/tatsuo-halal-certificate.png"
              alt="Informasi produk Tatsuo Beef bersertifikat halal beserta tanda Halal Indonesia dan kode QR asli"
              width={196}
              height={196}
              unoptimized
            />
            <figcaption>Informasi halal produk Tatsuo Beef.</figcaption>
            <a
              href="/images/tatsuo-halal-certificate.png"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buka gambar asli <Arrow diagonal />
            </a>
          </figure>
        </div>
      </section>

      <section
        className="container tatsuo-about-company"
        aria-labelledby="about-partners-heading"
      >
        <div className="tatsuo-about-company-heading tatsuo-about-reveal">
          <span className="tatsuo-about-label">BERTUMBUH BERSAMA</span>
          <h2 id="about-partners-heading">
            Dalam lingkaran
            <br />
            <em>kemitraan yang baik.</em>
          </h2>
        </div>
        <div className="tatsuo-about-partners tatsuo-about-reveal">
          {partners.map(([name, slug]) => (
            <div key={slug}>
              <Image
                src={`/images/partners/${slug}.webp`}
                alt={name}
                width={500}
                height={500}
                sizes="(max-width: 600px) 38vw, 15vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="tatsuo-about-outro">
        <div className="container tatsuo-about-outro-inner tatsuo-about-reveal">
          <span className="tatsuo-about-label">
            CERITA BERIKUTNYA, KITA TULIS BERSAMA.
          </span>
          <h2>
            Good meat.
            <br />
            <em>Great partnership.</em>
          </h2>
          <div>
            <a
              className="tatsuo-about-button"
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Mulai percakapan <Arrow diagonal />
            </a>
            <Link className="tatsuo-about-link" href="/produk">
              Kenali pilihan produk <Arrow diagonal />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
