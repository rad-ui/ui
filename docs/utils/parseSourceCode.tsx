import fs from 'fs';
import path from 'path';

const STYLE_COMPONENT_FOLDER_EXCEPTIONS: Record<string, string> = {
    blockquote: 'BlockQuote',
    radiocards: 'RadioCards',
    textarea: 'TextArea'
};

const toComponentFolderName = (fileName: string) => {
    return STYLE_COMPONENT_FOLDER_EXCEPTIONS[fileName]
        || fileName
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
};

const normalizeSourcePath = (sourcePath: string) => {
    const themedComponentMatch = sourcePath.match(/^styles\/themes\/components\/(.+)\.scss$/);

    if (!themedComponentMatch) {
        return sourcePath;
    }

    // TODO: Bulk-update docs `codeUsage.js` files to point at the new
    // `src/components/ui/*/*.clarity.scss` paths, then remove this compatibility mapping.
    const componentFileName = themedComponentMatch[1];
    const componentFolder = toComponentFolderName(componentFileName);

    return `src/components/ui/${componentFolder}/${componentFileName}.clarity.scss`;
};

// Docs pages are prerendered, so everything below runs at build time (or in
// `next dev`), never per request. Paths are repo-root-relative.
const DOCS_PREFIX = 'docs/';
const CLARITY_STYLE_PATH = /^src\/components\/ui\/(.+\.clarity\.scss)$/;

// The installed library, resolved from the docs app itself (never ../, see
// docs/AGENTS.md). Resolved by hand rather than with require.resolve: webpack
// rewrites require/createRequire in the server bundle and returns module ids.
const RADUI_PACKAGE_DIR = path.join(process.cwd(), 'node_modules', '@radui', 'ui');
const CLARITY_STYLES_EXPORT = './styles/clarity/*';

/**
 * Returns the source of a file, given its path relative to the repo root.
 *
 * - `docs/...`: read from this app's own files.
 * - `src/components/ui/<Component>/<file>.clarity.scss`: read from the
 *   installed `@radui/ui` (`styles/clarity/*`), so the styles shown always
 *   match the version the docs render. `npm run docs:live` shows local edits.
 * - Anything else, or a `@radui/ui` too old to ship its styles: fetched from
 *   GitHub at the commit being built (falls back to `main` outside Vercel).
 */
export const getSourceCodeFromPath = async (sourcePath: string) => {
    const normalizedSourcePath = normalizeSourcePath(sourcePath);

    if (normalizedSourcePath.startsWith(DOCS_PREFIX)) {
        return fs.readFileSync(
            path.join(process.cwd(), normalizedSourcePath.slice(DOCS_PREFIX.length)),
            'utf8'
        );
    }

    const clarityStyle = normalizedSourcePath.match(CLARITY_STYLE_PATH);
    if (clarityStyle) {
        const packagedSource = readPackagedClarityStyle(clarityStyle[1]);
        if (packagedSource !== null) return packagedSource;
    }

    return readGithubSourceCode(normalizedSourcePath);
}

const readPackagedClarityStyle = (componentStylePath: string) => {
    const packageJsonPath = path.join(RADUI_PACKAGE_DIR, 'package.json');
    if (!fs.existsSync(packageJsonPath)) return null;

    const target = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')).exports?.[CLARITY_STYLES_EXPORT];
    // Installed @radui/ui predates `styles/clarity/*`.
    if (typeof target !== 'string') return null;

    // Export targets are package-relative ("./dist/styles/clarity/*").
    const filePath = path.join(RADUI_PACKAGE_DIR, target.replace('*', componentStylePath));
    return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : null;
}

// On Vercel, read the exact commit being deployed (from the repo Vercel built).
const githubRawRoot = () => {
    const { VERCEL_GIT_REPO_OWNER, VERCEL_GIT_REPO_SLUG, VERCEL_GIT_COMMIT_SHA } = process.env;

    if (VERCEL_GIT_REPO_OWNER && VERCEL_GIT_REPO_SLUG && VERCEL_GIT_COMMIT_SHA) {
        return `https://raw.githubusercontent.com/${VERCEL_GIT_REPO_OWNER}/${VERCEL_GIT_REPO_SLUG}/${VERCEL_GIT_COMMIT_SHA}/`;
    }

    return 'https://raw.githubusercontent.com/rad-ui/ui/refs/heads/main/';
}

const readGithubSourceCode = async (sourcePath: string) => {
    const response = await fetch(`${githubRawRoot()}${sourcePath}`);

    if (!response.ok) {
        throw new Error(
            `Failed to load GitHub source (${response.status}) for ${sourcePath}`
        );
    }

    return response.text();
}
