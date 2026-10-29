"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const partners = [
  { name: "Kanzler", image: "kanzler", width: 500, height: 500 },
  {
    name: "Mie Gacoan",
    image: "mie-gacoan",
    width: 600,
    height: 600,
  },
  {
    name: "Waroeng SS",
    image: "waroeng-ss",
    width: 554,
    height: 554,
  },
  {
    name: "Dkriuk Fried Chicken",
    image: "dkriuk",
    width: 600,
    height: 600,
  },
  {
    name: "Steak Moen-Moen",
    image: "steak-moen-moen",
    width: 600,
    height: 209,
  },
  {
    name: "Bale Bebakaran",
    image: "bale-bebakaran",
    width: 554,
    height: 554,
  },
];

export default function PartnersCarousel() {
  const section = useRef<HTMLElement>(null);
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
      style={{ backgroundColor: "#ffffff" }}
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
              animationPlayState: !visible ? "paused" : undefined,
            }}
          >
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="partner-marquee-group"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {[...partners, ...partners].map((partner, index) => (
                  <li
                    key={`${partner.image}-${index}`}
                    className="partner-logo-item"
                    aria-hidden={index >= partners.length ? true : undefined}
                  >
                    <div className="partner-logo-frame">
                      <Image
                        src={`/images/partners/${partner.image}.webp`}
                        alt={
                          copy === 0 && index < partners.length
                            ? partner.name
                            : ""
                        }
                        width={partner.width}
                        height={partner.height}
                        sizes="(max-width: 760px) 136px, 232px"
                        draggable={false}
                      />
                    </div>
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
