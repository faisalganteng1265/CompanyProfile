import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MotionPage from "@/components/motion-page";
import {
  Breadcrumb,
  NextChapter,
  SectionEyebrow,
} from "@/components/page-parts";
import { Arrow, Asterisk, Contours } from "@/components/icons";

export const metadata: Metadata = {
  title: "Tentang Kami — Tatsuo Beef",
  description:
    "Kenali PT. Tatsuo Beef Indonesia. Sejak 2023, kami tumbuh bersama bisnis kuliner melalui bahan pilihan dan kemitraan yang berarti.",
  alternates: { canonical: "/tentang" },
};

export default function AboutPage() {
  return (
    <MotionPage className="about-page">
      <main id="main">
        <div className="container">
          <Breadcrumb current="Tentang kami" />
        </div>
        <section className="about-hero container">
          <div className="about-hero-copy">
            <span className="eyebrow page-enter">
              01 / OUR STORY, YOUR NEXT CHAPTER
            </span>
            <h1 className="page-enter">
              Good people.
              <br />
              Good meat.
              <br />
              <em>Great things.</em>
            </h1>
            <p className="page-enter">
              Kami percaya, kemitraan yang baik
              <br />
              punya rasa yang berbeda.
            </p>
            <div className="about-hero-foot page-enter">
              <span>SOLO, INDONESIA</span>
              <span>ESTABLISHED 2023</span>
              <Arrow diagonal />
            </div>
          </div>
          <div className="about-hero-image page-enter">
            <Image
              src="/images/story-selection-v2.webp"
              alt="Pemilihan potongan ribeye dengan perhatian pada detail"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 48vw"
              quality={90}
              className="page-parallax"
            />
            <span className="image-footnote">SELECTED WITH CARE. ALWAYS.</span>
          </div>
        </section>
        <section className="about-manifesto section-space container">
          <SectionEyebrow number="01">
            The beginning of a good partnership
          </SectionEyebrow>
          <div className="manifesto-grid">
            <div className="page-reveal">
              <span className="editorial-year">
                2023<span>AWAL CERITA KAMI</span>
              </span>
              <Asterisk />
            </div>
            <div>
              <h2 className="page-reveal">
                Berawal dari bahan.
                <br />
                <em>Bertumbuh lewat kepercayaan.</em>
              </h2>
              <p className="manifesto-lead page-reveal">
                Bisnis kuliner dibangun dari banyak hal. Bahan yang baik, kerja
                keras di dapur, dan orang-orang yang bisa diandalkan.
              </p>
              <div className="manifesto-columns page-reveal">
                <p>
                  Sejak 2023, PT. Tatsuo Beef Indonesia hadir dalam pengadaan
                  ayam, daging sapi impor, dan daging sapi lokal. Kami ingin
                  menjadi bagian dari cerita usaha Anda, mulai dari menu pertama
                  hingga langkah berikutnya.
                </p>
                <p>
                  Bagi kami, hubungan dengan pelanggan adalah kemitraan. Kami
                  menjaga komunikasi yang terbuka, pelayanan yang profesional,
                  dan komitmen untuk bertumbuh bersama dalam ekosistem usaha
                  yang berkelanjutan.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="about-belief">
          <Contours />
          <div className="container">
            <span className="eyebrow">THE WAY WE SEE IT</span>
            <p className="page-reveal">
              Hidangan yang baik
              <br />
              membuat orang kembali.
              <br />
              <em>
                Kemitraan yang baik
                <br />
                membuat Anda melangkah jauh.
              </em>
            </p>
            <span className="belief-signature">
              A SHARED BELIEF. A BETTER BUSINESS.
            </span>
          </div>
        </section>
        <section className="values-section section-space container">
          <SectionEyebrow number="02">
            What we bring to the table
          </SectionEyebrow>
          <div className="section-heading page-reveal">
            <h2>
              Prinsip sederhana.
              <br />
              <em>Dijaga setiap hari.</em>
            </h2>
            <p>
              Nilai yang kami bawa dalam setiap percakapan,
              <br />
              pilihan produk, dan kerja sama.
            </p>
          </div>
          <div className="values-list">
            {[
              [
                "01",
                "Kualitas, dengan perhatian.",
                "Menyediakan produk konsumsi bermutu tinggi dan membantu Anda menemukan bahan yang sesuai dengan kebutuhan menu.",
              ],
              [
                "02",
                "Komitmen yang terasa.",
                "Menjaga kepercayaan melalui komunikasi yang terbuka dan pelayanan yang responsif sejak percakapan pertama.",
              ],
              [
                "03",
                "Fair dalam berbisnis.",
                "Membangun kerja sama dengan penawaran yang jelas, harga yang kompetitif, dan rasa saling menghargai.",
              ],
              [
                "04",
                "Tumbuh, bersama.",
                "Menempatkan hubungan jangka panjang sebagai tujuan. Ketika bisnis Anda berkembang, kami ingin menjadi bagian dari perjalanannya.",
              ],
            ].map(([n, title, description]) => (
              <article className="value-row page-reveal" key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <Arrow diagonal />
              </article>
            ))}
          </div>
        </section>
        <section className="about-table">
          <div className="about-table-image">
            <Image
              src="/images/hero.webp"
              alt="Ribeye dengan marbling di atas papan kayu"
              fill
              sizes="100vw"
              className="page-parallax"
            />
          </div>
          <div className="container">
            <span className="eyebrow">
              FROM OUR SELECTION TO YOUR SIGNATURE
            </span>
            <h2 className="page-reveal">
              Bahan untuk menu Anda.
              <br />
              Ruang untuk <em>ide besar Anda.</em>
            </h2>
            <Link className="button button-cream" href="/produk">
              Temukan pilihan Anda <Arrow diagonal />
            </Link>
          </div>
        </section>
        <NextChapter
          label="THE NEXT CHAPTER"
          title="Mari saling kenal."
          accent="Lalu tumbuh bersama."
          href="/kontak"
          cta="Mulai percakapan"
        />
      </main>
    </MotionPage>
  );
}
