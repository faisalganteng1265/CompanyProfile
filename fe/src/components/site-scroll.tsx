"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** One site-wide scroll controller using GSAP's existing ticker. */
export default function SiteScroll() {
  const pathname = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = window.matchMedia(
      "(min-width: 761px) and (prefers-reduced-motion: no-preference)",
    );
    let dispose: (() => void) | undefined;
    const configure = () => {
      dispose?.();
      dispose = undefined;
      if (!media.matches) return;
      const headerHeight =
        document.querySelector(".site-header")?.getBoundingClientRect()
          .height || 96;
      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
        anchors: { offset: -headerHeight, duration: 1.1 },
        prevent: (node) =>
          Boolean(node.closest("dialog, [data-lenis-prevent], .mobile-menu")),
      });
      const unsubscribe = lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      const syncLock = () => {
        const locked =
          document.body.style.overflow === "hidden" ||
          document.documentElement.dataset.pageTransition === "active" ||
          Boolean(document.querySelector("dialog[open]"));
        if (locked) lenis.stop();
        else lenis.start();
      };
      const observer = new MutationObserver(syncLock);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-page-transition"],
      });
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["style"],
      });
      document.querySelectorAll("dialog").forEach((dialog) =>
        observer.observe(dialog, {
          attributes: true,
          attributeFilter: ["open"],
        }),
      );
      syncLock();
      dispose = () => {
        observer.disconnect();
        unsubscribe();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    };
    configure();
    media.addEventListener("change", configure);
    return () => {
      media.removeEventListener("change", configure);
      dispose?.();
    };
  }, [pathname]);
  return null;
}
