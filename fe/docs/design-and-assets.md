# Design & asset notes

## Landing page versi 2 — The Good Cut

Hero asli dipertahankan sesuai arahan terakhir pengguna. Markup dan animasinya dipisahkan ke `src/components/landing-hero.tsx`. Komposisi hero baru yang sempat direncanakan tidak diterapkan; aset cutout sapi dipakai pada footer.

Landing aktif memakai `src/components/landing-v2.tsx` dan `src/app/landing-v2.css`. Komponen `landing-page.tsx` tetap disimpan sebagai versi sebelumnya. Halaman lain dan Lenis tetap tersedia.

### Referensi desain

- Referensi screenshot Fall Favorites dari pengguna: empat foto landscape sejajar, kategori kecil, judul serif besar, serta tautan detail di atas garis tipis. Empat pilihan Tatsuo: Buntut Sapi, Tenderloin Meltique, Shortplate Beef, Boneless Dada Ayam.
- https://www.eathungrytiger.com/ dan https://artemiilebedev.com/work/hungry-tiger: pendekatan objek fotografis, interaksi, dan storytelling brand pangan. Tidak menyalin aset atau kode referensi.
- https://arianatorres.com/papito/: identitas butcher kontemporer, label merah, dan bahasa visual cetak. Tidak menyalin logo/brand referensi.
- Screenshot footer FreshBox desktop dan mobile dari pengguna: CTA dengan produk di sisi kiri-kanan, transisi gelombang menuju footer merah, dan kolom navigasi. Disesuaikan dengan identitas Tatsuo serta font yang sudah dipilih.

### Gerak dan struktur

- Hero asli dan Lenis dipertahankan.
- Empat kartu produk editorial terhubung ke detail produk, tanpa kotak dekoratif.
- Section fotografi memakai reveal diagonal dengan GSAP ScrollTrigger, dipin khusus desktop; mobile memakai parallax tanpa pin.
- Copy cerita brand mendapat penekanan warna saat scroll.
- Enam indikator Why Choose Us tetap tersedia dengan komposisi baru.
- Carousel partner putih, logo besar dan rapat, tetap sebelum FAQ.
- Footer global memakai potongan foto transparan, latar garis bergerak, wave di desktop, dan transisi angular untuk mobile. Tidak memakai badge Framer atau link legal yang belum tersedia.
- Semua animasi tambahan menghormati reduced motion. Perubahan ini hanya ditulis dan diformat; tidak menjalankan localhost, build, tes, commit, atau push.

### Aset generatif tambahan

**Beef cutout / footer**

Mode: built-in imagegen. Aset lokal: `public/images/hero-good-cut-v2.webp`. Transparansi dipertahankan saat konversi WebP. Ilustrasi fotografis, bukan dokumentasi stok aktual.

Use case: product-mockup. Asset type: transparent photographic cutout for a luxury butcher website hero. Create an exceptionally photorealistic studio food photograph of two thick prime raw beef ribeye steaks, one slightly behind and overlapping the other in a natural diagonal arrangement. Three-quarter overhead camera angle, not fully top down, so the thickness and sculptural shape of the steaks is visible. The front steak has remarkable authentic ivory fat marbling through deep natural burgundy red meat, with a subtle creamy fat cap; the rear steak supports the composition. Entire steaks completely in frame with generous transparent padding around all edges. Beautiful soft warm directional studio light from upper left, subtle realistic moisture, fine natural organic meat texture, sophisticated restrained contrast. A clean high-end commercial food photograph, extraordinary detail, not CGI, not plastic, not exaggerated white marbling. Isolated on a genuinely transparent background. No board, no plate, no surface, no props, no herbs, no salt, no hands, no packaging, no text, no logos, no frame. Preserve a natural subtle contact shadow between the two overlapping steaks, but no hard rectangular background. Landscape composition with the steaks forming a strong irregular sculptural silhouette suitable to layer over large editorial typography.

**Chicken cutout / footer**

Mode: built-in imagegen. Aset lokal: `public/images/footer-chicken-v2.webp`. Transparansi dipertahankan saat konversi WebP. Ilustrasi fotografis, bukan dokumentasi stok aktual.

Use case: product-mockup. Asset type: transparent photographic cutout for the corner of a premium meat supplier website footer. Two beautiful fresh raw boneless skinless chicken breast fillets placed together in a compact natural overlapping diagonal arrangement, photographed from a three-quarter overhead angle. Immaculate authentic pale natural peach-pink ivory chicken texture, subtle realistic moisture, not glossy plastic. Soft warm directional studio light, exceptionally photorealistic commercial food photography, no CGI. Entire fillets fully in frame with generous clear transparent padding around the edges. Isolate on a genuinely transparent background. No plate, no board, no props, no herbs, no salt, no utensils, no hands, no text, no logo, no watermark, no opaque rectangular background. Landscape composition. Preserve natural subtle shading between the fillets only.

