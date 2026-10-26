"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { categories, featuredProducts, products } from "@/lib/products";
import { Arrow, Contours } from "./icons";

export default function ProductCatalog() {
  const [category, setCategory] = useState("Semua pilihan");
  const [query, setQuery] = useState("");
  const matches = products.filter(
    (p) =>
      (category === "Semua pilihan" || p.category === category) &&
      `${p.name} ${p.category} ${p.kind} ${p.use.join(" ")}`
        .toLocaleLowerCase("id")
        .includes(query.trim().toLocaleLowerCase("id")),
  );
  const featured = featuredProducts.filter((p) =>
    matches.some((m) => m.slug === p.slug),
  );
  return (
    <div className="full-catalog" id="koleksi">
      <div className="catalog-control-panel">
        <div className="filters" role="group" aria-label="Kategori katalog">
          {["Semua pilihan", ...categories].map((label) => (
            <button
              key={label}
              aria-pressed={category === label}
              className={category === label ? "active" : ""}
              onClick={() => setCategory(label)}
            >
              {label}
              <span>
                {String(
                  label === "Semua pilihan"
                    ? products.length
                    : products.filter((p) => p.category === label).length,
                ).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
        <label className="catalog-search">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="10.5"
              cy="10.5"
              r="6.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari potongan atau menu..."
            aria-label="Cari produk"
          />
          {query && (
            <button aria-label="Hapus pencarian" onClick={() => setQuery("")}>
              ×
            </button>
          )}
        </label>
      </div>
      <div className="catalog-result-line">
        <span aria-live="polite">{matches.length} pilihan ditemukan</span>
        <span>FIND YOUR NEXT SIGNATURE DISH</span>
      </div>
      {!!featured.length && (
        <div className="featured-catalog-grid">
          {featured.map((p, i) => (
            <Link
              className="catalog-feature-card"
              key={p.slug}
              href={`/produk/${p.slug}`}
            >
              <div className="catalog-feature-image">
                <Image
                  src={p.image!}
                  alt={p.name}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1000px) 48vw, 31vw"
                />
                <span className="product-category">{p.category}</span>
                <span className="product-index">SELECTED / 0{i + 1}</span>
                <span className="feature-image-action">
                  Kenali potongannya <Arrow diagonal />
                </span>
              </div>
              <div>
                <span className="eyebrow">{p.kind}</span>
                <h2>{p.name}</h2>
                <Arrow diagonal />
              </div>
            </Link>
          ))}
          {category === "Semua pilihan" && !query.trim() && (
            <Link href="/kontak" className="catalog-concierge">
              <Contours />
              <span className="eyebrow">YOUR NEXT SIGNATURE</span>
              <h2>
                Potongan yang tepat
                <br />
                dimulai dari
                <br />
                <em>percakapan.</em>
              </h2>
              <span className="concierge-cta">
                Bantu saya memilih <Arrow diagonal />
              </span>
            </Link>
          )}
        </div>
      )}
      {!matches.length ? (
        <div className="catalog-empty">
          <span className="eyebrow">A DIFFERENT CUT?</span>
          <h2>
            Belum menemukan
            <br />
            <em>yang Anda cari?</em>
          </h2>
          <p>
            Coba nama produk lain atau diskusikan kebutuhan Anda dengan tim
            kami.
          </p>
          <button
            className="text-link"
            onClick={() => {
              setQuery("");
              setCategory("Semua pilihan");
            }}
          >
            Tampilkan semua produk <Arrow />
          </button>
        </div>
      ) : (
        <div className="product-directory">
          <div className="directory-heading">
            <span className="eyebrow">THE COMPLETE SELECTION</span>
            <span>PRODUK / KEGUNAAN / DETAIL</span>
          </div>
          {categories.map((c) => {
            const items = matches.filter((p) => p.category === c);
            return (
              !!items.length && (
                <section className="directory-group" key={c}>
                  <div className="directory-category">
                    <h2>{c}</h2>
                    <span>{String(items.length).padStart(2, "0")} PILIHAN</span>
                  </div>
                  <div>
                    {items.map((p, i) => (
                      <Link
                        className="directory-row"
                        key={p.slug}
                        href={`/produk/${p.slug}`}
                      >
                        <span className="directory-number">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3>{p.name}</h3>
                        <span className="directory-use">
                          {p.use.slice(0, 2).join(" · ")}
                        </span>
                        <Arrow diagonal />
                      </Link>
                    ))}
                  </div>
                </section>
              )
            );
          })}
        </div>
      )}
      <div className="catalog-help">
        <p>
          Pilihan di atas merupakan katalog produk. Harga, spesifikasi, dan
          ketersediaan dikonfirmasi bersama tim sales. Foto merupakan ilustrasi
          penyajian produk.
        </p>
        <Link className="text-link" href="/kontak">
          Bantu saya memilih <Arrow diagonal />
        </Link>
      </div>
    </div>
  );
}
