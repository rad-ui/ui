"use client";

import { usePathname } from "next/navigation";
import Link from "@radui/ui/Link";
import { fxComponents } from "@/app/fx/fxNavigationSections";

const GITHUB_REPO_EDIT_BASE = "https://github.com/rad-ui/ui/edit/main";

const CHANGELOG_EDIT_HREF = `${GITHUB_REPO_EDIT_BASE}/CHANGELOG.md`;

const EditPageOnGithub = () => {
    const pathname = usePathname();
    const page = pathname.split("/").slice(2).join("/");

    if (page === "first-steps/changelog") {
        return (
            <div className="mt-10 border-t border-gray-300 pt-6">
                <Link
                    href={CHANGELOG_EDIT_HREF}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[0.78rem] font-medium tracking-wide text-gray-950 hover:text-green-1000"
                >
                    Edit changelog on GitHub →
                </Link>
            </div>
        );
    }

    // FX component pages are generated from the registry: edit the component source.
    const fxSlug = pathname.match(/^\/fx\/([^/]+)$/)?.[1];
    const isFxComponent = fxComponents.some((item) => item.name === fxSlug);

    // Everything else mirrors the app directory: /docs/... and /fx/... alike.
    const editHref = isFxComponent
        ? `${GITHUB_REPO_EDIT_BASE}/docs/registry/fx/${fxSlug}.tsx`
        : `${GITHUB_REPO_EDIT_BASE}/docs/app${pathname.replace(/\/$/, "")}/content.mdx`;

    return (
        <div className="mt-10 border-t border-gray-300 pt-6">
            <Link
                href={editHref}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[0.78rem] font-medium tracking-wide text-gray-950 hover:text-green-1000"
            >
                Edit this page on GitHub →
            </Link>
        </div>
    );
};

export default EditPageOnGithub;
