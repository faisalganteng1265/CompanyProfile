"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow, Asterisk } from "./icons";
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
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".about-manifesto-title b", {
          yPercent: 110,
          rotation: 3,
          duration: 1.15,
          stagger: 0.12,
          ease: "power4.out",
          clearProps: "transform",
        });
        gsap.from(".about-filmstrip figure", {
          y: 45,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          delay: 0.3,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
        gsap.utils.toArray<HTMLElement>(".about-read-word").forEach((word) => {
          gsap.fromTo(
            word,
            { opacity: 0.22 },
            {
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: word,
                start: "top 85%",
                end: "top 55%",
                scrub: 0.35,
              },
            },
          );
        });
        gsap.from(".about-film-main", {
          scale: 0.92,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-filmstrip",
            start: "top bottom",
            end: "center center",
            scrub: 0.5,
          },
        });
        gsap.from(".tatsuo-about-enter", {
          y: 28,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
        gsap.utils
          .toArray<HTMLElement>(".tatsuo-about-reveal")
          .forEach((item) => {
            gsap.fromTo(
              item,
              { y: 26, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
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
            <Image
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
