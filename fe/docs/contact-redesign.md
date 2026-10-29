# Hubungi Kami

The `/kontak` route replaces Coming Soon with a large editorial greeting, direct sales contacts, a WhatsApp message composer, a photographic location/address section and social links. Uses the existing Tatsuo palette, fonts and paper texture. Layout stacks on phones, with 16px form inputs and reduced-motion support. GSAP entrance/scroll effects reverse on scrolling above their thresholds and clean up on navigation.

## References consulted

- https://koto.com/ — explicit direct-contact channels, studio addresses and Maps links informed the clear contact hierarchy. Public page content was reviewed; live animation playback was not available.
- https://locomotive.ca/en/contact — conversational contact entry point; fetched content was limited, so no exact visual or motion replication is claimed.
- https://www.auw.studio/ — concise collaboration invitation informed the plain-language opening.

This is an original Tatsuo composition; no reference code or images were copied. No claims of response times, opening hours or extra office locations were added.

All phone numbers, email, street address, Maps URL and social links come from `src/lib/company.ts`. The photograph reuses existing original-based distribution documentation. No generated office or invented map is shown.

The composer uses a native GET form to `https://wa.me/{selectedSalesNumber}` with one hidden `text` field, preparing a user-reviewable message. It does not send WhatsApp messages, store submissions, call a backend or claim successful delivery. The user's name is required; business name, city and notes are optional. Direct phone, WhatsApp, email, Maps and social links remain available independently.

Page metadata and sitemap now include the live contact page. Prettier, TypeScript syntax transpilation and static asset existence checks completed. Full type-check, build, browser QA and real-device performance checks were not run. No messages were sent and no commit or push was performed.
