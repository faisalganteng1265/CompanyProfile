"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./landing-intro.css";

export default function LandingIntro({ onReveal }: { onReveal: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Cached routes can resume effects after the completed intro rendered null.
    const element = root.current;
    if (!visible || !element) return;
    let active = true;
    let exiting = false;
    let exitTimeline: gsap.core.Timeline | undefined;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const main = document.getElementById("main");
    const previousInert = main?.inert ?? false;
    if (main) main.inert = true;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const startedAt = performance.now();
    const progress = { value: 0 };
    const count = element.querySelector(".landing-intro-count");
    const line = element.querySelector(".landing-intro-progress");
    const context = gsap.context(() => {
      if (!reduced) {
        gsap.from(".landing-intro-logo", { opacity: 0, y: 12, duration: 0.7 });
        gsap.from(".landing-intro-line > span", {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
          delay: 0.15,
        });
        gsap.from(".landing-intro-cut", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 2.5,
          ease: "power2.inOut",
          delay: 0.35,
        });
        gsap.from(".landing-intro-detail", {
          opacity: 0,
          duration: 0.8,
          delay: 0.5,
        });
      }
    }, element);
    const pause = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });
    const update = () => {
      if (!active) return;
      if (count)
        count.textContent = String(Math.round(progress.value)).padStart(3, "0");
      if (line) gsap.set(line, { scaleX: progress.value / 100 });
    };
    const exit = () => {
      if (!active || exiting || !element.isConnected) return;
      exiting = true;
      gsap.killTweensOf(progress);
      const timeline = gsap.timeline({
        onComplete: () => {
          if (!active) return;
          document.body.style.overflow = previousOverflow;
          setVisible(false);
        },
      });
      exitTimeline = timeline;
      context.add(() => {
        timeline
          .to(progress, {
            value: 100,
            duration: reduced ? 0 : 0.35,
            onUpdate: update,
          })
          .to(
            ".landing-intro-content, .landing-intro-footer, .landing-intro-header",
            {
              opacity: 0,
              duration: reduced ? 0.15 : 0.35,
            },
          )
          .call(() => {
            if (main) main.inert = previousInert;
            onReveal();
          })
          .to(
            ".landing-intro-panel-top",
            {
              yPercent: -105,
              duration: reduced ? 0 : 1.1,
              ease: "power3.inOut",
            },
            "open",
          )
          .to(
            ".landing-intro-panel-bottom",
            {
              yPercent: 105,
              duration: reduced ? 0 : 1.1,
              ease: "power3.inOut",
            },
            "open",
          )
          .to(".landing-intro-cut", { opacity: 0, duration: 0.15 }, "open");
      });
    };
    const hero = document.querySelector<HTMLImageElement>(
      ".v2-original-hero .hero-image",
    );
    const logo = element.querySelector<HTMLImageElement>(".landing-intro-logo");
    const tasks = [document.fonts.ready, hero?.decode(), logo?.decode()];
    let completed = 0;
    const assets = Promise.allSettled(
      tasks.map((task) =>
        Promise.resolve(task).finally(() => {
          completed += 1;
          if (!active || exiting) return;
          gsap.to(progress, {
            value: (completed / tasks.length) * 94,
            duration: reduced
              ? 0
              : Math.max(0.35, (2800 - (performance.now() - startedAt)) / 1000),
            overwrite: true,
            ease: "power1.inOut",
            onUpdate: update,
          });
        }),
      ),
    );
    void Promise.all([
      Promise.race([assets, pause(reduced ? 1200 : 4500)]),
      pause(reduced ? 0 : 3000),
    ]).then(exit);
    return () => {
      active = false;
      timers.forEach(clearTimeout);
      exitTimeline?.kill();
      gsap.killTweensOf(progress);
      context.revert();
      document.body.style.overflow = previousOverflow;
      if (main) main.inert = previousInert;
    };
  }, [onReveal, visible]);

  if (!visible) return null;
  return (
    <div
      ref={root}
      className="landing-intro"
      aria-label="Menyiapkan Tatsuo Beef"
    >
      <div className="landing-intro-panel landing-intro-panel-top" />
      <div className="landing-intro-panel landing-intro-panel-bottom" />
      <div
        className="landing-intro-header landing-intro-detail"
        aria-hidden="true"
      >
        <span>SOLO, INDONESIA</span>
        <span>EST. 2023</span>
      </div>
      <div className="landing-intro-cut" aria-hidden="true" />
      <div className="landing-intro-content">
        <Image
          className="landing-intro-logo"
          src="/images/logo-original.jpg"
          alt="Tatsuo Beef"
          width={1600}
          height={703}
          sizes="(max-width: 600px) 140px, 180px"
          priority
        />
        <p className="landing-intro-title" aria-hidden="true">
          <span className="landing-intro-line">
            <span>Selected</span>
          </span>
          <span className="landing-intro-line">
            <span>with care.</span>
          </span>
        </p>
        <span className="landing-intro-signature landing-intro-detail">
          GOOD MEAT. GREAT PARTNERSHIP.
        </span>
      </div>
      <div className="landing-intro-footer landing-intro-detail">
        <div className="landing-intro-loading">
          <span role="status">Menyiapkan pilihan terbaik.</span>
          <span aria-hidden="true">
            <span className="landing-intro-count">000</span>
            <small> / 100</small>
          </span>
        </div>
        <div className="landing-intro-track" aria-hidden="true">
          <span className="landing-intro-progress" />
        </div>
      </div>
    </div>
  );
}
