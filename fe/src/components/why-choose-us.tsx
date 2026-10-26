"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Asterisk, Contours } from "./icons";

const standards = [
  { label: "Kualitas mutu tinggi", value: 99 },
  { label: "Kepuasan klien", value: 98 },
  { label: "Pelayanan terbaik", value: 97 },
  { label: "Delivery on time", value: 95 },
  { label: "Harga bersaing", value: 95 },
  { label: "Komitmen & integritas", value: 95 },
];

export default function WhyChooseUs() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".why-heading", {
          y: 35,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 85%",
            once: true,
          },
        });
        gsap.from(".why-meter-fill", {
          scaleX: 0,
          transformOrigin: "left",
          stagger: 0.12,
          duration: 1.6,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".why-metrics",
            start: "top 85%",
            once: true,
          },
        });
        gsap.utils
          .toArray<HTMLElement>(".why-count")
          .forEach((element, index) => {
            const value = Number(element.dataset.value);
            const counter = { value: 0 };
            gsap.to(counter, {
              value,
              duration: 1.6,
              delay: index * 0.12,
              ease: "power2.out",
              onUpdate: () => {
                element.textContent = String(Math.round(counter.value));
              },
              scrollTrigger: {
                trigger: ".why-metrics",
                start: "top 85%",
                once: true,
              },
            });
          });
        gsap.to(".why-background", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
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
      className="why-choose-section"
      aria-labelledby="why-choose-heading"
    >
      <div className="why-background">
        <Image src="/images/hero.webp" alt="" fill sizes="100vw" />
      </div>
      <div className="why-shade" aria-hidden="true" />
      <Contours />
      <div className="container why-content">
        <div className="why-kicker">
          <span className="eyebrow">TATSUO BEEF EXPERIENCE</span>
          <Asterisk />
        </div>
        <div className="why-heading">
          <h2 id="why-choose-heading">
            Why choose us.
            <br />
            <em>Good reasons. Great partnership.</em>
          </h2>
          <p>
            Mutu, pelayanan, dan komitmen.
            <br />
            Hal-hal yang kami jaga dalam setiap kemitraan.
          </p>
        </div>
        <dl className="why-metrics">
          {standards.map((standard, index) => (
            <div className="why-metric" key={standard.label}>
              <dt>
                <span className="why-metric-index">0{index + 1}</span>
                {standard.label}
              </dt>
              <dd>
                <span
                  className="why-count"
                  data-value={standard.value}
                  aria-hidden="true"
                >
                  {standard.value}
                </span>
                <span aria-hidden="true">%</span>
                <span className="sr-only">{standard.value} persen</span>
              </dd>
              <div className="why-meter-track" aria-hidden="true">
                <span
                  className="why-meter-fill"
                  style={{ width: `${standard.value}%` }}
                />
              </div>
            </div>
          ))}
        </dl>
        <div className="why-foot">
          <span>THE STANDARD WE STAND FOR.</span>
          <span>SELECTED WITH CARE. DELIVERED WITH PRIDE.</span>
        </div>
      </div>
    </section>
  );
}
