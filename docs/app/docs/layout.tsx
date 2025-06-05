"use client"

import PageDetails from "@/components/seo/PageDetails";
import Navigation from '@/components/navigation/Navigation';
import EditPageOnGithub from "@/components/docsHelpers/EditPageOnGithub";
import ScrollArea from "@radui/ui/ScrollArea"

type Doc = {
    children: React.ReactNode;
};


const Layout = ({ children }: Doc) => {
    return (
        <div className="md:flex md:flex-row md:items-stretch text-gray-1000" style={{ height: "calc(100vh - 57px)" }}>
            <div className="flex-none flex-col items-stretch h-full md:flex hidden">
                            <Navigation />
            </div>

            <div id="docs-content" className="flex-1 h-full">
                <ScrollArea.Root>
                    <ScrollArea.Viewport>
                        <div className=' p-4 md:mx-auto md:max-w-[1440px] w-full'>
                            <div className="w-full max-w-screen-lg mx-auto">
                                <PageDetails />
                                {children}
                                <EditPageOnGithub />
                            </div>
                        </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation='vertical' >
                        <ScrollArea.Thumb />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </div>
        </div>
    )
}

export default Layout;