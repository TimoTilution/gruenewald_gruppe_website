# UI change verification

For every change that affects layout, styling, images, logos, headers, or responsive behavior:

1. Run the production build.
2. Never run `next build` while the development server is active: both processes write to `.next` and can produce stale or mixed browser bundles. Stop the dev server before building, then restart it after the build.
3. Start the local application and load every affected route in the in-app browser.
4. Wait for document readiness, fonts, and all above-the-fold images to finish decoding before judging the result.
5. Visually inspect at least desktop (1280 x 720) and mobile (390 x 844).
6. Check that `document.documentElement.scrollWidth` does not exceed the viewport width.
7. Check image natural and rendered dimensions. Logos must use their real intrinsic aspect ratio with `object-fit: contain`; photographic hero/card images must use a fixed container with `object-fit: cover`.
8. Do not report completion based only on TypeScript or build success.

Prefer `next/image` with explicit `width` and `height`, or `fill` plus a dimensioned parent. Above-the-fold hero images must use `priority` and an accurate `sizes` value. Avoid CSS background images for critical above-the-fold content.
