"use client"
import CodeBlock from '../CodeBlock';
import { useState, useEffect, useMemo } from 'react'
import Tabs from "@radui/ui/Tabs"
import Heading from "@radui/ui/Heading"
import { BookMarkLink } from '@/components/layout/Documentation/utils';

import CodeTabs from './CodeTabs';

const ComponentHero = ({ children, title='', codeUsage = {} }) => {

    const initializeTabs = (codeUsage) => {
        const tabs = []
        for (const key in codeUsage) {
            if (Object.hasOwnProperty.call(codeUsage, key)) {
                let language = key
                if(key === 'javascript') {
                    language = 'jsx'
                }
                const element = codeUsage[key];
                tabs.push({
                    label: key,
                    value: key,
                    content: <CodeBlock language={language} >{codeUsage[key]?.code}</CodeBlock>,
                })
            }
        }
        return tabs
    }

    // Use useMemo to avoid recalculating tabs unnecessarily
    const data = useMemo(() => initializeTabs(codeUsage), [codeUsage]);

    return <div>
        {title && <BookMarkLink id={title}> <Heading>{title}</Heading> </BookMarkLink>}
        <div className='bg-gradient-to-r from-green-50 to-gray-200  border border-gray-500 shadow-md p-10 rounded-tl-md rounded-tr-md text-black flex items-center justify-center justify-evenly overflow-x-auto '>
            {children}
        </div>
        <div>
            <div>
                <CodeTabs data={data} />
            </div>
        </div>
    </div>
}

export default ComponentHero;