# Dhruv Trivedi — Portfolio

A refined portfolio built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. Deployed to [thatdhruv.github.io](https://thatdhruv.github.io).

## Getting Started

```bash
npm install
npm run dev
```

## Switch aesthetics (reversible)

All visuals are skinned via CSS — the page layout and sections stay the same. Change one line in `src/config/features.ts`:

```ts
export const features = {
  aesthetic: "refined", // "refined" | "aqua2" | "neon"
  heroVisual: true,        // set false to remove the hero gradient visual
  heroChart: false,        // set true to swap in the telemetry chart instead
  lightModeToggle: true,
};
```

| Skin | Description |
|------|-------------|
| **`refined`** (default) | Minimal, Apple-inspired — neutral palette, tight typography, restrained accents |
| **`aqua2`** | Glassmorphism from [aqua2](https://github.com/thatdhruv/aqua2) — frosted surfaces, pill controls, Aqua blue |
| **`neon`** | Original cyber look — cyan accents, grid background, gradient headline |

Theme tokens live in `src/styles/aesthetics.css`. UI primitives use `ui-*` classes so components never need to change when swapping skins.

## Other toggles

- **`heroVisual`** — set `false` to remove the 3D DT logo on the hero's right side
- **`heroChart`** — set `true` to swap in the telemetry chart instead of the gradient visual
- **`lightModeToggle`** — set `false` to hide the sun/moon button

## Customize content

Edit `src/data/portfolio.ts` for copy, projects, experience, and links.

## Deploy to GitHub Pages

1. Push to `thatdhruv/thatdhruv.github.io`
2. **Settings → Pages → Source:** GitHub Actions
3. Pushes to `main` run `.github/workflows/deploy.yml` automatically

```bash
git add .
git commit -m "Update portfolio"
git push
```

## Local production preview

```bash
npm run build
npx serve out
```
