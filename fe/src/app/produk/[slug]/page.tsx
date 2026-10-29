import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Arrow } from "@/components/icons";
import { getProduct, products } from "@/lib/products";
import { whatsapp } from "@/lib/company";
import "../selection.css";
import "./detail.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return { title: "Produk tidak ditemukan — Tatsuo Beef" };
  return {
    title: `${product.name} — Tatsuo Beef`,
    description: product.description,
    alternates: { canonical: `/produk/${product.slug}` },
    openGraph: {
      title: `${product.name} — Tatsuo Beef`,
      description: product.description,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default function ProductPage({ params }: Props) {
  return (
    <Suspense fallback={<ProductPlaceholder />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

function ProductPlaceholder() {
  return (
    <main
      id="main"
      className="selection-page selection-detail-page"
      aria-busy="true"
    >
      <div className="container">
        <Link className="selection-back" href="/produk#koleksi">
          <Arrow /> Semua produk
        </Link>
        <div className="selection-detail-placeholder" role="status">
          Menyiapkan pilihan Anda…
        </div>
      </div>
    </main>
  );
}

async function ProductContent({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const related = products
    .filter(
      (item) =>
        item.category === product.category && item.slug !== product.slug,
    )
    .slice(0, 3);
  const inquiry = whatsapp(
    `Halo Tatsuo Beef, saya tertarik dengan ${product.name}. Boleh minta informasi spesifikasi, harga, dan ketersediaannya untuk usaha saya?`,
  );
  return (
    <main id="main" className="selection-page selection-detail-page">
      <article className="container">
        <Link className="selection-back" href="/produk#koleksi">
          <Arrow /> Semua produk
        </Link>
        <div className="selection-product-layout">
          <figure className="selection-product-figure">
            <Image
              src={product.image}
              alt={product.name}
              width={1000}
              height={1000}
              priority
              sizes="(max-width: 760px) 100vw, 52vw"
            />
            <figcaption>Foto ilustrasi produk.</figcaption>
          </figure>
          <div className="selection-product-copy">
            <span className="selection-eyebrow">
              {product.category} · TATSUO SELECTION
            </span>
            <h1>
              {product.name}
              <span>.</span>
            </h1>
            <p className="selection-product-description">
              {product.description}
            </p>
            <div className="selection-product-use">
              <h2>Ide untuk menu Anda</h2>
              <ul>
                {product.use.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <a
              className="selection-button"
              href={inquiry}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tanya harga &amp; ketersediaan <Arrow diagonal />
            </a>
            <p className="selection-product-note">
              Ukuran potong, kemasan, dan kebutuhan jumlah dapat Anda diskusikan
              langsung dengan tim Tatsuo.
            </p>
          </div>
        </div>
      </article>
      <section
        className="selection-related"
        aria-labelledby="selection-related-heading"
      >
        <div className="container">
          <div className="selection-related-heading">
            <h2 id="selection-related-heading">
              Pilihan berikutnya<span>.</span>
            </h2>
            <Link className="selection-back" href="/produk#koleksi">
              Jelajahi koleksi <Arrow />
            </Link>
          </div>
          <div className="selection-grid">
            {related.map((item) => (
              <article className="selection-card" key={item.slug}>
                <Link
                  href={`/produk/${item.slug}`}
                  className="selection-card-link"
                >
                  <div className="selection-card-photo">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={1000}
                      height={1000}
                      sizes="(max-width: 600px) 100vw, (max-width: 1000px) 45vw, 30vw"
                    />
                    <span className="selection-card-arrow">
                      <Arrow diagonal />
                    </span>
                  </div>
                  <div className="selection-card-copy">
                    <h3>{item.name}</h3>
                    <p>{item.use.join(" · ")}</p>
                    <span className="selection-card-detail">
                      Kenali produknya <Arrow />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
