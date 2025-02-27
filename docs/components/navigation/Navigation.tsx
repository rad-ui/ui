"use client"

import NavItem from './NavItem.js'
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

import { NavBarContext } from '@/components/Main/NavBar/NavBarContext';

const sections = [
    {
        type: "CATEGORY",
        items: [
            { title: "Documentation", path: "/docs/first-steps/introduction" },
            { title: "Showcase", path: "/showcase/music-app" }
        ]
    }
]


const Category = ({ categoryItem, pathname, setIsDocsNavOpen }) => {
    return <div className="px-2">
        <div className='px-2 py-2 font-medium text-xs text-gray-1000'>{categoryItem.title}</div>
        <ul>
            {categoryItem.items.map((item, itemKey) => {
                return <li key={itemKey} onClick={() => setIsDocsNavOpen(false)}>
                    <NavItem item={item} path={pathname} setIsDocsNavOpen={setIsDocsNavOpen} />
                </li>
            })}
        </ul>
    </div>
}



const Navigation = ({ customSections, hideOnDesktop = true }: { customSections?: any, hideOnDesktop?: boolean }) => {

    // get path from ssr
    const pathname = usePathname();
    const {  setIsDocsNavOpen } = useContext(NavBarContext) as { isDocsNavOpen: boolean, setIsDocsNavOpen: (isDocsNavOpen: boolean) => void };

    const finalSections = customSections || sections;

    return <div className='flex-none h-full pb-20 w-full lg:w-[240px] lg:bg-transparent'>
        {finalSections.map((section, i) => {
            const isCategory = section.type === "CATEGORY";
            if (isCategory) {
                return <Category key={i} categoryItem={section} pathname={pathname} setIsDocsNavOpen={setIsDocsNavOpen} />
            }
        })}
    </div>
}

export default Navigation;