## Pengembangan multi halaman

- `/tentang`: cerita perusahaan, manifesto, nilai, dan jalur ke katalog/kontak.
- `/produk`: pencarian dan filter 25 produk dari katalog lama, lima foto pilihan, serta indeks produk lengkap.
- `/produk/[slug]`: detail seluruh 25 produk, kegunaan umum, produk terkait, dan konsultasi. Produk tanpa foto memakai komposisi tipografis kategori agar tidak menampilkan foto potongan yang keliru.
- `/distribusi`: jaringan kemitraan interaktif, informasi penyimpanan, alur pengadaan, dan pertanyaan lokasi pengiriman. Visual jaringan bukan peta cakupan layanan.
- `/kontak`: kontak sales, lokasi, dan formulir yang menyiapkan pesan WhatsApp untuk ditinjau sebelum pengunjung mengirimnya.
- URL WordPress `/about`, `/product`, `/distribution`, dan `/elementor-134` dialihkan permanen ke halaman baru. Sitemap mencakup halaman utama dan detail produk.

Referensi konten tambahan: https://tatsuobeef.co.id/about/, https://tatsuobeef.co.id/product/, https://tatsuobeef.co.id/distribution/, https://tatsuobeef.co.id/elementor-134/. Nama 25 produk mengikuti katalog lama. Deskripsi kegunaan merupakan copy editorial umum dan tidak menetapkan grade, berat, spesifikasi stok, harga, jangkauan pengiriman, atau sertifikasi baru.

### Lenis

Lenis aktif khusus `/`, menggunakan ticker GSAP dan `ScrollTrigger.update`. Touch scrolling tetap native, reduced motion menonaktifkan Lenis, dan modal/menu menghentikan scroll latar. Instance, observer, listener, dan ticker dibersihkan saat navigasi meninggalkan landing page.

## Tambahan aset katalog

### Product oxtail

Aset: `public/images/product-oxtail.webp`. Mode: built-in imagegen. Foto ilustrasi, bukan dokumentasi inventaris klien.

Use case: product-mockup. Asset: premium Indonesian meat distributor website product editorial photograph. Square composition, exceptionally realistic luxury food magazine photography. Product centered with generous space around it on a very dark warm charcoal slate, overhead photograph. Warm soft directional light, subtle organic texture, immaculate ingredients. No packaging, no plates, no garnish, no herbs, no logos, no text, no watermark. Rich but natural colors, not glossy or plastic. Subject: Several raw beef oxtail center-cut segments, authentic round irregular cross sections of deep red meat and a clearly visible central ivory bone with thin surrounding fat. Arranged together naturally in a tidy diagonal group. Beef oxtail only, not steak medallions.

### Product salmon

Aset: `public/images/product-salmon.webp`. Mode: built-in imagegen. Foto ilustrasi, bukan dokumentasi inventaris klien.

Use case: product-mockup. Asset: premium Indonesian meat distributor website product editorial photograph. Square composition, exceptionally realistic luxury food magazine photography. Product centered with generous space around it on a very dark warm charcoal slate, overhead photograph. Warm soft directional light, subtle organic texture, immaculate ingredients. No packaging, no plates, no garnish, no herbs, no logos, no text, no watermark. Rich but natural colors, not glossy or plastic. Subject: One thick fresh raw salmon fillet with orange-pink flesh, delicate white fat lines, and a thin silver skin edge, alongside a single smaller fillet portion. Simple diagonal arrangement. Fresh salmon only.

## Arah visual

Editorial butcher / premium food partner. Merah brand asli `#DA292A` dipadukan dengan oxblood `#AC252B`, ivory `#F4F0E7`, dan charcoal `#191B17`. Layout memakai garis tipis, fotografi besar, tipografi serif, dan jarak antarelemen yang lapang.

## Referensi

