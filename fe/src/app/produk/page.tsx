import type { Metadata } from "next";
import Image from "next/image";
import MotionPage from "@/components/motion-page";
import ProductCatalog from "@/components/product-catalog";
import { Breadcrumb, NextChapter, PageIntro } from "@/components/page-parts";
import { Asterisk } from "@/components/icons";
export const metadata: Metadata = {
  title: "Pilihan Produk — Tatsuo Beef",
  description:
    "Jelajahi 25 pilihan daging sapi, ayam, dan seafood Tatsuo Beef. Temukan potongan untuk kebutuhan restoran, hotel, katering, dan bisnis kuliner Anda.",
  alternates: { canonical: "/produk" },
};
export default function ProductsPage() {
  return (
    <MotionPage className="catalog-page">
      <main id="main">
        <div className="container">
          <Breadcrumb current="Pilihan produk" />
        </div>
        <PageIntro
          number="02"
          label="THE SELECTION"
          title="Every cut,"
          accent="a possibility."
          description="Dari potongan andalan hingga kebutuhan dapur sehari-hari. Temukan bahan untuk sajian yang ingin Anda ciptakan."
        />
        <div className="collection-banner">
          <Image
            src="/images/hero.webp"
            alt="Detail marbling ribeye pilihan"
            fill
            priority
            sizes="100vw"
            className="page-parallax"
            quality={90}
          />
          <div className="container">
            <span>
              SELECTED CUTS.
              <br />
              UNLIMITED POSSIBILITIES.
            </span>
            <Asterisk />
            <span>
              25 PILIHAN
              <br />
              SATU MITRA.
            </span>
          </div>
        </div>
        <section className="container catalog-main">
          <ProductCatalog />
        </section>
        <NextChapter
          label="A GOOD MENU STARTS WITH A CONVERSATION"
          title="Menu Anda, ambisi Anda."
          accent="Mari temukan bahannya."
          href="/kontak"
          cta="Konsultasi produk"
        />
      </main>
    </MotionPage>
  );
}
