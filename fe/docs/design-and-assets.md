# Design & asset notes

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

Carousel looping ditempatkan tepat sebelum FAQ pada landing page. Dua grup identik membentuk perulangan tanpa jeda. Animasi berhenti saat di-hover, dijeda melalui tombol, atau berada di luar viewport. Reduced motion menampilkan grid statis dan menyembunyikan grup duplikat dari tampilan serta pembaca layar.

Logo diunduh dari bagian Our Partners situs Tatsuo, bukan digambar ulang atau dibuat secara generatif. Berkas lokal di `public/images/partners` dikonversi ke WebP dengan desain logo tetap utuh.

- Kanzler: `kanzler.webp`, sumber `https://tatsuobeef.co.id/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-02-at-09.30.19.jpeg`.
- Mie Gacoan: `mie-gacoan.webp`, sumber `https://tatsuobeef.co.id/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-02-at-09.33.19-1.jpeg`.
- Waroeng SS: `waroeng-ss.webp`, sumber `https://tatsuobeef.co.id/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-02-at-09.33.19-2.jpeg`.
- Dkriuk: `dkriuk.webp`, sumber `https://tatsuobeef.co.id/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-02-at-09.31.29.jpeg`.
- Steak Moen-Moen: `steak-moen-moen.webp`, sumber `https://tatsuobeef.co.id/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-02-at-09.30.18.jpeg`.
- Bale Bebakaran: `bale-bebakaran.webp`, sumber `https://tatsuobeef.co.id/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-02-at-09.33.19.jpeg`.

Perbaikan warning Next Image pada landing menambahkan posisi dan rasio/tinggi awal pada pembungkus gambar fill. Foto Selected memakai loading eager sesuai laporan LCP pengguna. Tidak menjalankan localhost, build, atau tes untuk perubahan ini.
