'use client'


import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

import { NavBarContext } from '@/components/Main/NavBar/NavBarContext';

import docsSections from "@/app/docs/docsNavigationSections"

import ScrollArea from "@radui/ui/ScrollArea"

import Category from './Category'

const defaultSections = [
    {
        type: "CATEGORY",
        items: [
            { title: "Documentation", path: "/docs/first-steps/introduction" },
            { title: "Showcase", path: "/showcase/music-app" }
        ]
    }
]



const Navigation = ({ customSections }: { customSections?: any }) => {
    // get path from ssr
    const pathname = usePathname();
    const { setIsDocsNavOpen } = useContext(NavBarContext) as { isDocsNavOpen: boolean, setIsDocsNavOpen: (isDocsNavOpen: boolean) => void };

    const [sections, setSections] = useState(defaultSections)
    // customSections || sections;

    useEffect(() => {
        if (pathname.includes("/docs/")) {
            setSections(docsSections)
        }
        else {
            setSections(defaultSections)
        }
    }, [pathname])


    return <ScrollArea.Root style={{ width: "100%" }}>
        <ScrollArea.Viewport style={{ height: "100%" }}>
          <div className="min-w-[240px]">
             <div className='flex-none pb-20 w-full lg:w-[240px] lg:bg-transparent'>
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