'use client'
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

import { NavBarContext } from '@/components/Main/NavBar/NavBarContext';
import docsSections from "@/app/docs/docsNavigationSections"
import ScrollArea from "@radui/ui/ScrollArea"
import Category from './Category'

const SearchIcon = () => {
    return (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.5 2C4.01472 2 2 4.01472 2 6.5C2 8.98528 4.01472 11 6.5 11C7.55416 11 8.52371 10.6375 9.29061 10.0306L12.6303 13.3703C12.8256 13.5655 13.1421 13.5655 13.3374 13.3703C13.5327 13.175 13.5327 12.8584 13.3374 12.6631L9.99772 9.32343C10.6046 8.55653 10.9671 7.58698 10.9671 6.53282C10.9671 4.04754 8.95229 2.03282 6.46701 2.03282L6.5 2ZM3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5Z" fill="currentColor"/>
        </svg>
    );
}

const BrandIcon = () => {
    return (
        <div className="h-4 w-4 rounded-full bg-gradient-to-br from-amber-200 to-amber-500" aria-hidden="true" />
    );
}

const DocsSidebarHeader = () => {
    return (
        <div className="mb-4 px-1 pb-2">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <BrandIcon />
                    <div className="text-[0.95rem] font-bold tracking-[-0.03em] text-gray-1000">
                        <span>Rad UI</span>
                    </div>
                </div>
                <div className="inline-flex h-9 w-9 items-center justify-center gap-[3px] rounded-[10px] border border-gray-300 bg-gray-100 p-2 text-gray-800" aria-hidden="true">
                    <span className="h-2.5 w-1 rounded-full bg-current opacity-85" />
                    <span className="h-2.5 w-1 rounded-full bg-current opacity-85" />
                </div>
            </div>

            <button type="button" className="mb-3 flex h-12 w-full items-center gap-2.5 rounded-xl border border-gray-300 bg-gray-100 px-3.5 text-left text-gray-900">
                <span className="text-gray-800 [&_svg]:h-[14px] [&_svg]:w-[14px]">
                    <SearchIcon />
                </span>
                <span className="flex-1 text-[0.95rem]">Search</span>
                <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-gray-400 bg-gray-200 px-1.5 text-[0.74rem] font-bold text-gray-1000">K</span>
            </button>

            <div className="flex h-12 items-center justify-between rounded-xl border border-gray-300 bg-gray-100 px-3.5 text-[0.95rem] font-semibold text-gray-1000">
                <span>Framework</span>
                <svg className="h-4 w-4 shrink-0 text-gray-800" width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.13523 5.15803C3.32412 4.96914 3.63031 4.96914 3.8192 5.15803L7.49997 8.8388L11.1807 5.15803C11.3696 4.96914 11.6758 4.96914 11.8647 5.15803C12.0536 5.34693 12.0536 5.65312 11.8647 5.84201L7.84196 9.86474C7.65307 10.0536 7.34688 10.0536 7.15799 9.86474L3.13523 5.84201C2.94633 5.65312 2.94633 5.34693 3.13523 5.15803Z" fill="currentColor"/>
                </svg>
            </div>
        </div>
    );
}




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
             <div className='w-full flex-none px-3 pb-16 pt-3 lg:w-[272px]'>
                <DocsSidebarHeader />
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
