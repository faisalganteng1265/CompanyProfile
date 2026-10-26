# Tatsuo Beef — Company Profile

Website company profile multi halaman PT. Tatsuo Beef Indonesia menggunakan Next.js 16, React 19, TypeScript, Tailwind CSS 4, GSAP ScrollTrigger, dan Lenis untuk smooth scroll landing page.

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

## Halaman

- `/`: landing page dengan Lenis dan animasi GSAP.
- `/tentang`: cerita dan nilai perusahaan.
- `/produk`: katalog lengkap 25 produk dengan pencarian dan filter kategori.
- `/produk/[slug]`: detail produk dan jalur konsultasi.
- `/distribusi`: penyimpanan, alur pengadaan, dan jaringan kemitraan interaktif.
- `/kontak`: sales, lokasi, dan formulir persiapan pesan WhatsApp.
- `/sitemap.xml`: sitemap halaman dan produk.

URL WordPress lama memiliki redirect permanen ke halaman baru.

## File utama

- `src/components/landing-v2.tsx`: landing aktif versi 2, empat produk editorial, storytelling scroll, dan FAQ.
- `src/components/landing-hero.tsx`: hero asli yang dipertahankan.
- `src/components/landing-page.tsx`: kode landing versi sebelumnya.
- `src/components/site-footer.tsx`: footer global dengan CTA, produk, dan gelombang.
- `src/app/landing-v2.css` dan `src/app/footer.css`: desain landing versi 2 dan footer.
- `src/components/ambient.tsx`: partikel latar canvas.
- `src/app/globals.css`: visual, responsivitas, dan animasi CSS.
- `src/app/layout.tsx`: font lokal dan metadata.
- `public/images`: aset yang digunakan halaman.
- `docs/design-and-assets.md`: referensi, asal aset, dan catatan penyerahan.

Ini adalah frontend company profile. Formulir konsultasi menyiapkan pesan yang dapat ditinjau pengunjung sebelum membuka WhatsApp; tidak ada backend, CMS, atau penyimpanan pesanan. Harga, stok, dan jangkauan pengiriman dikonfirmasi bersama sales.

Komponen bersama: `src/components/site-frame.tsx` untuk navigasi/footer, `motion-page.tsx` untuk animasi halaman interior, `landing-scroll.tsx` untuk Lenis. Data produk ada di `src/lib/products.ts`, kontak perusahaan di `src/lib/company.ts`.
