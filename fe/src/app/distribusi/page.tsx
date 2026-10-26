import type { Metadata } from "next";
import MotionPage from "@/components/motion-page";
import {
  Breadcrumb,
  NextChapter,
  SectionEyebrow,
} from "@/components/page-parts";
import {
  DistributionNetwork,
  DeliveryInquiry,
} from "@/components/distribution-network";
import { Arrow, Contours } from "@/components/icons";
export const metadata: Metadata = {
  title: "Distribusi & Kemitraan — Tatsuo Beef",
  description:
    "Kenali alur pengadaan dan distribusi Tatsuo Beef dari Kartasura, Sukoharjo. Diskusikan kebutuhan penyimpanan, pengiriman, dan pasokan usaha Anda.",
  alternates: { canonical: "/distribusi" },
};

function StorageIcon({ type }: { type: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="1"
    >
      {type === 0 ? (
        <>
          <path d="M50 12v76M17 31l66 38M17 69l66-38M39 20l11 11 11-11M39 80l11-11 11 11M19 43l15-4-4-15M81 57l-15 4 4 15M19 57l15 4-4 15M81 43l-15-4 4-15" />
        </>
      ) : type === 1 ? (
        <>
          <path d="M42 58V21a9 9 0 0 1 18 0v37a18 18 0 1 1-18 0Z" />
          <path d="M51 29v42M69 28h10M69 40h7M69 52h10" />
          <circle cx="51" cy="73" r="7" />
        </>
      ) : (
        <>
          <path d="m16 32 34-17 34 17v42L50 91 16 74V32Zm0 0 34 17 34-17M50 49v42M33 23l34 18v19" />
        </>
      )}
    </svg>
  );
}
export default function DistributionPage() {
  return (
    <MotionPage className="distribution-page">
      <main id="main">
        <section className="distribution-hero">
          <Contours />
          <div className="container">
            <Breadcrumb current="Distribusi" />
            <div className="distribution-hero-grid">
              <div>
                <span className="eyebrow page-enter">
                  03 / THE JOURNEY OF GOOD MEAT
                </span>
                <h1 className="page-enter">
                  Good things.
                  <br />
                  <em>On their way.</em>
                </h1>
                <p className="page-enter">
                  Dari sumber pilihan ke dapur Anda.
                  <br />
                  Setiap langkah punya peran.
                </p>
                <a className="text-link page-enter" href="#pengiriman">
                  Diskusikan lokasi pengiriman <Arrow diagonal />
                </a>
                <span className="distribution-origin page-enter">
                  OUR ORIGIN
                  <br />
                  <strong>KARTASURA, SOLO.</strong>
                  <span>7.55° S / 110.75° E</span>
                </span>
              </div>
              <DistributionNetwork />
            </div>
          </div>
        </section>
        <section className="logistics-intro container section-space">
          <SectionEyebrow number="01">Care beyond the cut</SectionEyebrow>
          <div className="section-heading page-reveal">
            <h2>
              Bahan yang baik layak
              <br />
              <em>ditangani dengan baik.</em>
            </h2>
            <p>
              Penyimpanan dan logistik menjadi bagian
              <br />
              dari perjalanan bahan menuju dapur Anda.
            </p>
          </div>
          <div className="storage-grid">
            {[
              [
                "Penyimpanan beku",
                "Untuk kebutuhan produk beku, dengan penanganan yang mengikuti karakter produk.",
              ],
              [
                "Penyimpanan dingin",
                "Untuk produk yang memerlukan penyimpanan dingin sebelum pengiriman.",
              ],
              [
                "Penyimpanan kering",
                "Untuk kebutuhan bahan yang sesuai dengan fasilitas penyimpanan kering.",
              ],
            ].map(([title, text], i) => (
              <article className="storage-card page-reveal" key={title}>
                <span className="eyebrow">0{i + 1} / STORAGE</span>
                <StorageIcon type={i} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="facility-note">
            Informasi fasilitas mengacu pada profil distribusi Tatsuo.
            Diskusikan persyaratan penyimpanan dan dokumen produk yang
            dibutuhkan bersama tim kami.
          </p>
        </section>
        <section className="distribution-process">
          <div className="container">
            <div className="process-title">
              <span className="eyebrow">
                FROM A CONVERSATION TO YOUR KITCHEN
              </span>
              <h2 className="page-reveal">
                Terencana sejak awal.
                <br />
                <em>Disepakati bersama.</em>
              </h2>
            </div>
            <div className="process-rows">
              {[
                [
                  "01",
                  "Kenali kebutuhannya.",
                  "Sampaikan pilihan produk, perkiraan jumlah, dan lokasi usaha. Tim kami membantu memetakan kebutuhan awal.",
                ],
                [
                  "02",
                  "Siapkan pengadaannya.",
                  "Konfirmasikan spesifikasi, stok, harga, minimum pemesanan, serta kebutuhan penanganan produk.",
                ],
                [
                  "03",
                  "Sepakati pengirimannya.",
                  "Diskusikan jangkauan, metode, jadwal, dan biaya pengiriman sebelum pesanan diproses.",
                ],
                [
                  "04",
                  "Lanjutkan kemitraannya.",
                  "Bicarakan kebutuhan berikutnya agar pengadaan bahan selaras dengan ritme dapur dan rencana usaha Anda.",
                ],
              ].map(([n, title, text]) => (
                <article className="process-row page-reveal" key={n}>
                  <span>{n}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <Arrow diagonal />
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="pengiriman"
          className="delivery-section container section-space"
        >
          <div>
            <span className="eyebrow">LET’S FIND A WAY</span>
            <h2 className="page-reveal">
              Dapur Anda di mana?
              <br />
              <em>Mari kita bicarakan.</em>
            </h2>
            <p>
              Kami berlokasi di Kartasura, Sukoharjo. Sampaikan tujuan
              pengiriman agar tim dapat memberikan informasi yang tepat.
            </p>
          </div>
          <DeliveryInquiry />
        </section>
        <NextChapter
          label="GOOD LOGISTICS START WITH GOOD COMMUNICATION"
          title="Ada rencana pasokan?"
          accent="Kami siap mendengar."
          href="/kontak"
          cta="Diskusi kemitraan"
        />
      </main>
    </MotionPage>
  );
}
