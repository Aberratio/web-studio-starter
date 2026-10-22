# web-studio-starter

Template for a new client website: Next.js (App Router) + TypeScript, with [`web-studio-kit`](https://github.com/aberratio/web-studio-kit) wired in and ready to deploy on Vercel.

## What you get

- **Languages**: every page lives under `/pl` or `/en`; `/` redirects to `/pl`. UI copy sits in `src/i18n/dictionaries/` (`pl.ts` defines the keys, `en.ts` must match them, and a test checks it). The header has a language switch that keeps the current path.
- **Light mode from the start**: the hero's CSS gradient is the default. The WebGL scene (`src/components/hero/`) mounts on top only when `QualityGate` from the kit says the device qualifies, and its code is only downloaded then. Under `prefers-reduced-motion`, without WebGL, or on weak devices, the page is the same minus the scene. Add `?quality=light` or `?quality=full` to a URL to force a version.
- **Scrolling**: `SmoothScroll` (Lenis on the GSAP ticker) wraps the page and stays off under reduced motion. `ProgressSection` shows per-section scroll progress through the `--scroll-progress` CSS variable.
- **Metadata**: per-language title and description, canonical URL and `hreflang` alternates.
- **Tooling**: ESLint, Prettier, Vitest, and GitHub Actions running lint, format, typecheck, tests and build.

All dependencies are free. All are open source except GSAP (with ScrollTrigger and SplitText), which is free for commercial use under GSAP's own no-charge licence. No paid libraries.

## New client site

1. Create the repo from this template and clone it:

   ```sh
   gh repo create aberratio/<client>-site --template aberratio/web-studio-starter --public --clone
   cd <client>-site
   npm install
   npm run dev
   ```

2. Replace the copy in `src/i18n/dictionaries/` and the colours in `src/app/globals.css`.
3. Build the client's sections in `src/components/`. Anything another site could reuse belongs in `web-studio-kit` instead: add it there, tag a release, and bump the tag in `package.json`.
4. Wrap every WebGL scene in `QualityGate` with a static fallback, and import the scene through `next/dynamic` with `ssr: false`, as `HeroScene.tsx` does. Render scenes in the kit's `SceneCanvas`. Above the fold, give the gate `idle` and keep the largest headline unsplit (`KineticText appear="ripple"`), or it becomes a late LCP.
5. Keep server-only libraries out of client components: a client file that imports one constant from a module using zod (or any server library) ships the whole library to the browser.
6. Deploy: import the repo as a new Vercel project. Set `NEXT_PUBLIC_SITE_URL` once the site has its own domain; until then metadata uses Vercel's production URL.

## Updating the kit

The kit is pinned to a git tag:

```json
"web-studio-kit": "github:aberratio/web-studio-kit#v0.2.2"
```

To move to a newer release, change the tag and run `npm install`.

## Scripts

| Command             | What it does                      |
| ------------------- | --------------------------------- |
| `npm run dev`       | Development server                |
| `npm run build`     | Production build                  |
| `npm run lint`      | ESLint, no warnings allowed       |
| `npm run format`    | Prettier, writes changes          |
| `npm run typecheck` | Generates route types, then `tsc` |
| `npm test`          | Vitest                            |

## Conventions

- Code and docs in English.
- UI copy may be Polish, always with an English language switch.

## Note on Next.js 16

This version differs from older Next.js: Cache Components are on, `middleware` is now `proxy`, and `dynamicParams` is not allowed (unknown languages call `notFound()` instead). Read `node_modules/next/dist/docs/` before relying on older patterns; `AGENTS.md` says the same for coding agents.
