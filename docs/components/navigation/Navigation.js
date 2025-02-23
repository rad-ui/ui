"use client"

import path from 'path';
import NavItem from './NavItem.js'
import { usePathname } from 'next/navigation';
import { useContext, useEffect } from 'react';

import { NavBarContext } from '@/components/Main/NavBar/NavBarContext';

const sections = [
    {
        title: "First Steps",
        items: [
            {
                title: "Introduction",
                path: "/docs/first-steps/introduction"
            },
            {
                title: "Installation",
                path: "/docs/first-steps/installation"
            },
            {
                title: "Usage",
                path: "/docs/first-steps/usage"
            }
        ]
    },
    {
        title: "Principles",
        items: [
            {
                title: "Accessibility",
                path: "/docs/principles/accessibility"
            }
        ]
    },
    {
        title: "Components",
        items: [
            {
                title:"Accordion",
                path:"/docs/components/accordion",
                is_new:true
            },
            {
                title: "Avatar",
                path: "/docs/components/avatar"
            },
            {
                title: "AvatarGroup",
                path: "/docs/components/avatar-group",
                is_new:true
            },
            {
                title: "AspectRatio",
                path: "/docs/components/aspect-ratio",
                is_new:true
            },
            {
                title: "Badge",
                path: "/docs/components/badge"
            },
            {
                title: "Button",
                path: "/docs/components/button"
            },
            {   
                title: "BlockQuote",
                path: "/docs/components/blockquote"
            },
            {
                title: "Callout",
                path: "/docs/components/callout",
                is_new:true
            },
            {
                title: "Card",
                path: "/docs/components/card"
            },

            {
                title: "Code",
                path: "/docs/components/code"
            },
            {
                title: "Em",
                path: "/docs/components/em"
            },
            {
                title: "Heading",
                path: "/docs/components/heading"
            },
            {
                title: "Text",
                path: "/docs/components/text",
                is_new:true
            },
            {
                title: "Kbd",
                path: "/docs/components/kbd",
                is_new:true
            },
            {
                title: "Progress",
                path: "/docs/components/progress",
                is_new:true
            },
           
            {
                title: "Separator",
                path: "/docs/components/separator"
            },
            {
                title: "Switch",
                path: "/docs/components/switch"
            },
            {
                title: "Strong",
                path: "/docs/components/strong",
                is_new:true
            },
            // {
            //     title:"Checkbox",
            //     path:"/docs/components/checkbox"
            // },
            // {
            //     title:"Collapsible",
            //     path:"/docs/components/collapsible"
            // },
            // {
            //     title:"ContextMenu",
            //     path:"/docs/components/context-menu"
            // },
            // {
            //     title:"Dialog",
            //     path:"/docs/components/dialog"
            // },
            // {
            //     title: "Dropdown",
            //     path: "/docs/components/dropdown"
            // },
            // {
            //     title:"Form",
            //     path:"/docs/components/form"
            // },
            // {
            //     title:"Popover",
            //     path:"/docs/components/popover"
            // },
            // {
            //     title:"Progress",
            //     path:"/docs/components/progress"
            // },
            // {
            //     title:"Radio",
            //     path:"/docs/components/radio"
            // },
            // {
            //     title:"ScrollArea",
            //     path:"/docs/components/scroll-area"
            // }
            {
                title: "Toggle",
                path : "/docs/components/toggle",
                is_new:true
            },
            {
                title: "ToggleGroup",
                path: "/docs/components/toggle-group",
                is_new:true
            },
            {
                title: "Tooltip",
                path: "/docs/components/tooltip"
            },
            {
                title: "VisuallyHidden",
                path: "/docs/components/visually-hidden",
                is_new:true
            }
        ]
    },
    {
        title: "Contributing",
        items: [
            {
                title: "Before you start",
                path: "/docs/contributing/before-you-start"
            },
            {
                title: "Setting up dev environment",
                path: "/docs/contributing/setting-up-dev-environment"
            },
            {
                title: "Contributing to Rad UI",
                path: "/docs/contributing/contributing-to-rad-ui"
            }
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



const Navigation = ({customSections}) => {
    // get path from ssr
    const pathname = usePathname();

    const {isDocsNavOpen,setIsDocsNavOpen} = useContext(NavBarContext);

    const mobileClasses = "fixed w-full lg:block lg:w-auto z-10"

    const finalSections = customSections || sections;

    return <div className={`${isDocsNavOpen ? mobileClasses : ""} lg:relative lg:w-full lg:block border-box overflow-y-auto overflow-x-hidden flex flex-col h-full`}>
        <div className={`${isDocsNavOpen ? "block  " : "hidden lg:block"}`}>
            <div className='flex-none pb-20 w-full lg:w-[240px] bg-gray-50 lg:bg-transparent'>
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