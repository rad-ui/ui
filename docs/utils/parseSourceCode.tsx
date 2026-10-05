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

// Library files (src/, styles/, CHANGELOG.md, ...) live outside docs/ and are
// NOT available when Vercel builds this app, so they are always read from
// GitHub. Never read them via ../ from disk - see docs/AGENTS.md.
const GITHUB_RAW_ROOT = 'https://raw.githubusercontent.com/rad-ui/ui/refs/heads/main/';

// Callers pass repo-root-relative paths. Paths under docs/ belong to this app
// and are read from disk; process.cwd() is the docs/ root.
const DOCS_PREFIX = 'docs/';

/**
 * Returns the source of a file, given its path relative to the repo root.
 *
 * - `docs/...` paths are read from this app's own files.
 * - Anything else (library source, theme styles, CHANGELOG.md) is fetched from
 *   GitHub `main`, so it reflects the latest merged library code.
 */
export const getSourceCodeFromPath = async (sourcePath: string) => {
    const normalizedSourcePath = normalizeSourcePath(sourcePath);

    if (normalizedSourcePath.startsWith(DOCS_PREFIX)) {
        return fs.readFileSync(
            path.join(process.cwd(), normalizedSourcePath.slice(DOCS_PREFIX.length)),
            'utf8'
        );
    }

    return readGithubSourceCode(normalizedSourcePath);
}

const readGithubSourceCode = async (sourcePath: string) => {
    const response = await fetch(`${GITHUB_RAW_ROOT}${sourcePath}`);

    if (!response.ok) {
        throw new Error(
            `Failed to load GitHub source (${response.status}) for ${sourcePath}`
        );
    }

    return response.text();
}
