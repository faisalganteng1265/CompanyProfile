# Page curtain navigation

`src/components/page-curtain.tsx` is mounted once in the persistent `SiteFrame`. Ordinary same-origin page links close two burgundy panels before `router.push`; the next pathname commit opens them. Document click capture preserves Link onClick handlers while preventing immediate navigation. External links, modified clicks, downloads, and same-path links/anchors are left alone. `data-no-curtain` opts a link out.

The transition uses panel translations and brand opacity, with static gradient folds and compositor hints only while active. Wheel/touch blocking is attached only during a transition. The overlay has a recovery timeout, keyboard focus moves to the destination main after reveal, and reduced-motion preference bypasses the decorative link transition. Browser history gets a short opening reveal. The landing intro is skipped when navigation arrives beneath the active curtain, avoiding two consecutive introductions.

Existing mobile menu exit runs beneath the curtain; both header and page content are inert until navigation reveal completes. No routing config or additional dependencies were added.

No localhost, browser checks, or build were run, following the established user preference. Navigation and phone performance still require device review.
