# Tatsuo Beef — Company Profile

Redesign landing page PT. Tatsuo Beef Indonesia menggunakan Next.js 16, React 19, TypeScript, Tailwind CSS 4, dan GSAP ScrollTrigger.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Untuk produksi: `npm run build`, lalu `npm start`.

## Pemeriksaan

```bash
npm run lint
npm run format:check
npm run build
npx playwright install chromium
npm run test:e2e
```

Tes browser memakai server yang sudah berjalan. Gunakan `PLAYWRIGHT_BASE_URL` untuk URL lain. `PLAYWRIGHT_CHROMIUM_PATH` opsional untuk executable Chromium lokal.

## Fitur

- Hero dengan parallax, animasi judul, cahaya latar, dan partikel canvas.
- Reveal saat scroll, marquee, pola contour bergerak, serta animasi jalur kemitraan.
- Katalog dengan filter kategori dan native dialog berisi detail serta tautan WhatsApp produk.
- Testimoni bergilir, FAQ accordion, menu mobile, dan kontak dua sales.
- Animasi mengikuti `prefers-reduced-motion`; partikel berhenti ketika tab atau hero tidak terlihat.
- Font lokal dan gambar lokal yang dioptimalkan melalui Next.js Image.
- Prettier: `npm run format` dan `npm run format:check`.

## File utama

- `src/components/landing-page.tsx`: konten, komponen, interaksi, dan GSAP.
- `src/components/ambient.tsx`: partikel latar canvas.
- `src/app/globals.css`: visual, responsivitas, dan animasi CSS.
- `src/app/layout.tsx`: font lokal dan metadata.
- `public/images`: aset yang digunakan halaman.
- `docs/design-and-assets.md`: referensi, asal aset, dan catatan penyerahan.

Ini adalah frontend landing page. Tombol konsultasi membuka WhatsApp; tidak ada backend, CMS, atau penyimpanan pesanan.
