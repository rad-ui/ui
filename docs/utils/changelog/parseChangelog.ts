export type ChangelogRelease = {
    version: string;
    /** Markdown body under the version heading (Minor/Patch sections and bullets). */
    body: string;
};

/**
 * Split root CHANGELOG.md (Changesets format) into one entry per `## version` section.
 */
export function parseChangelogMarkdown(raw: string): ChangelogRelease[] {
    const trimmed = raw.trimStart();
    const withoutTitle = trimmed.replace(/^#\s+[^\n]*\n+/, "");
    const chunks = withoutTitle
        .split(/(?=^##\s+)/m)
        .map((c) => c.trim())
        .filter(Boolean);

    return chunks.map((chunk) => {
        const firstNewline = chunk.indexOf("\n");
        const headerLine = firstNewline === -1 ? chunk : chunk.slice(0, firstNewline);
        const m = headerLine.match(/^##\s+(.+)$/);
        const version = m ? m[1].trim() : "unknown";
        const body =
            firstNewline === -1 ? "" : chunk.slice(firstNewline + 1).trim();
        return { version, body };
    });
}

export const CHANGELOG_PAGE_SIZE = 5;
