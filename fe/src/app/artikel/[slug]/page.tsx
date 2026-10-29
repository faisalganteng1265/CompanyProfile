import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { articles, getArticle } from "@/lib/articles";
import { Arrow } from "@/components/icons";
import "./article.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return { title: "Artikel tidak ditemukan — Tatsuo Beef" };
  return {
    title: `${article.title} — Jurnal Tatsuo`,
    description: article.excerpt,
    alternates: { canonical: `/artikel/${article.slug}` },
    robots: { index: false, follow: true },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      images: [{ url: article.image, alt: article.imageAlt }],
    },
  };
}

export default function ArticlePage({ params }: Props) {
  return (
    <Suspense fallback={<ArticlePlaceholder />}>
      <ArticleContent params={params} />
    </Suspense>
  );
}

function ArticlePlaceholder() {
  return (
    <main id="main" className="tatsuo-article-page" aria-busy="true">
      <header className="container tatsuo-article-header">
        <Link className="tatsuo-article-back" href="/#artikel">
          <Arrow className="tatsuo-back-arrow" /> Kembali ke artikel
        </Link>
        <h1>Catatan dari dapur.</h1>
        <p role="status">Menyiapkan artikel untuk Anda…</p>
      </header>
      <div
        className="container tatsuo-article-placeholder"
        aria-hidden="true"
      />
    </main>
  );
}

async function ArticleContent({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const related = articles.filter(({ slug }) => slug !== article.slug);
  return (
    <main id="main" className="tatsuo-article-page">
      <article>
        <header className="container tatsuo-article-header">
          <Link className="tatsuo-article-back" href="/#artikel">
            <Arrow className="tatsuo-back-arrow" /> Kembali ke artikel
          </Link>
          <div className="tatsuo-article-meta">
            <span>{article.category}</span>
            <span>{article.readTime}</span>
          </div>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
          <span className="tatsuo-article-sample">
            JURNAL TATSUO · ARTIKEL CONTOH
          </span>
        </header>
        <figure className="container tatsuo-article-figure">
          <Image
            src={article.image}
            alt={article.imageAlt}
            width={1600}
            height={1000}
            sizes="(max-width: 760px) 100vw, 90vw"
            loading="eager"
          />
          <figcaption>Foto ilustrasi.</figcaption>
        </figure>
        <div className="tatsuo-article-reading">
          <p className="tatsuo-article-intro">{article.intro}</p>
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <aside className="tatsuo-article-takeaway">
            <span>CATATAN UNTUK DAPUR ANDA</span>
            <p>{article.takeaway}</p>
          </aside>
          <Link className="tatsuo-article-back" href="/#artikel">
            <Arrow className="tatsuo-back-arrow" /> Kembali ke catatan dari
            dapur
          </Link>
        </div>
      </article>
      <section
        className="container tatsuo-article-related"
        aria-labelledby="related-articles-heading"
      >
        <h2 id="related-articles-heading">Cerita berikutnya.</h2>
        <div className="tatsuo-article-related-grid">
          {related.map((item) => (
            <article key={item.slug}>
              <Link href={`/artikel/${item.slug}`}>
                <div className="tatsuo-article-related-photo">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={900}
                    height={650}
                    sizes="(max-width: 760px) 90vw, 43vw"
                  />
                </div>
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <span className="tatsuo-article-related-read">
                  Baca cerita <Arrow diagonal />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
