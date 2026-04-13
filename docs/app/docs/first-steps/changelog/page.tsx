import Link from "next/link";

import { ChangelogMarkdown } from "./ChangelogMarkdown";
import { getSourceCodeFromPath } from "@/utils/parseSourceCode";
import {
    CHANGELOG_PAGE_SIZE,
    parseChangelogMarkdown,
} from "@/utils/changelog/parseChangelog";
import generateSeoMetadata from "@/utils/seo/generateSeoMetadata";

const SITE_URL = process.env.SITE_URL ?? "https://www.rad-ui.com";
const CHANGELOG_PATH = "/docs/first-steps/changelog";
const NPM_VERSION = (v: string) =>
    `https://www.npmjs.com/package/@radui/ui/v/${encodeURIComponent(v)}`;

const baseMetadata = generateSeoMetadata({
    title: "Changelog",
    description:
        "Release history for @radui/ui: minor and patch changes shipped in each published version.",
    keywords: ["changelog", "release notes", "@radui/ui", "npm", "versions"],
    canonicalUrl: `${SITE_URL}${CHANGELOG_PATH}`,
});

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const sp = await searchParams;
    const pageNum = parseChangelogPage(sp.page);
    const titleSuffix = pageNum > 1 ? ` (page ${pageNum})` : "";
    const canonical =
        pageNum > 1
            ? `${SITE_URL}${CHANGELOG_PATH}?page=${pageNum}`
            : `${SITE_URL}${CHANGELOG_PATH}`;

    return {
        ...baseMetadata,
        title: `Changelog${titleSuffix} | Rad UI`,
        alternates: {
            ...baseMetadata.alternates,
            canonical,
        },
        openGraph: {
            ...baseMetadata.openGraph,
            title: `Changelog${titleSuffix}`,
            url: canonical,
        },
        twitter: {
            ...baseMetadata.twitter,
            title: `Changelog${titleSuffix}`,
        },
    };
}

function parseChangelogPage(raw: string | undefined): number {
    const n = parseInt(raw ?? "1", 10);
    if (Number.isNaN(n) || n < 1) return 1;
    return n;
}

export default async function ChangelogPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const sp = await searchParams;
    const pageNum = parseChangelogPage(sp.page);
    const raw = await getSourceCodeFromPath("CHANGELOG.md");
    const releases = parseChangelogMarkdown(raw);
    const totalPages = Math.max(1, Math.ceil(releases.length / CHANGELOG_PAGE_SIZE));
    const safePage = Math.min(pageNum, totalPages);
    const offset = (safePage - 1) * CHANGELOG_PAGE_SIZE;
    const pageReleases = releases.slice(offset, offset + CHANGELOG_PAGE_SIZE);

    return (
        <div className="w-full min-w-0 max-w-screen-lg">
            <header className="mb-10 border-b border-gray-300 pb-8">
                <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-1000">
                    Changelog
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-gray-800">
                    Published versions of{" "}
                    <code className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-[0.9em]">
                        @radui/ui
                    </code>
                    . Minor and patch sections follow{" "}
                    <a
                        className="text-blue-800 underline decoration-blue-800/30 underline-offset-2 hover:decoration-blue-800"
                        href="https://semver.org/"
                        rel="noreferrer"
                        target="_blank"
                    >
                        SemVer
                    </a>
                    . Source:{" "}
                    <a
                        className="text-blue-800 underline decoration-blue-800/30 underline-offset-2 hover:decoration-blue-800"
                        href="https://github.com/rad-ui/ui/blob/main/CHANGELOG.md"
                        rel="noreferrer"
                        target="_blank"
                    >
                        CHANGELOG.md
                    </a>{" "}
                    in the repository.
                </p>
            </header>

            {releases.length === 0 ? (
                <p className="text-sm text-gray-700">
                    No releases found in CHANGELOG.md.
                </p>
            ) : null}

            <div className="flex flex-col gap-12">
                {pageReleases.map((release) => (
                    <article
                        key={release.version}
                        className="border-b border-gray-200 pb-12 last:border-b-0 last:pb-0"
                    >
                        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
                            <h2 className="text-xl font-semibold text-gray-1000">
                                {release.version}
                            </h2>
                            <a
                                className="text-sm text-blue-800 underline decoration-blue-800/30 underline-offset-2 hover:decoration-blue-800"
                                href={NPM_VERSION(release.version)}
                                rel="noreferrer"
                                target="_blank"
                            >
                                View on npm
                            </a>
                        </div>
                        <ChangelogMarkdown markdown={release.body} />
                    </article>
                ))}
            </div>

            {totalPages > 1 ? (
                <nav
                    aria-label="Changelog pagination"
                    className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-gray-300 pt-8"
                >
                    <p className="text-sm text-gray-700">
                        Page {safePage} of {totalPages}
                        {releases.length > 0 ? (
                            <span className="text-gray-600">
                                {" "}
                                ({releases.length} {releases.length === 1 ? "release" : "releases"}{" "}
                                total)
                            </span>
                        ) : null}
                    </p>
                    <div className="flex items-center gap-2">
                        {safePage > 1 ? (
                            <Link
                                className="rounded-md border border-gray-400 bg-white px-3 py-1.5 text-sm font-medium text-gray-1000 hover:bg-gray-50"
                                href={safePage === 2 ? CHANGELOG_PATH : `${CHANGELOG_PATH}?page=${safePage - 1}`}
                            >
                                Previous
                            </Link>
                        ) : (
                            <span className="rounded-md border border-transparent px-3 py-1.5 text-sm text-gray-500">
                                Previous
                            </span>
                        )}
                        {safePage < totalPages ? (
                            <Link
                                className="rounded-md border border-gray-400 bg-white px-3 py-1.5 text-sm font-medium text-gray-1000 hover:bg-gray-50"
                                href={`${CHANGELOG_PATH}?page=${safePage + 1}`}
                            >
                                Next
                            </Link>
                        ) : (
                            <span className="rounded-md border border-transparent px-3 py-1.5 text-sm text-gray-500">
                                Next
                            </span>
                        )}
                    </div>
                </nav>
            ) : null}
        </div>
    );
}
