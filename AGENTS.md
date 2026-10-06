# Portfolio implementation rules

## Owner and content integrity

This portfolio belongs to Prashant Gurung, an Ethical Hacking and Cybersecurity student at Softwarica College of IT & E-commerce in Kathmandu, Nepal. Preserve supplied contact links and original certificate files. Certificates use the issued name "Prasan gurung"; do not edit those documents. Never replace placeholders with invented projects, employers, credentials, stats, tools or experience. Future project slots must remain visibly marked until factual replacements are supplied.

## Stack and concept

Use strict TypeScript, Vite and vanilla CSS. Fully static, no backend/database/runtime API calls. No UI/CSS/animation frameworks or Three.js. ALTITUDE is a continuous visual climb: night glacier, cloud break, pale sky, dusk project slabs, taupe archive, dark credentials and fog, Kathmandu globe, cropped footer.

## Design tokens

- Anton 400: heavy uppercase hero, slab titles, giant numerals, manifesto and footer.
- Syne 500/600: calm statements, headings and accordions.
- JetBrains Mono 400: bracketed uppercase functional labels and tabular figures.
- System sans-serif: body copy.
- Self-host only open-source font packages and required Latin weights. No CDN fonts.
- Palette: #0B0D10 ground, #0F1B2D navy, #1A1D21 charcoal, #12303A teal, #2B3A4A steel, #F3F5F6 cloud, #BFD9EA sky, #4C9BD6 blue, #9FD3FF accent.
- No neon, purple, saturated reds/greens, stock photographs, badges or copyright text. Do not introduce the em dash character into code, comments, copy or docs.
- Motion tokens: `src/config/motion.ts`, mirrored CSS easings/durations. UI (.4,0,.2,1), reveal (.16,1,.3,1), in-cubic (.32,0,.67,0), heavy (.22,1,.36,1), expo-out (.19,1,.22,1). Durations 300/600/1000/1400ms.

## Performance and accessibility

Native scroll only. Use the shared ScrollJourney scheduler; do not add independent animation loops. Cache dimensions outside animation frames. Reuse typed canvas buffers and avoid transient objects/arrays in hot loops. Pause rendering offscreen/hidden. Use transform/opacity for motion, with clip-path masks and native accordion transitions where needed. Do not animate layout dimensions, shadows or whole-page blur. Keep `will-change` limited to active sections.

Preserve no-JS readable HTML, semantic headings, visible focus, skip link, mobile menu focus management, keyboard globe/archive behavior, adequate contrast and reduced-motion support. Use relative luminance 0.179 for a black/white contrast crossover; 0.5 is not AA-safe. Never infer a second location history marker.

## Workflow

Run `npm run typecheck` and `npm run build` after substantive changes. Do not add test frameworks for cosmetic changes. Run `npm run prepare:pages` to regenerate tracked `docs/` for GitHub Pages. Do not hand-edit generated assets. No CI workflow by default. Do not change DNS, repository access or credentials as part of source edits. README documents hosting and content replacement.
