'use client'
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

import { NavBarContext } from '@/components/Main/NavBar/NavBarContext';
import docsSections from "@/app/docs/docsNavigationSections";
import ScrollArea from "@radui/ui/ScrollArea";
import Category from './Category';





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

    const [sections, setSections] = useState(docsSections);
    const [query, setQuery] = useState("");
    const versions = ["0.0.47", "0.0.46"];
    const [version, setVersion] = useState(versions[0]);
    // customSections || sections;

    useEffect(() => {
        if (pathname.includes("/docs/")) {
            setSections(docsSections)
        }
        else {
              setSections(defaultSections)
          }
      }, [pathname])
      const filteredSections = sections
          .map(section => ({
              ...section,
              items: section.items.filter((item: any) =>
                  item.title.toLowerCase().includes(query.toLowerCase())
              ),
          }))
          .filter(section => section.items.length > 0);

      return <ScrollArea.Root>
          <ScrollArea.Viewport style={{ height: "100%" }}>
            <div className="min-w-[240px]">
              <div className="p-4 flex flex-col gap-2">
                  <input
                      aria-label="Search documentation"
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search..."
                      className="px-2 py-1 text-sm rounded border"
                  />
                  <select
                      aria-label="Select docs version"
                      value={version}
                      onChange={(e) => setVersion(e.target.value)}
                      className="px-2 py-1 text-sm rounded border"
                  >
                      {versions.map(v => (
                          <option key={v} value={v}>{v}</option>
                      ))}
                  </select>
              </div>
               <div className='flex-none pb-20 w-full lg:w-[240px] lg:bg-transparent'>
                  {filteredSections.map((section, i) => {
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