import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Button from "@radui/ui/Button";

import { ChangelogMarkdown } from "./ChangelogMarkdown";
import { getSourceCodeFromPath } from "@/utils/parseSourceCode";
import {
    CHANGELOG_PAGE_SIZE,
    parseChangelogMarkdown,
} from "@/utils/changelog/parseChangelog";
import generateSeoMetadata from "@/utils/seo/generateSeoMetadata";

const SITE_URL = process.env.SITE_URL ?? "https://www.rad-ui.com";
const CHANGELOG_PATH = "/docs/first-steps/changelog";

/** https://www.npmjs.com/package/@radui/ui */
const NPM_PACKAGE_URL = "https://www.npmjs.com/package/@radui/ui";

function npmPackageVersionUrl(version: string) {
    return `${NPM_PACKAGE_URL}/v/${encodeURIComponent(version)}`;
}

/** Alias for older call sites / tooling that still references this name. */
const NPM_VERSION = npmPackageVersionUrl;

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
                <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-950">
                    Changelog
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-gray-900">
                    Published versions of{" "}
                    <code className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-[0.9em] text-gray-950">
                        @radui/ui
                    </code>
                    . Minor and patch sections follow{" "}
                    <a
                        className="font-medium text-blue-900 underline decoration-blue-900/40 underline-offset-2 hover:text-blue-950 hover:decoration-blue-950"
                        href="https://semver.org/"
                        rel="noreferrer"
                        target="_blank"
                    >
                        SemVer
                    </a>
                    . Source:{" "}
                    <a
                        className="font-medium text-blue-900 underline decoration-blue-900/40 underline-offset-2 hover:text-blue-950 hover:decoration-blue-950"
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
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex min-w-0 flex-col gap-0.5">
                                <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-gray-700">
                                    Release
                                </p>
                                <h2 className="font-mono text-2xl font-semibold tracking-tight text-gray-950">
                                    v{release.version}
                                </h2>
                            </div>
                            <a
                                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-blue-900 underline decoration-blue-900/40 underline-offset-2 hover:text-blue-950 hover:decoration-blue-950"
                                href={NPM_VERSION(release.version)}
                                rel="noreferrer"
                                target="_blank"
                            >
                                npm
                                <ExternalLink
                                    aria-hidden
                                    className="h-3.5 w-3.5 opacity-70"
                                    strokeWidth={2}
                                />
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
                            <Button
                                asChild
                                size="small"
                                variant="outline"
                            >
                                <Link
                                    href={
                                        safePage === 2
                                            ? CHANGELOG_PATH
                                            : `${CHANGELOG_PATH}?page=${safePage - 1}`
                                    }
                                >
                                    Previous
                                </Link>
                            </Button>
                        ) : (
                            <Button
                                disabled
                                size="small"
                                variant="outline"
                            >
                                Previous
                            </Button>
                        )}
                        {safePage < totalPages ? (
                            <Button
                                asChild
                                size="small"
                                variant="solid"
                            >
                                <Link
                                    href={`${CHANGELOG_PATH}?page=${safePage + 1}`}
                                >
                                    Next
                                </Link>
                            </Button>
                        ) : (
                            <Button
                                disabled
                                size="small"
                                variant="solid"
                            >
                                Next
                            </Button>
                        )}
                    </div>
                </nav>
            ) : null}
        </div>
    );
}
