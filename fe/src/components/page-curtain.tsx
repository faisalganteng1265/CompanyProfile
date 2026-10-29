"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "./page-curtain.css";

type Props = {
  pathname: string;
  busy: boolean;
  onBusyChange: (busy: boolean) => void;
};

export default function PageCurtain({ pathname, busy, onBusyChange }: Props) {
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);
  const routeArrived = useRef<(() => void) | null>(null);

  useEffect(() => {
    const element = root.current;
    const left = element?.querySelector<HTMLElement>(".page-curtain-left");
    const right = element?.querySelector<HTMLElement>(".page-curtain-right");
    const brand = element?.querySelector<HTMLElement>(".page-curtain-brand");
    if (!element || !left || !right || !brand) return;
    gsap.set(left, { x: 0, xPercent: -101 });
    gsap.set(right, { x: 0, xPercent: 101 });
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let phase: "idle" | "closing" | "waiting" | "opening" = "idle";
    let live = true;
    let timeline: gsap.core.Timeline | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let frame = 0;
    let lastPath = window.location.pathname;
    const html = document.documentElement;

    const unlock = () => {
      phase = "idle";
      element.dataset.active = "false";
      delete html.dataset.pageTransition;
      onBusyChange(false);
      document.removeEventListener("wheel", blockScroll, true);
      document.removeEventListener("touchmove", blockScroll, true);
      if (timeout) clearTimeout(timeout);
    };
    const reveal = () => {
      if (!live || phase === "idle" || phase === "opening") return;
      phase = "opening";
      timeline?.kill();
      timeline = gsap.timeline({
        onComplete: () => {
          if (!live) return;
          unlock();
          frame = requestAnimationFrame(() => {
            const main = document.getElementById("main");
            if (!main || main.inert) return;
            const previous = main.getAttribute("tabindex");
            main.setAttribute("tabindex", "-1");
            main.focus({ preventScroll: true });
            if (previous === null) main.removeAttribute("tabindex");
            else main.setAttribute("tabindex", previous);
          });
        },
      });
      timeline
        .to(brand, {
          opacity: 0,
          y: -8,
          duration: motion.matches ? 0.01 : 0.16,
        })
        .to(
          left,
          {
            xPercent: -101,
            duration: motion.matches ? 0.01 : 0.6,
            ease: "power3.inOut",
          },
          0.05,
        )
        .to(
          right,
          {
            xPercent: 101,
            duration: motion.matches ? 0.01 : 0.6,
            ease: "power3.inOut",
          },
          0.05,
        );
    };
    const cover = () => {
      element.dataset.active = "true";
      html.dataset.pageTransition = "active";
      onBusyChange(true);
      document.addEventListener("wheel", blockScroll, {
        passive: false,
        capture: true,
      });
      document.addEventListener("touchmove", blockScroll, {
        passive: false,
        capture: true,
      });
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(reveal, 6500);
    };
    routeArrived.current = () => {
      lastPath = window.location.pathname;
      if (phase !== "waiting") return;
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(reveal);
      });
    };

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (
        !anchor ||
        anchor.hasAttribute("download") ||
        (anchor.target && anchor.target !== "_self") ||
        anchor.hasAttribute("data-no-curtain")
      )
        return;
      const target = new URL(anchor.href, window.location.href);
      if (
        target.origin !== window.location.origin ||
        !/^https?:$/.test(target.protocol) ||
        target.pathname === window.location.pathname
      )
        return;
      // Cancel Next Link's immediate navigation while preserving its onClick handler.
      event.preventDefault();
      if (phase !== "idle") return;
      if (motion.matches) {
        router.push(target.pathname + target.search + target.hash);
        return;
      }
      phase = "closing";
      cover();
      const href = target.pathname + target.search + target.hash;
      router.prefetch(href);
      timeline?.kill();
      gsap.set(brand, { opacity: 0, y: 8 });
      timeline = gsap.timeline({
        onComplete: () => {
          if (!live || phase !== "closing") return;
          phase = "waiting";
          try {
            router.push(href);
          } catch {
            reveal();
          }
        },
      });
      timeline
        .to([left, right], {
          xPercent: 0,
          duration: 0.45,
          ease: "power3.inOut",
        })
        .to(
          brand,
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
          0.3,
        );
    };
    const onHistory = () => {
      if (window.location.pathname === lastPath || motion.matches) return;
      timeline?.kill();
      cancelAnimationFrame(frame);
      phase = "waiting";
      cover();
      gsap.set([left, right], { xPercent: 0 });
      gsap.set(brand, { opacity: 1, y: 0 });
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(reveal);
      });
    };
    const blockScroll = (event: Event) => {
      if (phase !== "idle" && event.cancelable) event.preventDefault();
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onHistory);
    return () => {
      live = false;
      routeArrived.current = null;
      timeline?.kill();
      cancelAnimationFrame(frame);
      if (timeout) clearTimeout(timeout);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("wheel", blockScroll, true);
      document.removeEventListener("touchmove", blockScroll, true);
      window.removeEventListener("popstate", onHistory);
      element.dataset.active = "false";
      delete html.dataset.pageTransition;
    };
  }, [router, onBusyChange]);

  useLayoutEffect(() => {
    routeArrived.current?.();
  }, [pathname]);

  return (
    <>
      <div ref={root} className="page-curtain" aria-hidden="true">
        <div className="page-curtain-panel page-curtain-left" />
        <div className="page-curtain-panel page-curtain-right" />
        <div className="page-curtain-brand">
          <Image src="/images/logo-navbar.svg" alt="" width={90} height={90} />
          <span>GOOD MEAT. GREAT PARTNERSHIP.</span>
        </div>
      </div>
      <span className="sr-only" role="status" aria-live="polite">
        {busy ? "Membuka halaman…" : ""}
      </span>
    </>
  );
}
