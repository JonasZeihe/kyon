# Kyon

A modern, extensible **Next.js 15** blog and content publishing platform built with **TypeScript**, **MDX**, and **styled-components**.  
Kyon is designed to be **scalable, maintainable, and customizable**, providing a foundation for blogs, case studies, or any long-form content site.

---

## ✨ Features

- **Next.js App Router** (React 19, TypeScript 5)
- **MDX Support** for rich content and interactive components
- **Content pipeline** with frontmatter, TOC extraction, and reading-time estimation
- **SEO-first**: automatic metadata, OpenGraph, and Twitter cards
- **Blog meta-features**:
  - Breadcrumbs
  - Reading progress bar
  - Sticky Table of Contents
- **Theme system** with light/dark mode, gradients, and custom typography
- **Reusable UI Components**: buttons, badges, wrappers, grids, media displays
- **Accessibility conscious** (a11y linting, keyboard focus, reduced-motion support)
- **CI/CD ready** with GitHub Actions and static export for GitHub Pages

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js **>= 20**
- npm or yarn

### 2. Installation

```bash
git clone https://github.com/yourname/kyon.git
cd kyon
npm install
```

### 3. Development

```bash
npm run dev
```

This will start the app at [http://localhost:3000](http://localhost:3000).

### 4. Production Build

```bash
npm run build
npm start
```

### 5. Linting & Formatting

```bash
npm run lint      # ESLint
npm run stylelint # Stylelint
npm run format    # Prettier
```

---

## 📂 Project Structure

```
src/
  app/              # Next.js App Router pages and layouts
    blog/           # Blog routes and layouts
    (site)/         # Main site layout and homepage
    about/          # Static pages
  components/       # UI components (buttons, cards, layout, utilities, etc.)
  lib/              # Core logic (blog indexing, content pipeline, SEO)
  styles/           # Global styles, typography, theme system
public/
  content/          # Markdown/MDX posts with assets
scripts/            # Helper scripts for build/test/dev
```

- **Content-first design**: All posts live in `public/content/<category>/<date_slug>/`.
- **`lib/blog`**: Responsible for indexing, pagination, metadata extraction.
- **`lib/content`**: Processes Markdown/MDX through remark/rehype pipeline.
- **`components/blog`**: Renders articles, grids, TOC, related posts, etc.
- **`styles/theme.ts`**: Centralized theme with light/dark palettes and design tokens.

---

## 📝 Content Authoring

1. Create a new folder inside `public/content/<category>/`
   Example:

   ```
   public/content/meta/20250915_initial_post/
     index.md
     cover.webp
     screenshot.webp
   ```

2. Add frontmatter at the top of your `index.md`:

   ```yaml
   ---
   title: 'My First Post'
   date: '2025-09-15'
   tags: ['nextjs', 'content']
   excerpt: 'A short summary of the article.'
   cover: 'cover.webp'
   ---
   ```

3. Write in Markdown or MDX.
   - Use components like `<Button />`, `<Badge />`, `<MediaDisplay />` directly inside MDX.
   - Assets are automatically resolved and linked.

---

## ⚙️ Configuration

- **`next.config.ts`**
  Handles base paths, asset prefixes, static export (for GitHub Pages).
- **Environment variables**:
  - `SITE_NAME` → Project name (default: `"Kyon"`)
  - `SITE_URL` → Base URL (default: `http://localhost:3000`)
  - `POSTS_PER_PAGE` → Pagination size (default: `12`)
  - `DEPLOY_TARGET` → Set `gh` for GitHub Pages export

---

## 🛡️ Quality & Best Practices

- **TypeScript strict mode** enabled
- **ESLint** with `@typescript-eslint`, `jsx-a11y`, and Prettier integration
- **Stylelint** for CSS-in-JS (`styled-components`)
- **Prettier** for consistent formatting
- **Tests** planned under `scripts/logic/test_react.py`

---

## 🌍 Deployment

Supports multiple targets:

- **Vercel** (recommended) → zero-config Next.js hosting
- **GitHub Pages** → via GitHub Actions (`.github/workflows/deploy.yml`)
- **Static export** (`next export`) → for any static hosting provider

---

## 🔮 Roadmap

- [ ] Centralize meta-features (Breadcrumbs, TOC, ReadingProgress) into a unified `BlogMetaLayer`
- [ ] Extract theme + design system for standalone reuse
- [ ] Add comment system (optional: serverless function or 3rd-party integration)
- [ ] Extend pipeline with custom rehype/remark plugins
- [ ] Package blog features as **freelancing-ready template**

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add feature"`
4. Push branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📜 License

MIT © 2025 – Built with ❤️ for clarity, scalability, and freelancing freedom.
