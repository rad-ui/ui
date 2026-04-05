'use client'
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

import { NavBarContext } from '@/components/Main/NavBar/NavBarContext';
import docsSections from "@/app/docs/docsNavigationSections"
import ScrollArea from "@radui/ui/ScrollArea"
import Category from './Category'




const Navigation = ({ customSections }: { customSections?: any }) => {
    const defaultSections = [
        {
            type: "CATEGORY",
            title: "Main",
            items: [
                { title: "Documentation", path: "/docs/first-steps/introduction" },
                { title: "Showcase", path: "/showcase/music-app" }
            ]
        }
    ]
    // get path from ssr
    const pathname = usePathname();
    const { setIsDocsNavOpen } = useContext(NavBarContext) as { isDocsNavOpen: boolean, setIsDocsNavOpen: (isDocsNavOpen: boolean) => void };

    const sections = /^\/docs(\/|$)/.test(pathname) ? docsSections : defaultSections;


    return <ScrollArea.Root className="h-full">
        <ScrollArea.Viewport style={{ height: "100%" }}>
          <div className="min-w-[272px]">
             <div className='w-full flex-none px-3 pb-16 pt-4 lg:w-[272px]'>
                {sections.map((section, i) => {
                    const isCategory = section.type === "CATEGORY";
                    if (isCategory) {
                        return <Category key={i} categoryItem={section} pathname={pathname} setIsDocsNavOpen={setIsDocsNavOpen} />
                    }
                    else{
                        return <div key={i} className='h-10 w-full bg-gray-100'>
                            Hello
                        </div>
                    }
                })}
            </div> 
          </div>
            
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation='vertical' >
            <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
    </ScrollArea.Root>


}

export default Navigation;
