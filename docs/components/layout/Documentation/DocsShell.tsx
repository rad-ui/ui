"use client"

import PageDetails from "@/components/seo/PageDetails";
import Navigation from '@/components/navigation/Navigation';
import EditPageOnGithub from "@/components/docsHelpers/EditPageOnGithub";
import DocsPager from "@/components/docsHelpers/DocsPager";
import DocsTableOfContents from "@/components/layout/Documentation/DocsTableOfContents";
import ScrollArea from "@radui/ui/ScrollArea"

type DocsShellProps = {
    children: React.ReactNode;
};

// Shared chrome for every docs product (/docs, /fx): sidebar, scroll area,
// article column and table of contents. The sidebar picks its sections from
// the current path.
const DocsShell = ({ children }: DocsShellProps) => {
    return (
        <div
            className="text-gray-1000 md:flex md:flex-row md:items-stretch"
            style={{ height: "calc(100vh - 57px)" }}
        >
            <aside className="relative z-10 hidden h-full w-[264px] flex-none flex-col items-stretch border-r border-gray-300 bg-gray-50 md:flex">
                <Navigation />
            </aside>

            <div id="docs-content" className="h-full min-w-0 flex-1">
                <ScrollArea.Root customRootClass="rad-ui">
                    <ScrollArea.Viewport>
                        <div className="mx-auto w-full max-w-[1180px] px-5 pb-24 pt-8 md:px-10 md:pt-10 xl:pt-12">
                            <div className="grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,1fr)_200px] xl:gap-16">
                                <div className="w-full min-w-0 xl:max-w-[760px]">
                                    <PageDetails />
                                    <article id="docs-article" className="w-full min-w-0">
                                        {children}
                                    </article>
                                    <DocsPager />
                                    <EditPageOnGithub />
                                </div>
                                <DocsTableOfContents />
                            </div>
                        </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation='vertical' className="relative z-[100]">
                        <ScrollArea.Thumb />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </div>
        </div>
    )
}

export default DocsShell;
