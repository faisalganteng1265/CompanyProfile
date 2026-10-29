"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { articles } from "@/lib/articles";
import { Arrow } from "./icons";
import "./journal.css";

export default function JournalPreview() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
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
          gsap.utils.toArray<HTMLElement>(".journal-card").forEach((card) => {
            if (mobile) {
              const image = card.querySelector(".journal-image");
              const copy = card.querySelector(".journal-copy");
              const entrance = gsap.timeline({
                scrollTrigger: {
                  trigger: card,
                  start: "top 93%",
                  end: "bottom top",
                  toggleActions: "restart reset restart reset",
                },
              });
              if (image)
                entrance.fromTo(
                  image,
                  { y: 24, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
                  0,
                );
              if (copy)
                entrance.fromTo(
                  copy,
                  { y: 18, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                  0.16,
                );
              return;
            }
            const image = card.querySelector(".journal-image");
            const copy = card.querySelector(".journal-copy");
            if (!image || !copy) return;
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: card,
                  start: "top 91%",
                  end: "bottom top",
                  toggleActions: "restart reset restart reset",
                },
              })
              .fromTo(
                image,
                { clipPath: "inset(0 0 100% 0)" },
                {
                  clipPath: "inset(0 0 0% 0)",
                  duration: 1.1,
                  ease: "power3.inOut",
                },
              )
              .fromTo(
                copy,
                { y: 22, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.85,
                  ease: "power3.out",
                },
                0.3,
              );
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
    <section
      ref={root}
      id="artikel"
      className="journal-section"
      aria-labelledby="journal-heading"
    >
      <div className="container journal-inner">
        <header className="journal-heading">
          <div>
            <span className="journal-kicker">ARTIKEL &amp; INSPIRASI</span>
            <h2 id="journal-heading">
              Catatan
              <br />
              <em>dari dapur.</em>
            </h2>
          </div>
          <p>
            Tentang bahan yang dipilih,
            <br />
            sajian yang dirancang,
            <br />
            dan usaha yang terus tumbuh.
          </p>
        </header>
        <div className="journal-grid">
          {articles.map((article, index) => (
            <article
              key={article.slug}
              className={`journal-card ${index === 0 ? "journal-feature" : "journal-side"}`}
            >
              <Link
                className="journal-card-link"
                href={`/artikel/${article.slug}`}
              >
                <div className="journal-image">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    width={1200}
                    height={900}
                    sizes={
                      index === 0
                        ? "(max-width: 760px) 100vw, 48vw"
                        : "(max-width: 760px) 35vw, 22vw"
                    }
                  />
                  <span className="journal-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <div className="journal-copy">
                  <div className="journal-meta">
                    <span>{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <span className="journal-read">
                    Baca cerita{" "}
                    <span>
                      <Arrow diagonal />
                    </span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
