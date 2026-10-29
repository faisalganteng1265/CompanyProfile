# Mobile landing refinement

Phone styles live in `src/app/mobile.css`, limited to widths up to 760px. Landing content and footer styles are scoped to `.site-content.is-landing`; desktop and tablet rules are retained. Navbar retains the centered circle and concave side panels, with a WhatsApp action balancing the mobile menu.

Changes: stable small-viewport hero height, larger lower-left heading and touch targets, compact halal-and-heading arrangement, square two-column product photos, readable stats, a two-column stats fallback below 381px, tighter promise collage, readable scroll-stack captions, stronger editorial article hierarchy, compact CTA, smaller partner logos (136px), and a reorganized mobile footer. Existing animations, replay behavior, and reduced-motion handling remain.

No localhost, browser inspection, build, or tests were run, following the user's established workflow. Phone appearance still requires the user's review on device.
