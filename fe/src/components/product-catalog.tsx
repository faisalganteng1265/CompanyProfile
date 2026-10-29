"use client";

import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories, products } from "@/lib/products";
import { whatsapp } from "@/lib/company";
import { Arrow } from "./icons";

export default function ProductCatalog() {
  const [category, setCategory] = useState("Semua produk");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const root = useRef<HTMLElement>(null);
  const normalized = deferredQuery.trim().toLocaleLowerCase("id");
  const matches = products.filter(
    (product) =>
      (category === "Semua produk" || product.category === category) &&
      `${product.name} ${product.category} ${product.kind} ${product.use.join(" ")}`
        .toLocaleLowerCase("id")
        .includes(normalized),
  );
  const title = normalized
    ? "Hasil pencarian."
    : category === "Semua produk"
      ? "Temukan pilihan Anda."
      : `${category}.`;
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".selection-card").forEach((card) => {
          gsap.fromTo(
            card,
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 96%",
                end: "bottom top",
                toggleActions: "restart reset restart reset",
              },
            },
          );
        });
      });
    }, element);
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(frame);
      media.revert();
      context.revert();
    };
  }, [category, deferredQuery]);

  const clear = () => {
    setCategory("Semua produk");
    setQuery("");
  };
  return (
    <section
      ref={root}
      id="koleksi"
      className="selection-collection"
      aria-labelledby="collection-heading"
    >
      <div className="selection-toolbar">
        <div className="container selection-toolbar-inner">
          <div
            className="selection-tabs"
            role="group"
            aria-label="Filter kategori produk"
          >
            {["Semua produk", ...categories].map((label) => {
              const count =
                label === "Semua produk"
                  ? products.length
                  : products.filter((product) => product.category === label)
                      .length;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={category === label}
                  onClick={() => setCategory(label)}
                >
                  {label}
                  <span>{count}</span>
                </button>
              );
            })}
          </div>
          <div className="selection-search" role="search">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 5 5" />
            </svg>
            <input
              id="selection-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari produk atau menu…"
              aria-label="Cari produk berdasarkan nama atau menu"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Hapus pencarian"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="container selection-results">
        <div className="selection-results-heading">
          <h2 id="collection-heading">{title}</h2>
          <span role="status" aria-live="polite">
            {matches.length} produk{" "}
            {normalized ? `untuk “${deferredQuery.trim()}”` : "pilihan"}
          </span>
        </div>
        {matches.length ? (
          <div className="selection-grid" aria-busy={query !== deferredQuery}>
            {matches.map((product, index) => (
              <article
                className={`selection-card ${index === 0 && !normalized ? "selection-card-featured" : ""}`}
                key={product.slug}
              >
                <Link
                  href={`/produk/${product.slug}`}
                  className="selection-card-link"
                >
                  <div className="selection-card-photo">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={1000}
                      height={1000}
                      sizes={
                        index === 0 && !normalized
                          ? "(max-width: 600px) 100vw, (max-width: 1000px) 90vw, 62vw"
                          : "(max-width: 600px) 100vw, (max-width: 1000px) 44vw, 30vw"
                      }
                    />
                    <span className="selection-card-category">
                      {product.category}
                    </span>
                    <span className="selection-card-arrow">
                      <Arrow diagonal />
                    </span>
                  </div>
                  <div className="selection-card-copy">
                    <h3>{product.name}</h3>
                    <p>{product.use.slice(0, 3).join(" · ")}</p>
                    <span className="selection-card-detail">
                      Kenali produknya <Arrow />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="selection-empty">
            <h3>
              Belum bertemu
              <br />
              <em>pilihan Anda?</em>
            </h3>
            <p>
              Coba kata kunci lain, atau tanyakan kebutuhan khusus dapur Anda
              kepada tim kami.
            </p>
            <div>
              <button
                type="button"
                className="selection-button"
                onClick={clear}
              >
                Tampilkan semua produk <Arrow />
              </button>
              <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
                Tanya tim Tatsuo <Arrow diagonal />
              </a>
            </div>
          </div>
        )}
        <div className="selection-notes">
          <p>
            Foto merupakan ilustrasi produk. Spesifikasi, harga, dan
            ketersediaan dikonfirmasi bersama tim Tatsuo.
          </p>
          <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
            Butuh bantuan memilih? <Arrow diagonal />
          </a>
        </div>
      </div>
    </section>
  );
}
