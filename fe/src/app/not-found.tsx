import Link from "next/link";
import { Arrow, Contours } from "@/components/icons";
export default function NotFound() {
  return (
    <main id="main" className="not-found-page">
      <Contours />
      <div className="container">
        <span className="eyebrow">404 / A DIFFERENT CUT</span>
        <h1>
          Sepertinya,
          <br />
          <em>bukan di sini.</em>
        </h1>
        <p>
          Halaman yang Anda cari belum tersedia.
          <br />
          Masih banyak pilihan baik yang bisa Anda temukan.
        </p>
        <Link href="/produk" className="button button-red">
          Lihat pilihan produk <Arrow diagonal />
        </Link>
        <Link href="/" className="text-link">
          Kembali ke beranda <Arrow />
        </Link>
      </div>
    </main>
  );
}
