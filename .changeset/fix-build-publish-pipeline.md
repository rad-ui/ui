---
"@radui/ui": patch
---

Fix the release build pipeline so theme CSS and component bundles are always included in published npm tarballs. Replace parallel CSS/component builds with a sequential pipeline, stabilize per-component type emission, and validate publish artifacts with `npm pack` before upload.

**Breaking changes**

- Remove `require` / `.cjs` conditions from per-component `package.json` exports. These paths were never built or shipped; CommonJS `require('@radui/ui/Button')` did not work in prior releases.

**Fixes `@radui/ui@0.5.0`**

- Restore `dist/themes/default.css` and `dist/themes/baremetal.css` in the published package (both were missing from the `0.5.0` tarball while still listed in `exports`).
