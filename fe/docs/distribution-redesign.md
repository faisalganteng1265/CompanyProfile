# Distribution page

`/distribusi` now presents the distribution operation through an editorial opening panorama, interactive facility chapters, a partnership process, and direct WhatsApp contact. Warm paper texture, large typography and restrained red/yellow details provide the visual direction. Responsive navigation tabs have keyboard support. Entrance animations reset on scroll and respect reduced motion; no continuous canvas, blur, parallax or video is used.

## Content and references

- Original content and all five input photographs: https://tatsuobeef.co.id/distribution/
- Logistics reference researched: United Carriers by Bearplus. Studio reference: https://www.linkedin.com/posts/bear-plus_webdesign-awwwards-fwa-activity-7502232876311187456-uJNV
- Photo-led editorial layout and logistics journey are an original implementation; no external design code or imagery is copied.

Original content identifies frozen, chilled and dry storage, warehouse handling equipment, and refrigerated logistics. No new service regions, delivery promises, temperatures, fleet counts or certification identifiers are invented. Service area and timing are confirmed through WhatsApp.

## Photo editing

Built-in imagegen EDIT mode was used with each original photograph as its edit target. The user's correction to retain the actual scenes supersedes the initial generation direction. None of the unrelated scene generations is used in the project.

Five edited photo assets are saved in `public/images/distribution/`:

- `dock-restored-v1.webp`
- `storage-restored-v1.webp`
- `handling-restored-v1.webp`
- `fleet-restored-v1.webp`
- `delivery-restored-v1.webp`

The source photographs are retained in `public/images/distribution/originals/`. Complete final prompts, source URLs, source output paths and project destinations are in `distribution-photo-edits.json`. Photo edits address exposure, color, haze and phone watermark removal. These are AI-assisted edits, not pixel-identical originals; minor reconstructed detail may differ. The images were visually compared to the original scenes before integration.

Hero uses the existing mobile image helper to cap mobile candidates at 1080px and quality 75. Other photographs use responsive Next Image sizing and lazy loading. No new dependencies were added. Sources formatted with Prettier; all five referenced edited image files were checked for presence. Browser QA and build were not run. No commit or push was performed.
