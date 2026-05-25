# Contributing

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Create a feature branch: `git checkout -b feature/my-feature`
4. Make your changes
5. Push and open a Pull Request targeting `main`

## Code Style

- **HTML**: semantic tags, proper indentation (2 spaces)
- **CSS**: add rules to `styles.css` using existing naming conventions
- **JS**: vanilla JS only, no external dependencies unless strictly necessary

## Adding a New Page

1. Create `my-page.html` in the root directory
2. Link `styles.css` and `main.js` in the `<head>` / before `</body>`
3. Add the URL to `sitemap.xml`
4. Document the page in `README.md` and `docs/ARCHITECTURE.md`

## Commit Message Convention

```
<type>: <short description>

Types: feat | fix | docs | style | refactor | chore
```

Examples:
- `feat: add gpx elevation chart`
- `fix: mobile nav menu overflow`
- `docs: update architecture diagram`