- https://victorchurchill.com/ — referensi tipografi sesuai permintaan pengguna. CSS aktual memetakan Trajan Pro 3 untuk h1, Antwerp untuk heading editorial, Sweet Sans Pro untuk body dan tombol.
- https://www.behance.net/gallery/182207589/Mr-Meat-Master — studi kasus interaksi produk dan GSAP untuk bisnis daging premium.
- https://www.isabelsanchez-design.com/portfolio-art-director-designer-isabel-sanchez-murillo/ux/ui — studi kasus rebranding dan web Cárnicas Luismi.
- https://tatsuobeef.co.id/ — sumber identitas, nama perusahaan, tahun berdiri, produk, deskripsi bisnis, kontak, alamat, dan kutipan testimoni. Kutipan dipersingkat dari konten situs; tidak menambahkan jumlah pelanggan, persentase kepuasan, atau klaim sertifikasi baru.

## Font

Berkas referensi disimpan di `src/app/fonts`, diambil dari aset publik CDN Victor Churchill:

- `TrajanPro3-Regular.woff2`
- `Antwerp-Regular.woff2`
- `SweetSansProRegular.woff`

Font komersial ini mengikuti pilihan pengguna untuk menyamai referensi. Lisensi webfont yang sesuai perlu tersedia sebelum redistribusi/publikasi produksi. Berkas font lokal dapat diganti tanpa mengubah layout, melalui `src/app/layout.tsx`.

## Gambar asli

- `public/images/logo-original.jpg`: logo Tatsuo dari `https://tatsuobeef.co.id/wp-content/uploads/2025/11/IMG_1185-1.jpg`.
- `public/images/ribeye.jpg`: foto editorial dari `https://tatsuobeef.co.id/wp-content/uploads/2025/11/ribeye-and-meat-cleaver-1.jpg`.

## Gambar generatif

Dibuat dengan built-in imagegen, kemudian dikonversi ke WebP untuk web. Gambar ini merupakan ilustrasi produk, bukan dokumentasi stok aktual. Ganti dengan foto produk terverifikasi milik klien apabila tersedia.

- `public/images/hero.webp`
- `public/images/product-tenderloin.webp`
- `public/images/product-shortplate.webp`
- `public/images/product-chicken.webp`
- `public/images/story-selection-v2.webp`: pengganti foto editorial bagian Selected; adegan butcher memilih ribeye. Dibuat dengan built-in imagegen, bersifat ilustratif.

### Final prompts

**Story / Selected, revisi 2**

Use case: photorealistic-natural. Asset type: portrait editorial photograph for the craftsmanship section of a luxury Indonesian beef supplier website. Create an exceptionally realistic high-end food magazine photograph in portrait 4:5 composition. Scene: a professional butcher in a dark charcoal apron, cropped tightly from chest down so no face is visible, carefully selecting a substantial fresh raw beef ribeye loin on a rich dark end-grain walnut butcher block. Only one hand wearing a clean fitted black nitrile glove gently rests on the top of the loin at the upper right; anatomically correct hand and five fingers. The hero subject is the beautifully detailed deep burgundy red cut face of the beef, with authentic delicate ivory marbling, facing toward the camera in the middle of the photograph. One thick steak cut from the loin sits naturally in front of it. Shoot close at a low three-quarter angle with shallow depth of field, genuine organic meat texture and subtle moisture, no excessive gloss. Warm directional window light from upper left, dramatic but natural soft shadows, charcoal and oxblood palette with ivory highlights. Quiet, confident artisanal atmosphere with very subtle film texture, premium European butcher brand photography. Leave the bottom quarter predominantly as dark shadowed walnut surface for ivory typography to overlay. The composition must remain compelling when cropped to square; keep the beef fully in the central two thirds. No knives or cleavers, no herbs, no scattered salt, no plates, no packaging, no logos, no text, no watermark, no border, no CGI or plastic food appearance. This is a photograph, not a layout or mockup.

**Hero**

Use case: photorealistic-natural. Asset type: premium Indonesian beef distributor website hero photography. Create a wide landscape cinematic editorial photograph, 16:9. An extraordinary thick raw prime ribeye steak with authentic fine white marbling, photographed very close at a low three-quarter angle, resting on a worn dark walnut butcher board. Steak positioned on the right half and lower right, large and sculptural, edges fully in frame. Left third is deep charcoal negative space with subtle out of focus butcher workshop shadows. A few restrained sprigs of rosemary and coarse salt, no excessive props. Tactile moist fresh meat, deep natural oxblood reds, ivory marbling. Warm grazing sidelight from upper right, dramatic almost black background, exceptionally realistic luxury food magazine photography, subtle 35mm film grain. Tasteful, sophisticated, no artificial glossy plastic appearance. No text, no logos, no graphics, no hands, no people, no plated cooked food. This is a real premium product photograph, not a website mockup.

**Catalog shared prompt**

