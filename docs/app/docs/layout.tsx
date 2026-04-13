"use client"

import PageDetails from "@/components/seo/PageDetails";
import Navigation from '@/components/navigation/Navigation';
import EditPageOnGithub from "@/components/docsHelpers/EditPageOnGithub";
import DocsTableOfContents from "@/components/layout/Documentation/DocsTableOfContents";
import ScrollArea from "@radui/ui/ScrollArea"

type Doc = {
    children: React.ReactNode;
};

const Layout = ({ children }: Doc) => {
    return (
        <div
            className="md:flex md:flex-row md:items-stretch text-gray-1000"
            style={{ height: "calc(100vh - 57px)" }}
        >
            <div className="relative z-10 hidden h-full flex-none flex-col items-stretch border-r border-gray-300 bg-gray-50 md:flex">
                <Navigation />
            </div>

            <div id="docs-content" className="flex-1 h-full bg-transparent">
                <ScrollArea.Root>
                    <ScrollArea.Viewport>
                        <DocsLayoutGridRoot>
                            <div className="grid grid-cols-1 gap-12 xl:grid-cols-[minmax(0,860px)_220px]">
                                <div className="w-full min-w-0">
                                    <PageDetails />
                                    <article id="docs-article" className="w-full min-w-0">
                                        {children}
                                    </article>
                                    <EditPageOnGithub />
                                </div>
                                <DocsTableOfContents />
                            </div>
                        </DocsLayoutGridRoot>

                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation='vertical'  className="relative z-[100]">
                        <ScrollArea.Thumb />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </div>
        </div>
    )
}


const DocsLayoutGridRoot = ({ children }: { children: React.ReactNode }) => {
    return <div className="w-full pt-8 md:pt-10">
        <div className="layout-image opacity-30">
        </div>
        <div className="relative z-10 mx-auto max-w-[1380px] px-5 pb-20 md:px-8 xl:px-10 xl:pl-14">
            <PageDetails />
            {children}
        </div>
    </div>
}

export default Layout;
