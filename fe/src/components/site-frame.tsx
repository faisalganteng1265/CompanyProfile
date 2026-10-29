"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Arrow } from "./icons";
import SiteFooter from "./site-footer";
import LandingScroll from "./landing-scroll";
import { whatsapp } from "@/lib/company";
import "./site-navbar.css";

const navigation = [
  ["Tentang kami", "/tentang"],
  ["Pilihan produk", "/produk"],
  ["Distribusi", "/distribusi"],
];

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const [menuPresent, setMenuPresent] = useState(false);
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
      gsap.set(element, { clipPath: "inset(0 0 100% 0)" });
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
          clipPath: "inset(0 0 0% 0)",
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
      <LandingScroll />
      <a className="skip-link" href="#main">
        Langsung ke konten
      </a>
      <header className="site-header tatsuo-navbar">
        <span
          className="tatsuo-navbar-panel tatsuo-navbar-panel-left"
          aria-hidden="true"
        />
        <span
          className="tatsuo-navbar-panel tatsuo-navbar-panel-right"
          aria-hidden="true"
        />
        <a
          className="tatsuo-mobile-contact"
          href={whatsapp()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hubungi Tatsuo melalui WhatsApp"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.5 11.6a8.5 8.5 0 0 1-12.4 7.6L3 20.5l1.3-5.1a8.5 8.5 0 1 1 16.2-3.8Z" />
            <path d="m9 7 1.4 2.5-1.2 1.2a8 8 0 0 0 3.1 3.1l1.2-1.2L16 14" />
          </svg>
        </a>
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
        inert={menuPresent}
        className={`site-content ${pathname === "/" ? "is-landing" : ""}`}
      >
        {children}
        <SiteFooter />
      </div>
    </>
  );
}
