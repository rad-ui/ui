"use client";

import { usePathname } from "next/navigation";

const EditPageOnGithub = () => {

    const pathname = usePathname();
    const page = pathname.split("/").slice(2).join("/");


    const currentDocsPath = "docs/app/docs/" + page;

  return (
    <div>
      <a href={`https://github.com/rad-ui/rad-ui/edit/main/${currentDocsPath}/page.mdx`}>Edit this page on GitHub</a>
    </div>
  );
};

export default EditPageOnGithub;