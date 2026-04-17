"use client";

import { usePathname } from "next/navigation";
import Link from "@radui/ui/Link";

const GITHUB_REPO_EDIT_BASE = "https://github.com/rad-ui/ui/edit/main";

const CHANGELOG_EDIT_HREF = `${GITHUB_REPO_EDIT_BASE}/CHANGELOG.md`;

const EditPageOnGithub = () => {
    const pathname = usePathname();
    const page = pathname.split("/").slice(2).join("/");

    if (page === "first-steps/changelog") {
        return (
            <div className="mx-auto mt-2 w-full max-w-screen-lg py-[20px]">
                <Link href={CHANGELOG_EDIT_HREF} target="_blank" rel="noreferrer">
                    Edit changelog on GitHub
                </Link>
            </div>
        );
    }

    const currentDocsPath = "docs/app/docs/" + page;

    return (
        <div className="mx-auto mt-2 w-full max-w-screen-lg py-[20px]">
            <Link
                href={`${GITHUB_REPO_EDIT_BASE}/${currentDocsPath}/content.mdx`}
                target="_blank"
                rel="noreferrer"
            >
                Edit this page on GitHub
            </Link>
        </div>
    );
};

export default EditPageOnGithub;
