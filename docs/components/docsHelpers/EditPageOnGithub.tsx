"use client";

import { usePathname } from "next/navigation";
import Link from "@radui/ui/Link";

const CHANGELOG_EDIT_HREF =
    "https://github.com/rad-ui/ui/edit/main/CHANGELOG.md";

const EditPageOnGithub = () => {
    const pathname = usePathname();
    const page = pathname.split("/").slice(2).join("/");

    if (page === "first-steps/changelog") {
        return (
            <div className="mx-auto mt-2 w-full max-w-screen-lg py-[20px]">
                <Link href={CHANGELOG_EDIT_HREF}>
                    Edit changelog on GitHub
                </Link>
            </div>
        );
    }

    const currentDocsPath = "docs/app/docs/" + page;

    return (
        <div className="mx-auto mt-2 w-full max-w-screen-lg py-[20px]">
            <Link
                href={`https://github.com/rad-ui/rad-ui/edit/main/${currentDocsPath}/page.mdx`}
            >
                Edit this page on GitHub
            </Link>
        </div>
    );
};

export default EditPageOnGithub;