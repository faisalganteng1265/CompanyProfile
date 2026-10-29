"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./why-choose-us.css";

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
        gsap.from(".why-story-copy", {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root.current,
            start: "top 85%",
            once: true,
          },
          clearProps: "transform,opacity",
        });
        const stats = gsap.utils.toArray<HTMLElement>(".why-story-stat");
        const restoreStats: (() => void)[] = [];
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current?.querySelector(".why-story-stats"),
            start: "top 88%",
            end: "bottom top",
            toggleActions: "restart reset restart reset",
          },
        });

        stats.forEach((stat, index) => {
          const number = stat.querySelector<HTMLElement>(".why-story-count");
          const ring = stat.querySelector<SVGCircleElement>(".why-ring-fill");
          if (!number || !ring) return;
          const target = Number(number.dataset.value);
          const counter = { value: 0 };
          number.textContent = "0";
          let displayed = "0";
          ring.style.strokeDashoffset = "100";

          // One animated value drives both the number and its circular progress.
          timeline.to(
            counter,
            {
              value: target,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: () => {
                const next = String(Math.round(counter.value));
                if (displayed !== next) {
                  number.textContent = next;
                  displayed = next;
                }
                ring.style.strokeDashoffset = String(100 - counter.value);
              },
              onComplete: () => {
                number.textContent = String(target);
                ring.style.strokeDashoffset = String(100 - target);
              },
            },
            index * 0.08,
          );

          restoreStats.push(() => {
            number.textContent = String(target);
            ring.style.strokeDashoffset = String(100 - target);
          });
        });
        if (window.matchMedia("(max-width: 760px)").matches) {
          const entrance = gsap.timeline({
            scrollTrigger: {
              trigger: ".why-story-photo",
              start: "top 90%",
              end: "bottom top",
              toggleActions: "restart reset restart reset",
            },
          });
          entrance
            .fromTo(
              ".why-story-photo",
              { y: 25, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
              0,
            )
            .fromTo(
              ".why-story-tag",
              { rotation: -9, y: -12 },
              { rotation: 0, y: 0, duration: 0.9, ease: "power2.out" },
              0.15,
            );
        }
        if (!window.matchMedia("(max-width: 760px)").matches) {
          gsap.fromTo(
            ".why-story-photo img",
            { yPercent: -3, scale: 1.07 },
            {
              yPercent: 3,
              scale: 1.07,
              ease: "none",
              scrollTrigger: {
                trigger: root.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        }
        return () => restoreStats.forEach((restore) => restore());
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
      className="why-story-section"
      aria-labelledby="why-choose-heading"
    >
      <div className="container why-story-layout">
        <div className="why-story-visual">
          <svg
            className="why-story-sketch"
            viewBox="0 0 400 520"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {Array.from({ length: 43 }, (_, index) => {
              const angle = Math.PI - (index / 42) * Math.PI;
              const startX = 200 + 199 * Math.cos(angle);
              const startY = 198 - 197 * Math.sin(angle);
              const length = 26 + (index % 5) * 4;
              const lean = [0, 5, -3, 0, 8, -5, 2][index % 7];
              const endX = startX + lean;
              const endY = startY - length;
              const bend = [0, 1.5, -1, 0, 2][index % 5];
              return (
                <path
                  key={index}
                  d={`M${startX.toFixed(2)} ${startY.toFixed(2)}q${((endX - startX) / 2 + bend).toFixed(2)} ${((endY - startY) / 2).toFixed(2)} ${(endX - startX).toFixed(2)} ${(endY - startY).toFixed(2)}`}
                />
              );
            })}
            <path d="M-2 220q-2-18-1-37M-3 244q2-16 1-31M402 220q3-19 5-40M403 245q-1-16-1-33" />
          </svg>
          <div
            className="why-story-photo"
            style={{
              position: "relative",
              aspectRatio: "var(--why-photo-ratio, 0.77)",
            }}
          >
            <Image
              src="/images/story-selection-v2.webp"
              alt="Pemilihan ribeye bermarbling dengan perhatian pada kualitas"
              width={1122}
              height={1402}
              sizes="(max-width: 760px) 90vw, 42vw"
            />
          </div>
          <div className="why-story-tag-anchor">
            <div className="why-story-tag">
              <span className="why-story-tag-hole" aria-hidden="true" />
              <Image
                className="why-story-butcher-icon"
                src="/images/butcher-cleavers-v1.png"
                alt=""
                width={1280}
                height={1280}
                sizes="80px"
              />
              <strong>
                10<span>+</span>
              </strong>
              <span className="why-story-tag-caption">
                Years Experience
                <br />
                Butcher
              </span>
            </div>
          </div>
        </div>
        <div className="why-story-copy">
          <span className="why-story-eyebrow">
            <span aria-hidden="true" /> Why choose us
          </span>
          <h2 id="why-choose-heading">
            Kualitas yang terasa.
            <br />
            <em>Kemitraan yang terjaga.</em>
          </h2>
          <p>
            Bahan pilihan, pelayanan yang responsif, dan komitmen dalam setiap
            kerja sama. Inilah yang kami bawa ke dapur Anda.
          </p>
          <dl className="why-story-stats">
            {standards.map((standard) => (
              <div className="why-story-stat" key={standard.label}>
                <dt>{standard.label}</dt>
                <dd>
                  <svg
                    className="why-stat-ring"
                    viewBox="0 0 100 100"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="50" cy="50" r="44" className="why-ring-track" />
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      pathLength="100"
                      strokeDasharray="100"
                      className="why-ring-fill"
                      style={{ strokeDashoffset: 100 - standard.value }}
                    />
                  </svg>
                  <span className="why-ring-value" aria-hidden="true">
                    <span
                      className="why-story-count"
                      data-value={standard.value}
                    >
                      {standard.value}
                    </span>
                    <span>%</span>
                  </span>
                  <span className="sr-only">{standard.value} persen</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
