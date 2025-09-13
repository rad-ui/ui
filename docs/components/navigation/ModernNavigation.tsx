'use client'
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { NavBarContext } from '@/components/Main/NavBar/NavBarContext';
import docsSections from "@/app/docs/docsNavigationSections"
import ScrollArea from "@radui/ui/ScrollArea"
import Category from './Category'
import Badge from "@radui/ui/Badge"
import Text from "@radui/ui/Text"

const ModernNavigation = ({ customSections }: { customSections?: any }) => {
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
    
    const pathname = usePathname();
    const { setIsDocsNavOpen } = useContext(NavBarContext) as { 
        isDocsNavOpen: boolean, 
        setIsDocsNavOpen: (isDocsNavOpen: boolean) => void 
    };

    const [sections, setSections] = useState(docsSections);

    useEffect(() => {
        if (pathname.includes("/docs/")) {
            setSections(docsSections)
        } else {
            setSections(defaultSections)
        }
    }, [pathname])

    return (
        <ScrollArea.Root className="h-full">
            <ScrollArea.Viewport style={{ height: "100%" }}>
                <div className="min-w-[240px]">
                    <div className='flex-none pb-20 w-full lg:w-[240px] lg:bg-transparent'>
                        {/* Quick Links */}
                        <div className="mb-8 p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-lg border border-gray-200">
                            <Text className="font-semibold text-gray-1000 mb-3">Quick Links</Text>
                            <div className="space-y-2">
                                <a 
                                    href="/docs/first-steps/installation" 
                                    className="block text-sm text-gray-950 hover:text-gray-1000"
                                >
                                    Installation
                                </a>
                                <a 
                                    href="/playground" 
                                    className="block text-sm text-gray-950 hover:text-gray-1000"
                                >
                                    Playground
                                </a>
                                <a 
                                    href="/sponsors" 
                                    className="block text-sm text-gray-950 hover:text-gray-1000"
                                >
                                    Sponsors
                                </a>
                            </div>
                        </div>

                        {/* Navigation Sections */}
                        {sections.map((section, i) => {
                            const isCategory = section.type === "CATEGORY";
                            if (isCategory) {
                                return (
                                    <div key={i} className="mb-6">
                                        <Category 
                                            categoryItem={section} 
                                            pathname={pathname} 
                                            setIsDocsNavOpen={setIsDocsNavOpen} 
                                        />
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={i} className='h-10 w-full bg-gray-100 rounded-lg flex items-center justify-center'>
                                        <Text className="text-gray-950">Coming Soon</Text>
                                    </div>
                                )
                            }
                        })}
                    </div> 
                </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar orientation='vertical'>
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
        </ScrollArea.Root>
    )
}

export default ModernNavigation;
