---
name: fix-css-links
description: Correct malformed stylesheet links across website pages
source: auto-skill
extracted_at: '2026-06-02T17:26:22.900Z'
---

## Purpose
Scan all HTML files for incorrectly concatenated `href` attributes that collide the stylesheet URL with a query string, and replace them with the proper `href="css/styles.css?v=<hash>"` pattern. This ensures CSS is loaded correctly when the site is served.

## Steps
1. List all `.html` files in the site root and sub‑directories.
2. For each file, read the content and find occurrences of  `href="css/styles.csshref=css/styles.css\?v=...`.
3. Replace the malformed string with `href="css/styles.css?v=...` preserving the existing version query.
4. Write back the updated file.
5. Validate that at least one file was modified.

## Notes
- Only the CSS link needs correction; other references (icons, scripts, etc.) remain untouched.
- Preserve the existing query string value `?v=` to keep cache‑busting semantics.
- This skill can be rerun after future edits that accidentally re‑introduce the mistake.

## Testing
Run the skill and check the HTML files. All `link rel="stylesheet"` tags should now point to `css/styles.css?v=<hash>` without duplicate `css/styles.css` segments.