Use case: product-mockup. Asset: premium beef distributor website catalog product photograph. Square image. Photorealistic luxury butcher editorial food photography, overhead composition. Single centered product on a very dark warm charcoal slate surface, isolated by space all around. Warm natural side light, restrained coarse salt, no herbs, no plates, no utensils, no packaging. Deep natural reds, authentic texture, sophisticated subdued food photography. No text, no logo, no watermark, no borders. Subject:

**Tenderloin subject**: Three thick raw beef tenderloin meltique medallions with fine beautiful ivory marbling, arranged overlapping diagonally in center. Fresh raw beef only.

**Shortplate subject**: Beautiful thinly sliced raw beef shortplate rolled into five loose curls and arranged in a tidy fan. Natural red and creamy white layers. Fresh raw beef only.

**Chicken subject**: Two fresh raw boneless skinless chicken breast fillets arranged side by side slightly overlapping. Pale natural pink ivory chicken, immaculate fresh texture.

## Penyesuaian section landing

Section alur kemitraan “Dari percakapan pertama, ke kemitraan berikutnya” dihapus sesuai permintaan pengguna. Alur pengadaan tetap tersedia pada halaman Distribusi.

Section tersendiri “Why Choose Us” ditambahkan dengan enam indikator dari konten lama/screenshot pengguna: kualitas mutu tinggi 99%, kepuasan klien 98%, pelayanan terbaik 97%, delivery on time 95%, harga bersaing 95%, komitmen dan integritas 95%. Angka mengikuti materi klien, bukan hasil pengukuran baru. Animasi meliputi angka, garis indikator, parallax foto latar, dan contour.

Setelah permintaan pengguna untuk berfokus pada penulisan kode, perubahan section terakhir tidak menjalani pemeriksaan browser, build, atau tes tambahan.

## Logo partner dan carousel

Carousel looping ditempatkan tepat sebelum FAQ pada landing page. Dua grup identik membentuk perulangan tanpa jeda. Animasi berhenti saat di-hover atau berada di luar viewport. Tombol pause dan bingkai/kotak tiap logo dihapus sesuai permintaan pengguna; carousel hanya menampilkan logo tanpa caption per gambar. Reduced motion menampilkan grid statis dan menyembunyikan grup duplikat dari tampilan serta pembaca layar.

Logo diunduh dari bagian Our Partners situs Tatsuo, bukan digambar ulang atau dibuat secara generatif. Berkas lokal di `public/images/partners` dikonversi ke WebP dengan desain logo tetap utuh.

- Kanzler: `kanzler.webp`, sumber `https://tatsuobeef.co.id/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-02-at-09.30.19.jpeg`.
- Mie Gacoan: `mie-gacoan.webp`, sumber `https://tatsuobeef.co.id/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-02-at-09.33.19-1.jpeg`.
- Waroeng SS: `waroeng-ss.webp`, sumber `https://tatsuobeef.co.id/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-02-at-09.33.19-2.jpeg`.
- Dkriuk: `dkriuk.webp`, sumber `https://tatsuobeef.co.id/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-02-at-09.31.29.jpeg`.
- Steak Moen-Moen: `steak-moen-moen.webp`, sumber `https://tatsuobeef.co.id/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-02-at-09.30.18.jpeg`.
- Bale Bebakaran: `bale-bebakaran.webp`, sumber `https://tatsuobeef.co.id/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-02-at-09.33.19.jpeg`.

Perbaikan warning Next Image pada landing menambahkan posisi dan rasio/tinggi awal pada pembungkus gambar fill. Foto Selected memakai loading eager sesuai laporan LCP pengguna. Tidak menjalankan localhost, build, atau tes untuk perubahan ini.

### Butcher label icon

Asset: `public/images/butcher-cleavers-v1.png`. Generated with the built-in imagegen tool, transparent background, used in the hanging experience label. Original alpha preserved.

Prompt: Use case: logo-brand. Asset type: small premium butcher emblem for a red website hanging label. Create exactly two traditional butcher meat cleavers crossed diagonally in a balanced X, wide rectangular blades at upper left and upper right, slender riveted handles pointing downward left and right. Beautiful confident artisan butcher shop mark, refined silhouette, subtly rounded blade corners, small circular hanging hole in each blade and two simple handle rivet cutouts. Flat solid warm ivory #fffaf2 shapes, transparent negative-space details. Consistent elegant proportions, unmistakably actual meat cleavers, crisp clean edges readable at 64px. Centered single isolated emblem occupies 85% of square canvas. Truly transparent background. No text, no letters, no badge border, no shadows, no gradients, no mockup, no extra objects.
