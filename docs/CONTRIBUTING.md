# Contributing

Thank you for your interest in contributing to Francesco Castaldi's personal website.

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```sh
   git clone https://github.com/YOUR_USERNAME/Francesco.Castaldi.github.io.git
   cd Francesco.Castaldi.github.io
   ```
3. **Create a feature branch:**
   ```sh
   git checkout -b feature/my-feature
   ```
4. Make your changes
5. **Push** and open a **Pull Request** targeting `main`

---

## Code Style

### HTML
- Use semantic tags (`<header>`, `<main>`, `<section>`, `<footer>`, `<article>`)
- Indentation: 2 spaces
- Always set `lang` attribute on `<html>` (`lang="it"` for Italian content)
- Include `<meta charset="UTF-8">` and `<meta name="viewport">` on every page

### CSS
- Add rules to `styles.css` using existing **kebab-case** naming (`.my-component`, `.my-component-title`)
- Use CSS custom properties (`--var-name`) for colours and spacing where applicable
- Keep selectors as flat as possible — avoid deep nesting

### JavaScript
- **Vanilla JS only** — no external libraries or frameworks unless strictly necessary
- Use `const` and `let` — never `var`
- Prefer `addEventListener` over inline `onclick`
- `defer` all `<script>` tags in `<head>`

---

## Adding a New Page

1. Create `my-page.html` in the **root directory**
2. Link shared assets in `<head>`:
   ```html
   <link rel="stylesheet" href="styles.css">
   <script src="main.js" defer></script>
   ```
3. Add `<header id="site-header"></header>` and `<footer id="site-footer"></footer>` — `main.js` injects the nav automatically
4. Add the new URL to **`sitemap.xml`** with a `<lastmod>` date
5. Document the page in **`README.md`** (page table) and **`docs/ARCHITECTURE.md`**

---

## Commit Message Convention

Use the following format:

```
<type>: <short description in English>
```

| Type | When to use |
|------|-------------|
| `feat` | New page or feature |
| `fix` | Bug fix |
| `docs` | Documentation only changes |
| `style` | CSS / visual changes (no logic change) |
| `refactor` | Code restructuring without behaviour change |
| `chore` | Maintenance — deps, config, CI |

**Examples:**
```
feat: add gpx elevation chart to gpx-editor
fix: mobile nav menu overflow on small screens
docs: update architecture diagram with new pages
style: update hero section gradient colours
chore: add .vs/ to .gitignore
```

---

## Pull Request Checklist

Before opening a PR, verify:

- [ ] Page links `styles.css` and `main.js`
- [ ] `sitemap.xml` updated if a new page was added
- [ ] `README.md` page table updated
- [ ] `docs/ARCHITECTURE.md` updated
- [ ] No sensitive data or credentials committed
- [ ] No `.vs/` or OS-specific files (`.DS_Store`, `Thumbs.db`) included
