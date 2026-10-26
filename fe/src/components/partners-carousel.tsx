"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const partners = [
  { name: "Kanzler", image: "kanzler", width: 500, height: 500, shape: "wide" },
  {
    name: "Mie Gacoan",
    image: "mie-gacoan",
    width: 600,
    height: 600,
    shape: "wide",
  },
  {
    name: "Waroeng SS",
    image: "waroeng-ss",
    width: 554,
    height: 554,
    shape: "square",
  },
  {
    name: "Dkriuk Fried Chicken",
    image: "dkriuk",
    width: 600,
    height: 600,
    shape: "wide",
  },
  {
    name: "Steak Moen-Moen",
    image: "steak-moen-moen",
    width: 600,
    height: 209,
    shape: "contain",
  },
  {
    name: "Bale Bebakaran",
    image: "bale-bebakaran",
    width: 554,
    height: 554,
    shape: "wide",
  },
];

export default function PartnersCarousel() {
  const section = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!section.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={section}
      className="partners-section"
      aria-labelledby="partners-heading"
    >
      <div className="container">
        <div className="partners-heading-row">
          <div>
            <span className="eyebrow">THE COMPANY WE KEEP</span>
            <h2 id="partners-heading">
              Good company.
              <br />
              <em>Great partnerships.</em>
            </h2>
          </div>
          <div className="partners-heading-aside">
            <p>
              Bagian dari cerita yang baik.
              <br />
              Bersama nama-nama yang Anda kenal.
            </p>
            <button
              className="partners-playback"
              type="button"
              onClick={() => setPaused(!paused)}
              aria-label={
                paused ? "Putar carousel partner" : "Jeda carousel partner"
              }
              aria-pressed={paused}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                {paused ? (
                  <path d="m7 4 9 6-9 6V4Z" fill="currentColor" />
                ) : (
                  <>
                    <path
                      d="M7 4v12M13 4v12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </>
                )}
              </svg>
              <span>{paused ? "PLAY" : "PAUSE"}</span>
            </button>
          </div>
        </div>
        <div
          className="partners-viewport"
          role="region"
          aria-label="Partner Tatsuo Beef"
          aria-roledescription="carousel"
        >
          <div
            className="partner-marquee-track"
            style={{
              animationPlayState: paused || !visible ? "paused" : undefined,
            }}
          >
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="partner-marquee-group"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {partners.map((partner) => (
                  <li key={partner.image} className="partner-logo-card">
                    <div
                      className={`partner-logo-frame partner-logo-${partner.shape}`}
                    >
                      <Image
                        src={`/images/partners/${partner.image}.webp`}
                        alt={copy === 0 ? partner.name : ""}
                        width={partner.width}
                        height={partner.height}
                        sizes="180px"
                        draggable={false}
                      />
                    </div>
                    <span className="partner-logo-caption" aria-hidden="true">
                      {partner.name}
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="partners-footnote">
          <span>OUR PARTNERS</span>
          <span>GROWING TOGETHER. EVERY DAY.</span>
        </div>
      </div>
    </section>
  );
}
