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
