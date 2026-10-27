"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./tatsuo-benefits.css";

const benefits = [
  {
    icon: "quality",
    title: "Bahan Pangan Kualitas Terbaik",
    description:
      "Bahan pilihan untuk menjaga karakter rasa di setiap sajian Anda.",
  },
  {
    icon: "guarantee",
    title: "Garansi Produk Mutu Tinggi",
    description:
      "Perhatian pada mutu, dari pemilihan produk hingga kebutuhan dapur Anda.",
  },
  {
    icon: "service",
    title: "Pelayanan Profesional Terbaik",
    description: "Tim yang siap mendengar dan membantu kebutuhan usaha Anda.",
  },
  {
    icon: "price",
    title: "Harga yang Kompetitif & Bersaing",
    description:
      "Pilihan produk dan penawaran yang sesuai dengan kebutuhan bisnis.",
  },
  {
    icon: "stock",
    title: "Ketersediaan Stok yang Kontinu",
    description:
      "Koordinasi pasokan untuk mendukung ritme operasional dapur Anda.",
  },
  {
    icon: "partnership",
    title: "Komitmen & Keberlanjutan",
    description: "Hubungan yang terbuka, dengan semangat untuk tumbuh bersama.",
  },
];

export default function TatsuoBenefits() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".tatsuo-benefit").forEach((card) => {
          const icon = card.querySelector(".tatsuo-benefit-icon");
          const copy = card.querySelector(".tatsuo-benefit-copy");
          if (!icon || !copy) return;
          gsap
            .timeline({
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                end: "bottom top",
                toggleActions: "restart reset restart reset",
              },
            })
            .fromTo(
              icon,
              { y: 26, opacity: 0, rotate: -6, scale: 0.9 },
              {
                y: 0,
                opacity: 1,
                rotate: 0,
                scale: 1,
                duration: 1.05,
                ease: "power3.out",
              },
            )
            .fromTo(
              copy,
              { y: 18, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
              },
              0.14,
            );
        });
      });
    }, root);
    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="tatsuo-benefits"
      aria-labelledby="tatsuo-benefits-heading"
    >
      <div className="container tatsuo-benefits-inner">
        <div className="tatsuo-sauce tatsuo-sauce-top" aria-hidden="true">
          <Image
            src="/images/benefits/sauce-splash-v1.webp"
            alt=""
            width={1000}
            height={400}
            sizes="(max-width: 760px) 260px, 460px"
          />
        </div>
        <div className="tatsuo-sauce tatsuo-sauce-bottom" aria-hidden="true">
          <Image
            src="/images/benefits/sauce-splash-v1.webp"
            alt=""
            width={1000}
            height={400}
            sizes="(max-width: 760px) 260px, 460px"
          />
        </div>
        <header className="tatsuo-benefits-heading">
          <span>THE TATSUO PROMISE</span>
          <h2 id="tatsuo-benefits-heading">
            Pilihan yang baik.
            <br />
            <em>Untuk langkah yang lebih jauh.</em>
          </h2>
        </header>
        <div className="tatsuo-benefits-grid">
          {benefits.map((benefit, index) => (
            <article
              key={benefit.icon}
              className={`tatsuo-benefit ${index < 2 ? "tatsuo-benefit-lead" : ""}`}
            >
              <div className="tatsuo-benefit-icon">
                <Image
                  src={`/images/benefits/${benefit.icon}.webp`}
                  alt=""
                  width={320}
                  height={320}
                  sizes={index < 2 ? "(max-width: 760px) 96px, 148px" : "88px"}
                />
              </div>
              <div className="tatsuo-benefit-copy">
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
