"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./icons";
import SiteFooter from "./site-footer";
import LandingScroll from "./landing-scroll";
import "./site-navbar.css";

const navigation = [
  ["Tentang kami", "/tentang"],
  ["Pilihan produk", "/produk"],
  ["Distribusi", "/distribusi"],
];

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
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
  }, [menuOpen]);
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
          onClick={() => setMenuPath(menuOpen ? null : pathname)}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
        </button>
        {menuOpen && (
          <nav
            ref={menu}
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Navigasi mobile"
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
        )}
      </header>
      <div inert={menuOpen} className="site-content">
        {children}
        <SiteFooter />
      </div>
    </>
  );
}
