import type { ChangelogRelease } from "./parseChangelog";

export type ComponentChangelogTarget = {
    slug: string;
    title: string;
    terms: string[];
};

export type ComponentChangelogRelease = ChangelogRelease & {
    npmVersionUrl: string;
};

const CHANGELOG_SECTION_HEADING = /^###\s+.+$/;
const TOP_LEVEL_BULLET = /^-\s+/;
const AMBIGUOUS_TERMS = new Set(["code", "em", "link", "strong", "table", "text", "theme"]);
const STRONG_EVIDENCE_SUFFIXES = [
    "api",
    "component",
    "docs",
    "keyboard",
    "page",
    "primitive",
    "props",
    "release",
    "resizable",
    "styles",
    "styling",
    "support",
];

const normalize = (value: string) =>
    value
        .toLowerCase()
        .replace(/[`*_()[\]{}:;,.!?/\\|-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

const titleToWords = (title: string) =>
    title
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2");

export const componentTitleToSlug = (title: string) =>
    titleToWords(title)
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const termVariants = (title: string, slug: string) => {
    const words = titleToWords(title);
    return Array.from(
        new Set([
            title,
            words,
            slug,
            slug.replace(/-/g, " "),
            title.replace(/\s+/g, ""),
        ].map(normalize).filter(Boolean)),
    );
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function createComponentChangelogTarget(
    title: string,
    path: string,
): ComponentChangelogTarget {
    const slug = path.split("/").filter(Boolean).at(-1) ?? componentTitleToSlug(title);
    return {
        slug,
        title,
        terms: termVariants(title, slug),
    };
}

/**
 * Generic component names need extra context; otherwise a Text page would match
 * every release note that says "helper text" or "button text".
 */
function hasStrongComponentEvidence(block: string, target: ComponentChangelogTarget) {
    const normalizedTitle = normalize(target.title);
    const compactTitle = target.title.replace(/\s+/g, "");
    const packageSubpath = ["@radui", "ui", compactTitle].map(escapeRegExp).join("/");
    const strongSuffixes = STRONG_EVIDENCE_SUFFIXES.join("|");

    return [
        new RegExp(packageSubpath, "i"),
        new RegExp(`\`${escapeRegExp(compactTitle)}\``),
        new RegExp(`\\*\\*${escapeRegExp(compactTitle)}\\*\\*`, "i"),
        new RegExp(
            `(^|\\s)${escapeRegExp(normalizedTitle)}\\s+(${strongSuffixes})(\\s|$)`,
            "i",
        ),
    ].some((pattern) => pattern.test(block));
}

/**
 * Matches a release-note block to a component target.
 */
function includesComponentTerm(block: string, target: ComponentChangelogTarget) {
    const text = normalize(block);
    return target.terms.some((term) => {
        if (!term) return false;
        if (AMBIGUOUS_TERMS.has(term)) {
            return hasStrongComponentEvidence(block, target);
        }

        return new RegExp(`(^|\\s)${escapeRegExp(term)}(\\s|$)`).test(text);
    });
}

function pushSelectedBlock(
    sections: Map<string, string[]>,
    section: string | null,
    block: string[],
    target: ComponentChangelogTarget,
) {
    if (block.length === 0) return;
    const text = block.join("\n").trimEnd();
    if (!includesComponentTerm(text, target)) return;

    const heading = section ?? "### Changes";
    const blocks = sections.get(heading) ?? [];
    blocks.push(text);
    sections.set(heading, blocks);
}

/**
 * Filters one changelog section while preserving prose-only sections such as
 * "Breaking Changes"; bulleted sections keep only matching bullet blocks.
 */
function pushSelectedSection(
    sections: Map<string, string[]>,
    section: string | null,
    sectionLines: string[],
    target: ComponentChangelogTarget,
) {
    let currentBlock: string[] = [];
    let sawTopLevelBullet = false;

    for (const line of sectionLines) {
        if (TOP_LEVEL_BULLET.test(line)) {
            sawTopLevelBullet = true;
            pushSelectedBlock(sections, section, currentBlock, target);
            currentBlock = [line];
            continue;
        }

        if (sawTopLevelBullet) {
            currentBlock.push(line);
        }
    }

    if (sawTopLevelBullet) {
        pushSelectedBlock(sections, section, currentBlock, target);
        return;
    }

    pushSelectedBlock(sections, section, sectionLines, target);
}

/**
 * Returns the markdown from one release that belongs on a component changelog.
 */
export function filterReleaseForComponent(
    release: ChangelogRelease,
    target: ComponentChangelogTarget,
) {
    const sections = new Map<string, string[]>();
    let currentSection: string | null = null;
    let currentSectionLines: string[] = [];

    for (const line of release.body.split("\n")) {
        if (CHANGELOG_SECTION_HEADING.test(line)) {
            pushSelectedSection(sections, currentSection, currentSectionLines, target);
            currentSectionLines = [];
            currentSection = line.trim();
            continue;
        }

        currentSectionLines.push(line);
    }

    pushSelectedSection(sections, currentSection, currentSectionLines, target);

    if (sections.size === 0) return null;

    return Array.from(sections.entries())
        .map(([heading, blocks]) => `${heading}\n\n${blocks.join("\n\n")}`)
        .join("\n\n");
}

/**
 * Builds the per-component release list rendered by component changelog pages.
 */
export function getComponentChangelogReleases(
    releases: ChangelogRelease[],
    target: ComponentChangelogTarget,
    npmVersionUrl: (version: string) => string,
): ComponentChangelogRelease[] {
    return releases
        .map((release) => {
            const body = filterReleaseForComponent(release, target);
            if (!body) return null;

            return {
                version: release.version,
                body,
                npmVersionUrl: npmVersionUrl(release.version),
            };
        })
        .filter((release): release is ComponentChangelogRelease => release !== null);
}
