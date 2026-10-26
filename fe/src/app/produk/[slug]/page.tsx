import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MotionPage from "@/components/motion-page";
import {
  Breadcrumb,
  NextChapter,
  SectionEyebrow,
} from "@/components/page-parts";
import { Arrow, Asterisk, Contours } from "@/components/icons";
import { getProduct, products } from "@/lib/products";
import { whatsapp } from "@/lib/company";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p
    ? {
        title: `${p.name} — Tatsuo Beef`,
        description: p.description,
        alternates: { canonical: `/produk/${p.slug}` },
      }
    : { title: "Produk tidak ditemukan — Tatsuo Beef" };
}
export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const index = String(products.indexOf(product) + 1).padStart(2, "0");
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);
  return (
    <MotionPage className="product-detail-page">
      <main id="main">
        <div className="container">
          <Breadcrumb
            current={product.name}
            parent={{ label: "Pilihan produk", href: "/produk" }}
          />
        </div>
        <section className="product-detail-hero container">
          <div
            className={`product-detail-visual page-enter ${!product.image ? "typographic-product" : ""}`}
          >
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 760px) 100vw, 50vw"
                quality={90}
                className="page-parallax"
              />
            ) : (
              <>
                <Contours />
                <span className="typographic-kind">
                  {product.category === "Daging sapi"
                    ? "BEEF"
                    : product.category === "Daging ayam"
                      ? "POULTRY"
                      : "SEAFOOD"}
                </span>
                <Asterisk />
                <span className="typographic-caption">
                  {product.kind}
                  <br />
                  THE TATSUO SELECTION
                </span>
              </>
            )}
            <span className="detail-visual-number">
              N° {index} / THE SELECTION
            </span>
            {product.image && (
              <span className="detail-image-note">FOTO ILUSTRASI PRODUK</span>
            )}
          </div>
          <div className="product-detail-copy">
            <span className="eyebrow page-enter">
              {product.category} / {product.kind}
            </span>
            <h1 className="page-enter">{product.name}</h1>
            <p className="product-detail-description page-enter">
              {product.description}
            </p>
            <div className="product-applications page-enter">
              <span className="eyebrow">POTENTIAL ON YOUR MENU</span>
              <div>
                {product.use.map((u) => (
                  <span key={u}>{u}</span>
                ))}
              </div>
            </div>
            <dl className="product-specs page-enter">
              <div>
                <dt>Kategori</dt>
                <dd>{product.category}</dd>
              </div>
              <div>
                <dt>Spesifikasi & ukuran</dt>
                <dd>Sesuai penawaran</dd>
              </div>
              <div>
                <dt>Harga & ketersediaan</dt>
                <dd>Konfirmasi tim sales</dd>
              </div>
            </dl>
            <Link
              href={`/kontak?produk=${product.slug}`}
              className="button button-red page-enter"
            >
              Diskusikan kebutuhan Anda <Arrow diagonal />
            </Link>
            <a
              className="detail-quick-contact"
              href={whatsapp(
                `Halo Tatsuo Beef, saya ingin meminta informasi ${product.name}, spesifikasi, harga, dan ketersediaannya.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Atau tanya langsung via WhatsApp <Arrow diagonal />
            </a>
          </div>
        </section>
        <section className="detail-guidance section-space">
          <div className="container">
            <SectionEyebrow number="01">
              The right cut for your kitchen
            </SectionEyebrow>
            <div className="detail-guidance-grid">
              <h2 className="page-reveal">
                Setiap dapur berbeda.
                <br />
                <em>Begitu juga kebutuhannya.</em>
              </h2>
              <div className="page-reveal">
                <p>
                  Sampaikan bentuk pengolahan, perkiraan kebutuhan, dan lokasi
                  usaha Anda. Kami bantu menyiapkan informasi produk yang
                  relevan untuk pertimbangan dapur.
                </p>
                <div className="guidance-items">
                  {[
                    [
                      "01",
                      "Pilihan yang sesuai",
                      "Diskusikan potongan dan spesifikasi sebelum menentukan pesanan.",
                    ],
                    [
                      "02",
                      "Penawaran yang jelas",
                      "Dapatkan informasi harga, ketersediaan, serta minimum pemesanan terbaru.",
                    ],
                    [
                      "03",
                      "Pengiriman disepakati",
                      "Konfirmasikan lokasi dan jadwal pengiriman bersama tim sales.",
                    ],
                  ].map(([n, t, d]) => (
                    <div key={n}>
                      <span>{n}</span>
                      <div>
                        <h3>{t}</h3>
                        <p>{d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container related-section section-space">
          <div className="related-heading">
            <h2>
              Masih ada <em>kemungkinan lain.</em>
            </h2>
            <Link className="text-link" href="/produk">
              Seluruh koleksi <Arrow diagonal />
            </Link>
          </div>
          <div className="related-products">
            {related.map((p) => (
              <Link href={`/produk/${p.slug}`} key={p.slug}>
                <span className="eyebrow">{p.kind}</span>
                <h3>{p.name}</h3>
                <span>{p.use[0]}</span>
                <Arrow diagonal />
              </Link>
            ))}
          </div>
        </section>
        <NextChapter
          label="YOUR KITCHEN. YOUR SIGNATURE."
          title="Dari pilihan yang tepat,"
          accent="ke sajian yang berkesan."
          href={`/kontak?produk=${product.slug}`}
          cta="Mari diskusikan"
        />
      </main>
    </MotionPage>
  );
}
