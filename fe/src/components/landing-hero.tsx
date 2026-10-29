"use client";

import MobileOptimizedImage from "./mobile-optimized-image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Ambient from "./ambient";
import { Arrow, Asterisk } from "./icons";
import { whatsapp } from "@/lib/company";

/** The original Tatsuo hero, retained at the user's request. */
export default function LandingHero({
  introReady = true,
}: {
  introReady?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const header = document.querySelector<HTMLElement>(".site-header");
    const syncStickyOffset = () => {
      root.current?.style.setProperty(
        "--hero-sticky-top",
        `${header?.getBoundingClientRect().height ?? 96}px`,
      );
    };
    syncStickyOffset();
    const headerObserver = new ResizeObserver(syncStickyOffset);
    if (header) headerObserver.observe(header);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (!introReady) return;
        gsap.set(".hero-copy", { autoAlpha: 1 });
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
        gsap.fromTo(
          ".hero-copy",
          { autoAlpha: 1 },
          {
            autoAlpha: 0,
            immediateRender: false,
            ease: "none",
            scrollTrigger: {
              start: 0,
              end: () => Math.min(140, window.innerHeight * 0.18),
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });
      media.add("(prefers-reduced-motion: reduce)", () => {
        if (!introReady) return;
        gsap.set(".hero-copy", { autoAlpha: 1 });
        gsap.fromTo(
          ".hero-copy",
          { autoAlpha: 1 },
          {
            autoAlpha: 0,
            immediateRender: false,
            duration: 0,
            scrollTrigger: {
              start: 1,
              end: 2,
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, root);
    return () => {
      headerObserver.disconnect();
      media.revert();
      context.revert();
    };
  }, [introReady]);
  return (
    <div ref={root} className="v2-original-hero">
      <section
        className="hero"
        aria-labelledby="hero-heading"
        style={{ position: "relative" }}
      >
        <div
          className="hero-image-wrap"
          style={{ position: "absolute", inset: 0 }}
        >
          <MobileOptimizedImage
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
          <h1 id="hero-heading">
            <span className="hero-line">
              <span>Good meat.</span>
            </span>
            <span className="hero-line">
              <span className="hero-last-line">Great partnership.</span>
            </span>
          </h1>
          <div className="hero-actions">
            <a href="#produk" className="button button-red hero-reveal">
              <span>Jelajahi Produk</span>
              <Arrow diagonal />
            </a>
            <a
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="button hero-button-outline hero-reveal"
            >
              <span>Minta Katalog &amp; Harga</span>
              <Arrow diagonal />
            </a>
          </div>
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
        <div className="hero-edge" aria-hidden="true">
          THE BEGINNING OF SOMETHING GREAT
        </div>
      </section>
    </div>
  );
}
