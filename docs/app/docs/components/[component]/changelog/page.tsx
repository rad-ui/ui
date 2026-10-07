import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";

import { ChangelogMarkdown } from "../../../first-steps/changelog/ChangelogMarkdown";
import { docsNavigationSections } from "../../../docsNavigationSections";
import { getSourceCodeFromPath } from "@/utils/parseSourceCode";
import {
    createComponentChangelogTarget,
    getComponentChangelogReleases,
} from "@/utils/changelog/componentChangelog";
import { parseChangelogMarkdown } from "@/utils/changelog/parseChangelog";
import generateSeoMetadata from "@/utils/seo/generateSeoMetadata";

const SITE_URL = process.env.SITE_URL ?? "https://www.rad-ui.com";
const NPM_PACKAGE_URL = "https://www.npmjs.com/package/@radui/ui";

const componentItems =
    docsNavigationSections
        .find((section) => section.title === "Components")
        ?.items.map((item) => createComponentChangelogTarget(item.title, item.path)) ?? [];

const componentTargets = new Map(componentItems.map((item) => [item.slug, item]));

function npmPackageVersionUrl(version: string) {
    return `${NPM_PACKAGE_URL}/v/${encodeURIComponent(version)}`;
}

export function generateStaticParams() {
    return componentItems.map((component) => ({
        component: component.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ component: string }>;
}) {
    const { component } = await params;
    const target = componentTargets.get(component);
    if (!target) return {};

    return generateSeoMetadata({
        title: `${target.title} Changelog - Rad UI`,
        description: `Release history for the Rad UI ${target.title} component, collected from the published @radui/ui changelog.`,
        keywords: [
            `${target.title} changelog`,
            `${target.title} release notes`,
            "@radui/ui",
            "Rad UI components",
        ],
        canonicalUrl: `${SITE_URL}/docs/components/${target.slug}/changelog`,
    });
}

export default async function ComponentChangelogPage({
    params,
}: {
    params: Promise<{ component: string }>;
}) {
    const { component } = await params;
    const target = componentTargets.get(component);
    if (!target) notFound();

    const raw = await getSourceCodeFromPath("CHANGELOG.md");
    const releases = getComponentChangelogReleases(
        parseChangelogMarkdown(raw),
        target,
        npmPackageVersionUrl,
    );

    return (
        <div className="w-full min-w-0 max-w-screen-lg">
            <header className="mb-10 border-b border-gray-300 pb-8">
                <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-widest text-gray-950">
                    Component changelog
                </p>
                <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-950">
                    {target.title} changelog
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-gray-950">
                    Component-specific release notes collected from{" "}
                    <Link
                        className="font-medium text-blue-900 underline decoration-blue-900/40 underline-offset-2 hover:text-blue-950 hover:decoration-blue-950"
                        href="/docs/first-steps/changelog"
                    >
                        the full changelog
                    </Link>
                    . This page filters the published entries that mention {target.title}.
                </p>
                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                    <Link
                        className="font-medium text-blue-900 underline decoration-blue-900/40 underline-offset-2 hover:text-blue-950 hover:decoration-blue-950"
                        href={`/docs/components/${target.slug}`}
                    >
                        Back to {target.title} docs
                    </Link>
                    <a
                        className="font-medium text-blue-900 underline decoration-blue-900/40 underline-offset-2 hover:text-blue-950 hover:decoration-blue-950"
                        href="https://github.com/rad-ui/ui/blob/main/CHANGELOG.md"
                        rel="noreferrer"
                        target="_blank"
                    >
                        Source CHANGELOG.md
                    </a>
                </div>
            </header>

            {releases.length === 0 ? (
                <p className="rounded-md border border-gray-300 bg-gray-100 p-4 text-sm leading-relaxed text-gray-950">
                    No published changelog entries mention {target.title} yet.
                </p>
            ) : (
                <div className="flex flex-col gap-12">
                    {releases.map((release) => (
                        <article
                            key={release.version}
                            className="border-b border-gray-200 pb-12 last:border-b-0 last:pb-0"
                        >
                            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                                <div className="flex min-w-0 flex-col gap-0.5">
                                    <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-gray-950">
                                        Release
                                    </p>
                                    <h2 className="font-mono text-2xl font-semibold tracking-tight text-gray-950">
                                        v{release.version}
                                    </h2>
                                </div>
                                <a
                                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-blue-900 underline decoration-blue-900/40 underline-offset-2 hover:text-blue-950 hover:decoration-blue-950"
                                    href={release.npmVersionUrl}
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
            )}
        </div>
    );
}
