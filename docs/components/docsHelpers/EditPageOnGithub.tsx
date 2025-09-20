"use client";

import { usePathname } from "next/navigation";
import Link from "@radui/ui/Link";

const EditPageOnGithub = () => {

    const pathname = usePathname();
    const page = pathname.split("/").slice(2).join("/");


    const currentDocsPath = "docs/app/docs/" + page;

    return (
      <div className="w-full max-w-screen-lg mx-auto mt-2 py-[20px]">
        <Link href={`https://github.com/rad-ui/rad-ui/edit/main/${currentDocsPath}/page.mdx`}>
          Edit on GitHub
        </Link>
      </div>
    );
};

export default EditPageOnGithub;