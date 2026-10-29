"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arrow, Asterisk } from "./icons";
import MobileOptimizedImage from "./mobile-optimized-image";
import { company, whatsapp } from "@/lib/company";

const interests = [
  "Katalog & harga",
  "Pengadaan rutin",
  "Distribusi",
  "Lainnya",
];

export default function ContactExperience() {
  const root = useRef<HTMLElement>(null);
  const [interest, setInterest] = useState(interests[0]);
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [sales, setSales] = useState(company.sales[0].number);
  const message = `Halo Tatsuo Beef, saya ${name.trim() || "ingin berdiskusi"}${business.trim() ? ` dari ${business.trim()}` : ""}.\n\nSaya ingin menanyakan ${interest.toLowerCase()}.${location.trim() ? `\nLokasi usaha: ${location.trim()}` : ""}${notes.trim() ? `\n\n${notes.trim()}` : ""}\n\nTerima kasih.`;

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".contact-title-line > span", {
          yPercent: 110,
          rotation: 2,
          duration: 1.1,
          stagger: 0.14,
          ease: "power4.out",
        });
        gsap.from(".contact-opening", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.25,
        });
        gsap.from(".contact-hello", {
          scale: 0.75,
          rotation: -18,
          opacity: 0,
          duration: 1,
          delay: 0.4,
          ease: "back.out(1.3)",
        });
        gsap.to(".contact-hello svg", {
          rotation: 100,
          ease: "none",
          scrollTrigger: {
            trigger: ".contact-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.utils.toArray<HTMLElement>(".contact-reveal").forEach((item) => {
          gsap.fromTo(
            item,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
        gsap.fromTo(
          ".contact-location-photo img",
          { scale: 1.1 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".contact-location-photo",
              start: "top bottom",
              end: "bottom 45%",
              scrub: true,
            },
          },
        );
      });
    }, element);
    return () => {
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <main id="main" className="tatsuo-contact" ref={root}>
      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="contact-meta contact-opening">
          <span>HUBUNGI TATSUO BEEF</span>
          <span>BAHAN BAIK. PERCAKAPAN BAIK.</span>
        </div>
        <div className="contact-title-layout">
          <h1 id="contact-title">
            <span className="contact-title-line">
              <span>Mari mulai</span>
            </span>
            <span className="contact-title-line">
              <span>
                dari <em>halo.</em>
              </span>
            </span>
          </h1>
          <a
            className="contact-hello"
            href="#tulis-pesan"
            aria-label="Ceritakan kebutuhan Anda"
          >
            <Asterisk />
            <span>
              Good meat.
              <br />
              Great conversation.
            </span>
            <Arrow diagonal />
          </a>
        </div>
        <div className="contact-hero-bottom contact-opening">
          <span className="contact-section-index">01 — PERCAKAPAN PERTAMA</span>
          <p>
            Punya rencana untuk dapur Anda?
            <br />
            Kami ingin mendengarnya.
          </p>
          <a href="#tulis-pesan">
            Ceritakan kebutuhan Anda <Arrow />
          </a>
        </div>
      </section>

      <section
        className="contact-conversation"
        id="tulis-pesan"
        aria-labelledby="contact-conversation-title"
      >
        <div className="contact-direct">
          <div className="contact-reveal">
            <span className="contact-section-index">
              TIM KAMI, LANGSUNG UNTUK ANDA.
            </span>
            <h2 id="contact-conversation-title">
              Sajian istimewa.
              <br />
              <em>Dimulai bersama.</em>
            </h2>
            <p>
              Mulai dari pilihan produk, penawaran harga, hingga kebutuhan
              pengadaan. Mari bicarakan langkah berikutnya.
            </p>
          </div>
          <div className="contact-sales">
            {company.sales.map((person, index) => (
              <article
                className="contact-person contact-reveal"
                key={person.number}
              >
                <div className="contact-person-top">
                  <span>0{index + 1} / TIM SALES</span>
                  <a
                    href={`tel:+${person.number}`}
                    aria-label={`Telepon ${person.name}`}
                  >
                    Telepon <Arrow diagonal />
                  </a>
                </div>
                <a
                  className="contact-person-main"
                  href={whatsapp(undefined, person.number)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <h3>{person.name}</h3>
                    <span>{person.phone}</span>
                  </div>
                  <span className="contact-person-arrow">
                    <Arrow diagonal />
                  </span>
                </a>
              </article>
            ))}
          </div>
          <div className="contact-email contact-reveal">
            <span>LEBIH NYAMAN LEWAT EMAIL?</span>
            <a href={`mailto:${company.email}`}>
              tatsuobeefindonesia
              <wbr />
              @gmail.com <Arrow diagonal />
            </a>
          </div>
        </div>
        <div className="contact-note contact-reveal">
          <div className="contact-note-top">
            <span>CATATAN UNTUK TATSUO</span>
            <Asterisk />
          </div>
          <h2>
            Apa yang bisa
            <br />
            kami bantu?
          </h2>
          <form
            action={`https://wa.me/${sales}`}
            method="get"
            target="_blank"
            rel="noopener noreferrer"
          >
            <input type="hidden" name="text" value={message} />
            <fieldset className="contact-interests">
              <legend>Saya ingin membahas</legend>
              <div>
                {interests.map((item) => (
                  <button
                    type="button"
                    key={item}
                    aria-pressed={interest === item}
                    onClick={() => setInterest(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="contact-fields">
              <label>
                Nama Anda <span>*</span>
                <input
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Nama lengkap"
                  maxLength={100}
                  required
                />
              </label>
              <label>
                Nama usaha
                <input
                  autoComplete="organization"
                  value={business}
                  onChange={(event) => setBusiness(event.target.value)}
                  placeholder="Restoran, hotel, katering…"
                  maxLength={150}
                />
              </label>
              <label className="contact-field-wide">
                Lokasi usaha
                <input
                  autoComplete="address-level2"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Kota / kabupaten"
                  maxLength={150}
                />
              </label>
              <label className="contact-field-wide">
                Ceritakan kebutuhan Anda
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Produk yang dicari, perkiraan jumlah, atau pertanyaan Anda."
                  rows={3}
                  maxLength={1500}
                />
              </label>
              <label className="contact-field-wide">
                Hubungi tim
                <select
                  value={sales}
                  onChange={(event) => setSales(event.target.value)}
                >
                  {company.sales.map((person) => (
                    <option key={person.number} value={person.number}>
                      {person.name} — {person.phone}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button className="contact-send" type="submit">
              Lanjut ke WhatsApp <Arrow diagonal />
            </button>
            <p className="contact-form-hint">
              Pesan akan disiapkan di WhatsApp. Anda bisa meninjaunya sebelum
              mengirim.
            </p>
          </form>
        </div>
      </section>

      <section
        className="contact-location"
        aria-labelledby="contact-location-title"
      >
        <div className="contact-location-top contact-reveal">
          <span className="contact-section-index">02 — TEMUKAN KAMI</span>
          <h2 id="contact-location-title">
            Berawal di Kartasura.
            <br />
            <em>Terhubung dengan Anda.</em>
          </h2>
        </div>
        <div className="contact-location-grid">
          <div className="contact-location-photo contact-reveal">
            <MobileOptimizedImage
              src="/images/distribution/dock-restored-v1.webp"
              alt="Area fasilitas distribusi dalam dokumentasi Tatsuo Beef"
              fill
              sizes="(max-width:760px) calc(100vw - 40px), 58vw"
            />
            <span>DI BALIK SETIAP PENGIRIMAN.</span>
          </div>
          <div className="contact-address-card contact-reveal">
            <div className="contact-address-head">
              <span>ALAMAT KAMI</span>
              <svg
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M26 13c0 8-10 16-10 16S6 21 6 13a10 10 0 1 1 20 0Z" />
                <circle cx="16" cy="13" r="3" />
              </svg>
            </div>
            <h3>
              Tatsuo Beef
              <br />
              Indonesia.
            </h3>
            <address>{company.address}</address>
            <a
              className="contact-map-link"
              href={company.maps}
              target="_blank"
              rel="noopener noreferrer"
            >
              Buka di Google Maps <Arrow diagonal />
            </a>
            <div className="contact-address-foot">
              <span>KARTASURA · SUKOHARJO</span>
              <span>57169</span>
            </div>
          </div>
        </div>
      </section>
      <section
        className="contact-social contact-reveal"
        aria-label="Media sosial Tatsuo"
      >
        <p>
          Kenal lebih dekat.
          <br />
          <em>Ikuti cerita kami.</em>
        </p>
        <div>
          <a
            href={company.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram <Arrow diagonal />
          </a>
          <a
            href={company.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
          >
            TikTok <Arrow diagonal />
          </a>
        </div>
      </section>
    </main>
  );
}
