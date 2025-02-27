"use client"

import NavItem from './NavItem.js'
import { usePathname } from 'next/navigation';
import { useContext, useState, useEffect, useCallback } from 'react';

import { NavBarContext } from '@/components/Main/NavBar/NavBarContext';

const sections = [
    {
        type: "CATEGORY",
        items: [
            {title: "Documentation", path: "/docs/first-steps/introduction"},
            {title: "Showcase", path: "/showcase/music-app"}
        ]
    }
]


const Category = ({categoryItem,pathname,setIsDocsNavOpen}) => {
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

// Simple debounce function
function debounce(func: Function, wait: number) {
    let timeout: NodeJS.Timeout;
    return function(...args: any[]) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}



const Navigation = ({customSections, hideOnDesktop=true}:{customSections?: any, hideOnDesktop?: boolean}) => {

    // get path from ssr
    const pathname = usePathname();
    const {isDocsNavOpen,setIsDocsNavOpen} = useContext(NavBarContext) as {isDocsNavOpen: boolean, setIsDocsNavOpen: (isDocsNavOpen: boolean) => void};

    const [windowSize, setWindowSize] = useState(0);

    const handleResize =useCallback( debounce(() => {
        setWindowSize(window.innerWidth);
        if(windowSize > 1024){
            setIsDocsNavOpen(true)
        }else{
            setIsDocsNavOpen(false)
        }
    }, 300),[])

    useEffect(() => {
        // Set initial window size
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const finalSections = customSections || sections;

    return <div className={`${isDocsNavOpen ? "block" : "hidden"}  lg:relative lg:w-full lg:block border-box overflow-y-auto overflow-x-hidden flex flex-col h-full z-50`}>
        <div className={`${isDocsNavOpen ? "" : ""}`}>
            <div className='flex-none h-full pb-20 w-full lg:w-[240px] bg-gray-50 lg:bg-transparent'>
                {finalSections.map((section, i) => {
                    const isCategory = section.type === "CATEGORY";
                    if(isCategory){
                        return <Category key={i} categoryItem={section} pathname={pathname} setIsDocsNavOpen={setIsDocsNavOpen} />
                    }
                })}
            </div>
        </div>
    </div>
}

export default Navigation;