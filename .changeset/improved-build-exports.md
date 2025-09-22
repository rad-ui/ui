---
"@radui/ui": minor
---

## Fix: Missing Components in NPM Bundle

**Versions 0.1.0 - 0.1.5** had incomplete component bundles due to build failures.

**Root Cause**: Due to updates we've made to build processes to build components for npm, we might have broken the process due to list on package.json not being in sync, we totally missed testing a couple of versions.

**Fix**: Increased Node.js heap size to 8GB and added export validation to prevent silent build failures.

**New Features**: Added `--check` flag for export validation, ESM/CommonJS support, and root export support.
