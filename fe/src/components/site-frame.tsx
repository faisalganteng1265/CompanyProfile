"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Arrow } from "./icons";
import SiteFooter from "./site-footer";
import SiteScroll from "./site-scroll";
import PageCurtain from "./page-curtain";
import { company, whatsapp } from "@/lib/company";
import "./site-navbar.css";

const navigation = [
  ["Tentang kami", "/tentang"],
  ["Pilihan produk", "/produk"],
  ["Distribusi", "/distribusi"],
];

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  useLayoutEffect(() => {
    const html = document.documentElement;
    if (pathname === "/") html.dataset.landingScrollbar = "true";
    else delete html.dataset.landingScrollbar;
    return () => {
      delete html.dataset.landingScrollbar;
    };
  }, [pathname]);
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const [menuPresent, setMenuPresent] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const menuOpen = menuPath === pathname;
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  const menuTimeline = useRef<gsap.core.Timeline | null>(null);
  useLayoutEffect(() => {
    const element = menu.current;
    if (!element) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const links = element.querySelectorAll("a");
    const signature = element.querySelector("p");
    const context = gsap.context(() => {
      gsap.set(element, { yPercent: -100 });
      gsap.set(links, { y: 28, opacity: 0 });
      if (signature) gsap.set(signature, { y: 12, opacity: 0 });
      const timeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          if (!element.inert)
            element
              .querySelector<HTMLAnchorElement>("a")
              ?.focus({ preventScroll: true });
        },
        onReverseComplete: () => setMenuPresent(false),
      });
      timeline
        .to(element, {
          yPercent: 0,
          duration: reduced ? 0.01 : 0.65,
          ease: "power3.inOut",
        })
        .to(
          links,
          {
            y: 0,
            opacity: 1,
            duration: reduced ? 0.01 : 0.5,
            stagger: reduced ? 0 : 0.065,
            ease: "power3.out",
          },
          reduced ? 0 : 0.2,
        );
      if (signature)
        timeline.to(
          signature,
          {
            y: 0,
            opacity: 1,
            duration: reduced ? 0.01 : 0.4,
          },
          reduced ? 0 : 0.45,
        );
      menuTimeline.current = timeline;
    }, element);
    return () => {
      menuTimeline.current = null;
      context.revert();
    };
  }, []);
  useLayoutEffect(() => {
    const timeline = menuTimeline.current;
    if (!timeline) return;
    if (menuOpen) timeline.timeScale(1).play();
    else {
      if (menu.current?.contains(document.activeElement))
        toggle.current?.focus({ preventScroll: true });
      if (timeline.progress() === 0) setMenuPresent(false);
      else timeline.timeScale(1.25).reverse();
    }
  }, [menuOpen]);
  useEffect(() => {
    if (!menuPresent) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const keydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuPath(null);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const links = menu.current?.querySelectorAll<HTMLAnchorElement>("a");
        if (!links?.length) return;
        if (e.shiftKey && document.activeElement === toggle.current) {
          e.preventDefault();
          links[links.length - 1].focus();
        } else if (
          !e.shiftKey &&
          document.activeElement === links[links.length - 1]
        ) {
          e.preventDefault();
          toggle.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", keydown);
    };
  }, [menuPresent]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 761px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuPath(null);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");
  return (
    <>
      <SiteScroll />
      <PageCurtain
        pathname={pathname}
        busy={transitioning}
        onBusyChange={setTransitioning}
      />
      <a className="skip-link" href="#main">
        Langsung ke konten
      </a>
      <header className="site-header tatsuo-navbar" inert={transitioning}>
        <span
          className="tatsuo-navbar-panel tatsuo-navbar-panel-left"
          aria-hidden="true"
        />
        <span
          className="tatsuo-navbar-panel tatsuo-navbar-panel-right"
          aria-hidden="true"
        />
        <div className="tatsuo-mobile-actions">
          <a
            className="tatsuo-mobile-contact"
            href={whatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubungi Tatsuo melalui WhatsApp"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.47 0 .1 5.36.1 11.95c0 2.1.55 4.16 1.6 5.97L0 24l6.24-1.64a11.96 11.96 0 0 0 5.82 1.49h.01c6.59 0 11.95-5.36 11.95-11.95a11.87 11.87 0 0 0-3.5-8.42Zm-8.46 18.35a9.9 9.9 0 0 1-5.04-1.38l-.36-.22-3.7.97.99-3.61-.24-.37a9.89 9.89 0 0 1-1.51-5.27c0-5.48 4.46-9.94 9.95-9.94a9.88 9.88 0 0 1 7.04 2.92 9.88 9.88 0 0 1 2.91 7.03c0 5.48-4.46 9.94-9.94 9.94Zm5.46-7.44c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.49-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.71.63.72.23 1.37.2 1.88.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
            </svg>
          </a>
          <a
            className="tatsuo-mobile-contact tatsuo-mobile-email"
            href={`mailto:${company.email}`}
            aria-label="Kirim email ke Tatsuo Beef"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m4 6 8 6 8-6" />
            </svg>
          </a>
        </div>
        <nav
          className="tatsuo-navbar-links tatsuo-navbar-left"
          aria-label="Navigasi utama kiri"
        >
          {navigation.slice(0, 2).map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          className="tatsuo-navbar-brand"
          href="/"
          aria-label="Tatsuo Beef — Beranda"
          onClick={() => setMenuPath(null)}
        >
          <Image
            src="/images/logo-navbar.svg"
            width={300}
            height={300}
            sizes="(max-width: 760px) 76px, 94px"
            alt="Tatsuo Beef"
            priority
          />
        </Link>
        <nav
          className="tatsuo-navbar-links tatsuo-navbar-right"
          aria-label="Navigasi utama kanan"
        >
          <Link
            href="/distribusi"
            aria-current={isActive("/distribusi") ? "page" : undefined}
          >
            Distribusi
          </Link>
          <Link
            href="/kontak"
            aria-current={isActive("/kontak") ? "page" : undefined}
          >
            Hubungi kami <Arrow diagonal />
          </Link>
        </nav>
        <button
          ref={toggle}
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => {
            if (menuOpen) setMenuPath(null);
            else {
              setMenuPresent(true);
              setMenuPath(pathname);
            }
          }}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
        </button>
        <nav
          ref={menu}
          id="mobile-menu"
          className="mobile-menu"
          aria-label="Navigasi mobile"
          hidden={!menuPresent}
          inert={!menuOpen}
        >
          {[["Beranda", "/"], ...navigation, ["Hubungi kami", "/kontak"]].map(
            ([label, href], i) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuPath(null)}
                aria-current={pathname === href ? "page" : undefined}
              >
                <small>0{i + 1}</small>
                {label}
                <Arrow diagonal />
              </Link>
            ),
          )}
          <p>GOOD MEAT. GREAT PARTNERSHIP.</p>
        </nav>
      </header>
      <div
        inert={menuPresent || transitioning}
        className={`site-content ${pathname === "/" ? "is-landing" : ""}`}
      >
        {children}
        <SiteFooter />
      </div>
    </>
  );
}
