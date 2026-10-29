import type { Metadata } from "next";
import Image from "next/image";
import { Arrow } from "@/components/icons";
import ProductCatalog from "@/components/product-catalog";
import { products } from "@/lib/products";
import { whatsapp } from "@/lib/company";
import "./selection.css";
import "./catalog-cover.css";

export const metadata: Metadata = {
  title: "Pilihan Produk — Tatsuo Beef",
  description:
    "Jelajahi 25 pilihan daging sapi, ayam, dan seafood Tatsuo Beef. Temukan bahan yang tepat untuk restoran, hotel, katering, dan dapur Anda.",
  alternates: { canonical: "/produk" },
};

export default function ProductsPage() {
  return (
    <main id="main" className="selection-page">
      <section className="catalog-cover" aria-labelledby="selection-heading">
        <div className="container catalog-cover-inner">
          <div className="catalog-cover-kicker">
            <span>THE TATSUO COLLECTION</span>
            <span>25 PILIHAN · SATU DAPUR ANDA</span>
          </div>
          <h1 id="selection-heading">
            Selera besar.
            <br />
            <em>Mulai dari sini.</em>
          </h1>
          <div className="catalog-cover-gallery">
            <a
              className="catalog-cover-tile catalog-cover-poultry"
              href="#koleksi"
              aria-label="Jelajahi koleksi daging ayam"
            >
              <Image
                src="/images/product-chicken.webp"
                alt="Pilihan dada ayam tanpa tulang"
                width={1000}
                height={1000}
                sizes="(max-width: 600px) 35vw, 25vw"
                priority
              />
              <span className="catalog-cover-tile-label">
                <span>
                  Ayam<small>Untuk segala kreasi.</small>
                </span>
                <Arrow diagonal />
              </span>
            </a>
            <a
              className="catalog-cover-tile catalog-cover-beef"
              href="#koleksi"
              aria-label="Jelajahi koleksi daging sapi"
            >
              <Image
                src="/images/product-tenderloin.webp"
                alt="Potongan tenderloin meltique"
                width={1000}
                height={1000}
                sizes="(max-width: 600px) 52vw, 34vw"
                priority
              />
              <span className="catalog-cover-tile-label">
                <span>
                  Daging sapi<small>Potongan penuh karakter.</small>
                </span>
                <Arrow diagonal />
              </span>
            </a>
            <a
              className="catalog-cover-tile catalog-cover-seafood"
              href="#koleksi"
              aria-label="Jelajahi koleksi seafood"
            >
              <Image
                src="/images/product-salmon.webp"
                alt="Pilihan salmon fillet"
                width={1000}
                height={1000}
                sizes="(max-width: 600px) 35vw, 25vw"
                priority
              />
              <span className="catalog-cover-tile-label">
                <span>
                  Seafood<small>Inspirasi dari laut.</small>
                </span>
                <Arrow diagonal />
              </span>
            </a>
            <span className="catalog-cover-stamp" aria-hidden="true">
              <strong>
                Good
                <br />
                food starts
                <br />
                <em>here.</em>
              </strong>
            </span>
          </div>
          <div className="catalog-cover-bottom">
            <p>
              Dari menu andalan sampai ide berikutnya.
              <br />
              Temukan bahan yang membuatnya istimewa.
            </p>
            <a className="catalog-cover-explore" href="#koleksi">
              Jelajahi {products.length} produk
              <span>
                <Arrow />
              </span>
            </a>
          </div>
        </div>
      </section>
      <ProductCatalog />
      <section
        className="selection-conversation"
        aria-labelledby="selection-conversation-heading"
      >
        <div className="container selection-conversation-inner">
          <div>
            <span className="selection-eyebrow">
              PILIHAN ANDA, KAMI BANTU TEMUKAN.
            </span>
            <h2 id="selection-conversation-heading">
              Menu Anda istimewa.
              <br />
              <em>Mari pilih bahannya.</em>
            </h2>
          </div>
          <div>
            <p>
              Ceritakan kebutuhan, jumlah, dan rencana menu Anda. Tim Tatsuo
              membantu mengonfirmasi pilihan produk, harga, dan ketersediaan.
            </p>
            <a
              className="selection-button"
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Minta katalog &amp; harga <Arrow diagonal />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
