"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MotionPage({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const context = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".page-enter", {
          y: 35,
          opacity: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
        gsap.utils.toArray<HTMLElement>(".page-reveal").forEach((el) =>
          gsap.from(el, {
            y: 38,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
            clearProps: "transform,opacity",
          }),
        );
        gsap.utils.toArray<HTMLElement>(".page-parallax").forEach((el) =>
          gsap.fromTo(
            el,
            { yPercent: -5, scale: 1.12 },
            {
              yPercent: 5,
              scale: 1.12,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          ),
        );
        gsap.utils.toArray<SVGPathElement>(".motion-route").forEach((el) => {
          const length = el.getTotalLength();
          gsap.fromTo(
            el,
            { strokeDasharray: length, strokeDashoffset: length },
            {
              strokeDashoffset: 0,
              duration: 2.5,
              ease: "power2.inOut",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        });
        gsap.to(".page-progress", {
          scaleX: 1,
          transformOrigin: "left",
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
        });
      });
    }, root);
    let active = true;
    document.fonts.ready.then(() => {
      if (active) ScrollTrigger.refresh();
    });
    const resize = new ResizeObserver(() => ScrollTrigger.refresh());
    if (root.current) resize.observe(root.current);
    return () => {
      active = false;
      resize.disconnect();
      mm.revert();
      context.revert();
    };
  }, [pathname]);
  return (
    <div ref={root} className={`inner-page ${className}`}>
      {children}
      <div className="scroll-progress page-progress" aria-hidden="true" />
    </div>
  );
}
