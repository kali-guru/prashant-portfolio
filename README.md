# Prashant Gurung / ALTITUDE

A static cybersecurity student portfolio: a night-glacier window opens into sky, followed by a profile, learning focus, future project spaces, original certificates, a Kathmandu globe and contact details.

## Run locally

Requires Node.js 22.12+ (Node 24 recommended).

```sh
npm ci
npm run dev
```

```sh
npm run typecheck
npm run build
npm run preview
```

`dist/` is the complete production site. Upload its contents to any static host. Vite uses relative asset paths, so the output also supports a repository subpath. No backend, database, framework, analytics, tracking, CDN or runtime API requests are used. Outbound profile and contact links navigate only when selected.

## GitHub Pages

A ready-to-serve copy is committed in `docs/`. No Actions workflow is required.

1. In this repository, open **Settings > Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select **main**, folder **/docs**, and save.
4. For the supplied custom domain, set **prashantgrg.com.np** in Pages and configure its DNS for GitHub Pages. The provided CNAME contains this domain. Enable HTTPS after GitHub validates the domain and issues a certificate.

Repository files cannot turn on Pages or change external DNS. Do not assume the domain is live until the Pages settings and DNS have been configured. Follow GitHub's current custom-domain documentation for DNS values: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

If serving only at the default repository URL, remove `public/CNAME`, update canonical/Open Graph domain metadata if desired, then regenerate `docs/`.

After any source change:

```sh
npm run prepare:pages
```

Commit both the source and regenerated `docs/`. Do not edit generated assets directly. The default base is `./`; change `base` in `vite.config.ts` only if your host needs a fixed base path.

## Content and original documents

Content is in `index.html`, deliberately rendered in HTML so it remains readable with JavaScript disabled. The biography is based on supplied identity, location and education. Learning interests are described as study areas, not professional experience.

Original, unchanged PDFs are in `public/certificates/`:

- Pre Security, TryHackMe, 30 April 2025
- Cyber Security 101, TryHackMe, 13 May 2025
- Web Fundamentals, TryHackMe, 14 May 2025
- Jr Penetration Tester, TryHackMe, 15 May 2025
- Certified Cybersecurity Educator Professional (CCEP), Red Team Leaders, 24 December 2025

These files display "Prasan gurung" as issued. The website uses the owner's requested display name "Prashant Gurung". The four TryHackMe documents are learning-path completion certificates and are identified as such. Stats count the supplied documents; they do not claim work experience or client results.

### Placeholder checklist

- Replace the three explicitly labeled future project slots with real titles, years, scope, descriptions and destination links.
- Replace procedural project visuals with owned screenshots when those projects exist. Add meaningful alt text if they convey project content.
- Update each matching archive row and remove its placeholder label only when the project is real.
- Add a CV PDF and download link when a CV is available. No missing or invented CV link is rendered.
- Add verified tools, languages or availability only when supplied; no invented values are included.

The position statement and supporting copy are editorial drafts approved by the owner's request to choose remaining content. No employers, client counts, results, project implementations or location history are invented.

## Motion controls

All primary motion controls are in `src/config/motion.ts`. Easing and duration tokens are mirrored into CSS custom properties at startup.

| Group | Controls |
| --- | --- |
| `intensity` | `full`, `medium` or `subtle` |
| `intro` | Enabled state, 1200ms counter, 900ms curtain |
| `hero` | Desktop/mobile/subtle tracks, zoom scale, name/frame/fog/flash progress ranges |
| `statement` | Track length, word entry and shield rise ranges |
| `slabs` | Track length, entry range, title delay |
| `archive` | Drum smoothing, opacity/scale falloff, offset and blur |
| `manifesto` | Track length, line thresholds and reveal range |
| `scroll` | Progress smoothing and settling threshold |
| `scramble`, `counter` | Scramble charset/timing and number duration |
| `snow` | Enable, count, min/max speed |
| `pointer` | Enable, smoothing, frame tilt and magnetic-link distance |
| `globe` | Rotation speed, initial boost, inertia, resume delay, pixel ratio and pulse |
| `altitude` | Enable and 8848m scale |

Fine visual distances and idle keyframe timings live in `src/styles.css`. The shared `ScrollJourney` owns one requestAnimationFrame scheduler. Scroll events only mark progress dirty. Section geometry is measured on resize, not in the frame loop. Intersection observers limit work; canvas rendering pauses offscreen and when the document is hidden. Canvas point/particle buffers are preallocated. The globe is decorative and intentionally has only one real location marker, Kathmandu.

Native scrolling, real anchor links and native details accordions remain usable without JS. Mobile removes the pinned project slabs and archive drum and disables desktop pointer and snow effects. OS reduced motion removes the intro, long scroll tracks, parallax, particles, counters, scramble and automatic globe rotation. Keyboard globe controls remain available. Updating the OS preference reloads the document to reset the animation lifecycle.

The foreground contrast crossover uses relative luminance **0.179**, rather than the original brief's 0.5, because 0.5 would not maintain WCAG AA for white text on intermediate colors. Content sections and the fixed navigation also use explicit readable foreground/background pairs.

## Stack and assets

- TypeScript strict mode, Vite, vanilla CSS, canvas 2D and inline SVG
- Self-hosted Latin subsets: Anton 400, Syne 500/600, JetBrains Mono 400
- Body type uses the operating system sans-serif stack
- Procedural mountain geometry, gradients, fog, shield and project art; no stock photography
- Font licenses are distributed with their `@fontsource` packages in `node_modules`

## Validation

`npm run typecheck` and `npm run build` pass. Local structural checks cover unique IDs, internal targets, document links, no missing public assets, and unchanged certificate bytes. Browser visual QA was unavailable in the build session; review desktop/mobile layout, keyboard behavior and motion in your browser before treating the design as visually signed off.
