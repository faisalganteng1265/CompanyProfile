"use client";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { company, whatsapp } from "@/lib/company";
import { getProduct, products } from "@/lib/products";
import { Arrow } from "./icons";

type Prepared = { message: string; sales: string; name: string };
export default function ContactForm() {
  const params = useSearchParams();
  const product = getProduct(params.get("produk") || "");
  const [prepared, setPrepared] = useState<Prepared | null>(null);
  const result = useRef<HTMLDivElement>(null);
  return (
    <form
      className="consultation-form"
      onChange={() => {
        if (prepared) setPrepared(null);
      }}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const name = String(data.get("name") || "").trim();
        const business = String(data.get("business") || "").trim();
        const city = String(data.get("city") || "").trim();
        const selection = String(
          data.get("product") || "Belum menentukan pilihan",
        );
        const needs = String(data.get("needs") || "").trim();
        const sales = String(data.get("sales") || company.sales[0].number);
        const message = `Halo Tatsuo Beef, saya ${name}${business ? ` dari ${business}` : ""}.\n\nLokasi usaha: ${city}\nProduk yang diminati: ${selection}\nKebutuhan: ${needs}\n\nSaya ingin berdiskusi mengenai spesifikasi, harga, ketersediaan, dan pengiriman. Terima kasih.`;
        setPrepared({ message, sales, name });
        requestAnimationFrame(() => {
          result.current?.focus();
          result.current?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
            block: "center",
          });
        });
      }}
    >
      <div className="form-intro">
        <span className="eyebrow">A FEW DETAILS TO GET STARTED</span>
        <h2>
          Ceritakan <em>rencana Anda.</em>
        </h2>
        <p>
          Isi kebutuhan Anda, tinjau pesannya, lalu lanjutkan percakapan bersama
          tim kami di WhatsApp.
        </p>
      </div>
      <div className="form-fields">
        <label>
          Nama Anda <span>*</span>
          <input
            name="name"
            autoComplete="name"
            placeholder="Nama lengkap"
            required
            maxLength={100}
          />
        </label>
        <label>
          Nama usaha
          <input
            name="business"
            autoComplete="organization"
            placeholder="Restoran, hotel, katering..."
            maxLength={150}
          />
        </label>
        <label>
          Kota / kabupaten <span>*</span>
          <input
            name="city"
            autoComplete="address-level2"
            placeholder="Lokasi usaha Anda"
            required
            maxLength={100}
          />
        </label>
        <label>
          Pilihan produk
          <select
            name="product"
            defaultValue={product?.name || "Belum menentukan pilihan"}
          >
            <option>Belum menentukan pilihan</option>
            {products.map((p) => (
              <option key={p.slug}>{p.name}</option>
            ))}
            <option>Beberapa produk / kebutuhan lainnya</option>
          </select>
        </label>
        <label className="form-full">
          Apa yang bisa kami bantu? <span>*</span>
          <textarea
            name="needs"
            placeholder="Misalnya: kebutuhan tenderloin untuk menu steak, perkiraan jumlah, dan rencana pemesanan..."
            required
            rows={4}
            maxLength={2000}
          />
        </label>
        <label className="form-full">
          Ingin berbicara dengan
          <select name="sales" defaultValue={company.sales[0].number}>
            {company.sales.map((s) => (
              <option key={s.number} value={s.number}>
                {s.name} — {s.phone}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="form-submit-row">
        <p>
          Formulir ini menyiapkan pesan. Pesan baru terkirim setelah Anda
          mengirimnya sendiri di WhatsApp.
        </p>
        <button className="button button-red" type="submit">
          Siapkan percakapan <Arrow diagonal />
        </button>
      </div>
      {prepared && (
        <div
          className="prepared-message"
          ref={result}
          tabIndex={-1}
          aria-label="Pesan konsultasi siap ditinjau"
        >
          <span className="eyebrow">READY WHEN YOU ARE, {prepared.name}</span>
          <h3>
            Awal yang baik.
            <br />
            <em>Mari lanjutkan.</em>
          </h3>
          <p className="message-preview">{prepared.message}</p>
          <a
            className="button button-red"
            href={whatsapp(prepared.message, prepared.sales)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buka pesan di WhatsApp <Arrow diagonal />
          </a>
          <p className="prepared-note">
            Pesan belum dikirim. Anda masih bisa mengeditnya di WhatsApp.
          </p>
        </div>
      )}
    </form>
  );
}
