# Prashant Gurung / Cybersecurity Portfolio

A static, recruiter-facing student portfolio with a dark cyan cybersecurity hero, lightweight animation, interactive terminal, education, certificate downloads, a globe and a one-page CV.

## Development

Node.js 22.12+ is required (Node 24 recommended).

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm run preview
```

Production output is `dist/`. No backend, database, runtime APIs, UI framework, CDN fonts or analytics. Assets use relative paths and work under a repository subpath.

## Publish to GitHub Pages

Pages is configured for **main /docs**. After source changes:

```sh
npm run prepare:pages
```

Commit both source and regenerated `docs/`. Do not edit generated files directly. `public/CNAME` contains `prashantgrg.com.np`; preserve existing Pages/DNS configuration. No CI workflow is included.

## Content and CV

Edit `index.html` for portfolio content. Preserve factual student-level descriptions: no employers, professional experience, graduation dates, tool proficiency or project results have been invented.

The only listed project is the actual portfolio, explicitly described as developed with AI assistance. Future security projects should be added only with real scope, evidence and links.

The one-page CV is `public/Prashant-Gurung-CV.pdf`. Edit `scripts/create-cv.py` and regenerate it with Python and ReportLab, then run `npm run prepare:pages`. Review its facts before job applications and add verified graduation dates or practical experience when available.

Original documents are unchanged in `public/certificates/`: four TryHackMe learning-path completion certificates (Pre Security, Cyber Security 101, Web Fundamentals and Jr Penetration Tester) and the Red Team Leaders CCEP certificate. These display the issued name "Prasan gurung". The website uses the requested display name "Prashant Gurung".

## Terminal sandbox

`src/ui/Terminal.ts` implements an allowlisted browser simulation. It never uses a system shell, eval, a backend or network scan. Files live in memory and reset on reload. Input and output are rendered with `textContent`.

- Profile commands: `help`, `about`, `whoami`, `education`, `skills`, `certificates`, `projects`, `contact`, `cv`.
- Virtual workspace: `pwd`, `ls`, `cat notes.txt`, `write notes.txt hello`, `rm notes.txt`, `echo hello`.
- Session controls: `history`, `clear`, `reset`.
- `scan demo` displays an explicitly fictional educational workflow. Other targets are rejected.
- Up/down arrows navigate command history; Tab completes an unambiguous command.

Portfolio files are read-only. Workspace files are limited to simple .txt names and 20 files; input is capped at 240 characters, history at 50 commands, and rendered output at 80 entries.

## Motion and accessibility

Primary settings are in `src/config/motion.ts`. The new hero uses CSS transform animations managed by `src/ui/Hero.ts`; animations pause when hidden/offscreen and have a visible pause button. OS reduced motion disables them. The original high-cost snow, pointer parallax and intro remain off.

`ScrollJourney` owns the shared JavaScript frame scheduler with cached section measurements. The globe has simplified continent silhouettes and redraws only during interaction or settling inertia; it stops offscreen and caps device pixel ratio at 1.5. It is decorative, not a navigation map.

The statement heading, shield and copy occupy separate rows to avoid obscured text. No-JS content remains readable, with native accordions and a static globe fallback. Semantic headings, a skip link, visible focus, a mobile menu focus trap and keyboard controls are included.

## Stack and assets

Strict TypeScript, Vite, vanilla CSS, inline SVG and Canvas 2D. Anton 400, Syne 500/600 and JetBrains Mono 400 are bundled locally with Latin subsets. Font licenses are in `public/font-licenses/`. All visual artwork is code-generated; the supplied design reference is inspiration, not a copied screenshot asset.

## Validation

TypeScript and production build pass. Terminal checks cover supported commands, immutable profile files, invalid paths, literal HTML handling, external scan rejection, history caps and reset. Internal anchors and file downloads resolve. The CV is one page.

Browser visual QA is unavailable in this environment. Review the deployed page at desktop/mobile sizes and test keyboard navigation before treating it as visually signed off.
