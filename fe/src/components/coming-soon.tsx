import Link from "next/link";
import { Arrow, Asterisk } from "./icons";
import { whatsapp } from "@/lib/company";
import "./coming-soon.css";

export default function ComingSoon({ label }: { label: string }) {
  return (
    <main id="main" className="coming-soon">
      <div className="container coming-soon-content">
        <span className="coming-soon-label">{label}</span>
        <span className="coming-soon-mark" aria-hidden="true">
          <Asterisk />
        </span>
        <h1>
          Coming
          <br />
          <em>soon.</em>
        </h1>
        <p>
          Kami sedang menyiapkan sesuatu yang baik.
          <br />
          Sampai bertemu di halaman ini segera.
        </p>
        <div className="coming-soon-actions">
          <Link href="/">
            Kembali ke beranda <Arrow />
          </Link>
          <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
            Hubungi Tatsuo <Arrow diagonal />
          </a>
        </div>
        <span className="coming-soon-signature">
          GOOD MEAT. GREAT THINGS AHEAD.
        </span>
      </div>
    </main>
  );
}
