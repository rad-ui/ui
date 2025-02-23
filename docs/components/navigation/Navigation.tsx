"use client"

import NavItem from './NavItem.js'
import { usePathname } from 'next/navigation';
import { useContext } from 'react';

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


const HamburgerIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props} >
      <g>
        <path
          strokeLinecap="round"
          d="M13.5 2H.5M13.5 7H.5M13.5 12H.5"
          style={{
            stroke: "#ab4aba",
            strokeWidth: 2,
            strokeDasharray: "none",
            strokeLinecap: "round",
            strokeDashoffset: 0,
            strokeLinejoin: "round",
            strokeMiterlimit: 4,
            fill: "#ab4aba",
            fillRule: "nonzero",
            opacity: 1,
          }}
          transform="matrix(1.43 0 0 1.43 1.99 1.99)"
        />
      </g>
    </svg>
  )

  const XIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        // xmlSpace="preserve"
        width={18}
        height={18}
        fill='#ab4aba'
        stroke='#ab4aba'
        viewBox="0 0 460.775 460.775"
        {...props}
    >
    <path d="M285.08 230.397 456.218 59.27c6.076-6.077 6.076-15.911 0-21.986L423.511 4.565a15.55 15.55 0 0 0-21.985 0l-171.138 171.14L59.25 4.565a15.551 15.551 0 0 0-21.985 0L4.558 37.284c-6.077 6.075-6.077 15.909 0 21.986l171.138 171.128L4.575 401.505c-6.074 6.077-6.074 15.911 0 21.986l32.709 32.719a15.555 15.555 0 0 0 21.986 0l171.117-171.12 171.118 171.12a15.551 15.551 0 0 0 21.985 0l32.709-32.719c6.074-6.075 6.074-15.909 0-21.986L285.08 230.397z" />
  </svg>
  )


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



const Navigation = ({customSections, hideOnDesktop}:{customSections?: any, hideOnDesktop?: boolean}) => {
    // get path from ssr
    const pathname = usePathname();

    const {isDocsNavOpen,setIsDocsNavOpen} = useContext(NavBarContext) as {isDocsNavOpen: boolean, setIsDocsNavOpen: (isDocsNavOpen: boolean) => void};

   

    const finalSections = customSections || sections;
    const mobileClasses = "fixed w-full lg:block lg:w-auto"
    const desktopClasses = hideOnDesktop?"flex h-full lg:hidden":""

    return <div className={`${isDocsNavOpen ? mobileClasses : ""}  lg:relative lg:w-full lg:block border-box overflow-y-auto overflow-x-hidden flex flex-col h-full z-50`}>
        <div className={`${isDocsNavOpen ? "" : "hidden"} ${desktopClasses}`}>
            <div className='flex-none h-full pb-20 w-full lg:w-[240px] bg-gray-50 lg:bg-transparent'>
                {finalSections.map((section, i) => {
                    const isCategory = section.type === "CATEGORY";
                    if(isCategory){
                        return <Category key={i} categoryItem={section} pathname={pathname} setIsDocsNavOpen={setIsDocsNavOpen} />
                    }
                    // return <div key={i}>
                    //     <div className='px-2 py-2 font-bold text-md text-gray-1000'>{section.title}</div>
                    //     <ul>
                    //         {section.items.map((item, itemKey) => {
                    //             return <li key={itemKey} onClick={() => setIsDocsNavOpen(false)}>
                    //                 <NavItem item={item} path={pathname} setIsDocsNavOpen={setIsDocsNavOpen} />
                    //             </li>
                    //         })}
                    //     </ul>
                    // </div>
                })}
            </div>
        </div>
    </div>
}

export default Navigation;