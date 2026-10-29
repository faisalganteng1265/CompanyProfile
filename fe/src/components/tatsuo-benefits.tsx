"use client";

import Image from "next/image";
import localFont from "next/font/local";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import promisePhoto from "@/assets/promise-butcher-table-v1.webp";
import "./tatsuo-benefits.css";

const script = localFont({
  src: "../app/fonts/Allura-Regular.ttf",
  variable: "--font-promise-script",
  display: "swap",
});

const promises = [
  {
    title: "Bahan pilihan",
    accent: "Kualitas tanpa kompromi.",
    description:
      "Dari daging sapi hingga ayam dan seafood, kami membantu Anda memilih bahan yang tepat. Karena sajian yang istimewa selalu dimulai dari kualitas bahan bakunya.",
  },
  {
    title: "Pasokan terjaga",
    accent: "Untuk setiap sajian.",
    description:
      "Ketersediaan stok dan koordinasi pengadaan yang membantu menjaga ritme dapur Anda. Diskusikan pilihan produk, jumlah, dan jadwal kebutuhan bersama tim Tatsuo.",
  },
  {
    title: "Lebih dari pemasok",
    accent: "Mitra untuk tumbuh.",
    description:
      "Pelayanan yang responsif, komunikasi yang terbuka, dan komitmen dalam setiap kerja sama. Kami hadir untuk mendukung langkah berikutnya dari bisnis kuliner Anda.",
  },
];
const tiles = [
  "product-oxtail",
  "product-tenderloin",
  "product-shortplate",
  "product-chicken",
  "product-sirloin",
  "product-saikoro",
  "product-salmon",
  "product-shrimp",
];

export default function TatsuoBenefits() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          mobile: "(max-width: 760px)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (match) => {
          if (!match.conditions?.motion) return;
          const mobile = Boolean(match.conditions.mobile);
          gsap.fromTo(
            ".tatsuo-promise-row",
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.12,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: root.current,
                start: "top 89%",
                end: "bottom top",
                toggleActions: "restart reset restart reset",
              },
            },
          );
          gsap.fromTo(
            ".tatsuo-promise-collage",
            mobile ? { y: 20, opacity: 0 } : { clipPath: "inset(0 0 100% 0)" },
            {
              ...(mobile
                ? { y: 0, opacity: 1 }
                : { clipPath: "inset(0 0 0% 0)" }),
              duration: mobile ? 0.65 : 1.2,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: root.current,
                start: "top 89%",
                end: "bottom top",
                toggleActions: "restart reset restart reset",
              },
            },
          );
        },
      );
    }, root);
    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className={`tatsuo-benefits ${script.variable}`}
      aria-labelledby="tatsuo-benefits-heading"
    >
      <div className="container tatsuo-benefits-inner">
        <h2 id="tatsuo-benefits-heading" className="sr-only">
          The Tatsuo Promise
        </h2>
        <div className="tatsuo-promise-layout">
          <div className="tatsuo-promise-list">
            {promises.map((promise, index) => (
              <article
                key={promise.title}
                className={`tatsuo-promise-row ${active === index ? "is-active" : ""}`}
              >
                <h3>
                  <button
                    type="button"
                    id={`promise-trigger-${index}`}
                    aria-expanded={active === index}
                    aria-controls={`promise-panel-${index}`}
                    onClick={() => setActive(index)}
                  >
                    <span className="tatsuo-promise-toggle" aria-hidden="true">
                      <i />
                      <i />
                    </span>
                    <span className="tatsuo-promise-titles">
                      <span className="tatsuo-promise-title">
                        {promise.title}
                      </span>
                      <span className="tatsuo-promise-script">
                        {promise.accent}
                      </span>
                    </span>
                  </button>
                </h3>
                <div
                  id={`promise-panel-${index}`}
                  role="region"
                  aria-labelledby={`promise-trigger-${index}`}
                  aria-hidden={active !== index}
                  className="tatsuo-promise-answer"
                >
                  <div>
                    <p>{promise.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div
            className="tatsuo-promise-collage"
            aria-label="Pilihan bahan dan ketelitian proses Tatsuo"
          >
            <div className="tatsuo-promise-strip" aria-hidden="true">
              {tiles.slice(0, 4).map((tile) => (
                <div className="tatsuo-promise-tile" key={tile}>
                  <Image
                    src={`/images/${tile}.webp`}
                    alt=""
                    width={1000}
                    height={1000}
                    sizes="(max-width: 760px) 25vw, 13vw"
                  />
                </div>
              ))}
            </div>
            <div className="tatsuo-promise-main-photo">
              <Image
                src={promisePhoto}
                alt="Tangan butcher menyiapkan potongan daging dengan teliti di atas meja kerja kayu"
                width={1254}
                height={1254}
                sizes="(max-width: 760px) calc(100vw - 40px), 50vw"
                loading="lazy"
              />
            </div>
            <div className="tatsuo-promise-strip" aria-hidden="true">
              {tiles.slice(4).map((tile) => (
                <div className="tatsuo-promise-tile" key={tile}>
                  <Image
                    src={`/images/${tile}.webp`}
                    alt=""
                    width={1000}
                    height={1000}
                    sizes="(max-width: 760px) 25vw, 13vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="tatsuo-promise-signoff" aria-hidden="true">
          <span>Inilah janji</span>
          <strong>TATSUO.</strong>
        </div>
      </div>
    </section>
  );
}
