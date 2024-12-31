"use client"

import path from 'path';
import NavItem from './NavItem.js'
import { usePathname } from 'next/navigation';

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
            }
        ]
    }
]


const Navigation = () => {
    // get path from ssr
    const pathname = usePathname();

    return <div className='border-box px-1 overflow-y-auto hidden lg:block'>
        <div className='flex-none' style={{ width: "240px", height: "80vh" }}>
            {sections.map((section, i) => {
                return <div key={i}>
                    <div className='px-2 py-2 font-bold text-md text-gray-1000'>{section.title}</div>
                    <ul>
                        {section.items.map((item, itemKey) => {
                            return <li key={itemKey}>
                                <NavItem item={item} path={pathname} />
                            </li>
                        })}
                    </ul>
                </div>
            })}
        </div>
    </div>
}

export default Navigation;