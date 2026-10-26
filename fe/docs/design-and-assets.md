# Design & asset notes

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

### Final prompts

**Hero**

Use case: photorealistic-natural. Asset type: premium Indonesian beef distributor website hero photography. Create a wide landscape cinematic editorial photograph, 16:9. An extraordinary thick raw prime ribeye steak with authentic fine white marbling, photographed very close at a low three-quarter angle, resting on a worn dark walnut butcher board. Steak positioned on the right half and lower right, large and sculptural, edges fully in frame. Left third is deep charcoal negative space with subtle out of focus butcher workshop shadows. A few restrained sprigs of rosemary and coarse salt, no excessive props. Tactile moist fresh meat, deep natural oxblood reds, ivory marbling. Warm grazing sidelight from upper right, dramatic almost black background, exceptionally realistic luxury food magazine photography, subtle 35mm film grain. Tasteful, sophisticated, no artificial glossy plastic appearance. No text, no logos, no graphics, no hands, no people, no plated cooked food. This is a real premium product photograph, not a website mockup.

**Catalog shared prompt**

Use case: product-mockup. Asset: premium beef distributor website catalog product photograph. Square image. Photorealistic luxury butcher editorial food photography, overhead composition. Single centered product on a very dark warm charcoal slate surface, isolated by space all around. Warm natural side light, restrained coarse salt, no herbs, no plates, no utensils, no packaging. Deep natural reds, authentic texture, sophisticated subdued food photography. No text, no logo, no watermark, no borders. Subject:

**Tenderloin subject**: Three thick raw beef tenderloin meltique medallions with fine beautiful ivory marbling, arranged overlapping diagonally in center. Fresh raw beef only.

**Shortplate subject**: Beautiful thinly sliced raw beef shortplate rolled into five loose curls and arranged in a tidy fan. Natural red and creamy white layers. Fresh raw beef only.

**Chicken subject**: Two fresh raw boneless skinless chicken breast fillets arranged side by side slightly overlapping. Pale natural pink ivory chicken, immaculate fresh texture.
