# About Tatsuo

`/tentang` replaces the Coming Soon route with an editorial company story, founding year, vision, mission, values, halal information, partner logos and WhatsApp contact.

Content source: https://tatsuobeef.co.id/about/ . The original says the company began in 2023, supplies chicken and imported/local beef, aims to grow with partners, and groups vision/mission/values into a single statement. The new presentation separates and paraphrases these ideas without inventing new company history or metrics.

Design reference: [Root Food by ET Studio](https://www.e-t.studio/works/rootfood), a chapter-based brand story with expressive photography and typography. The studio lists an Awwwards Site of the Day award. The Tatsuo implementation uses an original composition and existing project assets, not the reference site's photographs or source code.

Halal information uses the existing 196×196 `public/images/tatsuo-halal-certificate.png` without AI edits, interpolation, invented certificate numbers, recreated stamps, QR codes, or validity dates. It is an informational graphic, not a full certificate document. The user can open that original and ask sales for certificate documents via a specific WhatsApp inquiry.

The existing `story-selection-v2.webp` is illustrative product imagery, not a new photograph of company staff. Partners are the same six assets already displayed on the landing page and the legacy About page. Paper grain repeats across cream, white, red and yellow backgrounds. Animations use opacity and short translations, reset when leaving the viewport, and respect reduced motion. Mobile layouts use a single reading column and responsive image sizes.

Source files formatted with Prettier; referenced static image files checked for presence. No browser QA, server, build, automated tests, commit or push was performed.

## Scroll choreography

The current manifesto hero has staggered type entrances and a three-photo strip with scroll-linked image movement and a rotating seal. Vision words now share one staggered scrub timeline rather than a trigger per word. Mission/value rows reveal their children and draw their separator lines; halal information enters as a gently rotating document, partners appear sequentially, and the closing yellow background sweeps in from the left. Scroll effects reverse above their entrance thresholds and replay on re-entry. Mobile retains these effects with shorter translations, no pinning or blur, and the main photograph uses the existing mobile image candidate cap. Reduced-motion users see static, fully visible content. GSAP match-media contexts clean up on navigation. Formatting and diff whitespace checks completed; browser performance and build remain unverified.
