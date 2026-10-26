"use client";
import { useState } from "react";
import { Arrow } from "./icons";
import { whatsapp } from "@/lib/company";

export function DistributionNetwork() {
  const [active, setActive] = useState(0);
  const nodes = [
    {
      title: "Restoran & café",
      text: "Pilihan bahan untuk menu andalan dan kebutuhan dapur harian.",
      x: "75%",
      y: "22%",
    },
    {
      title: "Hotel & hospitality",
      text: "Diskusikan spesifikasi bahan dan pola pengadaan untuk kebutuhan operasional Anda.",
      x: "82%",
      y: "68%",
    },
    {
      title: "Katering & food service",
      text: "Rencanakan kebutuhan bahan untuk acara dan jadwal produksi berikutnya.",
      x: "21%",
      y: "77%",
    },
  ];
  return (
    <div className="network-scene">
      <div className="network-map">
        <div className="network-orbit orbit-one" />
        <div className="network-orbit orbit-two" />
        <svg viewBox="0 0 600 500" fill="none" aria-hidden="true">
          <g stroke="currentColor" opacity=".16">
            {[80, 125, 170, 215, 260].map((r) => (
              <circle key={r} cx="280" cy="260" r={r} />
            ))}
            <path d="M0 260h600M280 0v500" />
          </g>
          <g stroke="currentColor" strokeWidth="1.5">
            <path className="motion-route" d="M280 260Q300 65 450 110" />
            <path className="motion-route" d="M280 260Q430 180 492 340" />
            <path className="motion-route" d="M280 260Q270 425 126 385" />
          </g>
          <g
            className="network-signal"
            stroke="currentColor"
            strokeDasharray="4 14"
          >
            <path d="M280 260Q300 65 450 110" />
            <path d="M280 260Q430 180 492 340" />
            <path d="M280 260Q270 425 126 385" />
          </g>
          <circle cx="280" cy="260" r="10" fill="currentColor" />
          <circle
            className="map-pulse network-origin-pulse"
            cx="280"
            cy="260"
            r="25"
            stroke="currentColor"
          />
        </svg>
        <div className="network-origin">
          <span>SOLO</span>
          <small>OUR STARTING POINT</small>
        </div>
        {nodes.map((node, i) => (
          <button
            key={node.title}
            className={`network-node ${active === i ? "active" : ""}`}
            style={{ left: node.x, top: node.y }}
            onClick={() => setActive(i)}
            aria-label={node.title}
            aria-pressed={active === i}
          >
            <span />
            <small>0{i + 1}</small>
          </button>
        ))}
      </div>
      <div className="network-tooltip" aria-live="polite">
        <span className="eyebrow">YOUR BUSINESS, OUR PARTNERSHIP</span>
        <h3>{nodes[active].title}</h3>
        <p>{nodes[active].text}</p>
      </div>
      <span className="network-note">
        VISUALISASI KEMITRAAN · BUKAN PETA JANGKAUAN
      </span>
    </div>
  );
}
export function DeliveryInquiry() {
  const [city, setCity] = useState("");
  return (
    <form className="delivery-inquiry" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="delivery-city">Di mana lokasi usaha Anda?</label>
      <div>
        <input
          id="delivery-city"
          placeholder="Kota / kabupaten Anda"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          maxLength={100}
        />
        <a
          className={`button button-red ${!city.trim() ? "is-disabled" : ""}`}
          aria-disabled={!city.trim()}
          href={
            city.trim()
              ? whatsapp(
                  `Halo Tatsuo Beef, apakah pengiriman dapat dilakukan ke ${city.trim()}? Saya ingin mengetahui jangkauan, jadwal, dan biayanya.`,
                )
              : undefined
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          Tanyakan pengiriman <Arrow diagonal />
        </a>
      </div>
      <p>
        Tim kami akan mengonfirmasi jangkauan, jadwal, dan biaya untuk lokasi
        Anda melalui WhatsApp.
      </p>
    </form>
  );
}
