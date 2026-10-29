# Tatsuo product selection

The `/produk` catalog replaces its Coming Soon page with a full, searchable collection of 25 products. Each card links to a product detail with menu suggestions and a product-specific WhatsApp inquiry. Prices, weights, certifications, and origins are not invented. Image captions identify illustrative photography.

## Design references

- [Mate Libre — Locomotive](https://locomotive.ca/en/work/mate-libre): an awarded product site; reference for confident type, deliberate color and prominent product photography. The studio records Awwwards Site of the Day and Developer Award for this project.
- [re_grocery](https://regrocery.co/): reference for a calm, browsable product collection.
- [Victor Churchill](https://victorchurchill.com/): reference for editorial butcher photography and restrained premium presentation.
- [Original Tatsuo collection](https://tatsuobeef.co.id/product/): product names and collection scope.

The implementation adapts these principles to the existing Tatsuo typefaces, red, warm cream and yellow. It does not copy another site's assets or code.

## Assets

Eight existing product photos are retained. Seventeen additional AI-generated product illustrations are saved as square 1000px WebP files in `public/images/catalog/`. Every individual generation prompt and original source path is recorded in `product-photo-manifest.json`; each output file uses the manifest slug as its filename. These are illustrative assets, not photographs of actual supplied stock. Replace with verified supplier photography when available.

## Interaction and responsiveness

- Category buttons show collection counts; search matches names, category, kind and suggested menus.
- Desktop has a three-column grid with an opening feature spanning two columns. Tablet has two columns; phones have one large card per row.
- Product card entrances use only opacity and a short vertical translation; they reset when leaving the viewport and respect reduced motion.
- Product detail route data is read inside a Suspense boundary for Next instant navigation.
- No new dependency, server, browser session, automated test, commit or push was run for this change. Assets were checked for file presence and source files formatted with Prettier.
