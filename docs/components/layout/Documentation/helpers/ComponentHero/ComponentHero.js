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

    return <div className="mt-8">
        {title && <BookMarkLink id={title}> <Heading>{title}</Heading> </BookMarkLink>}
        <div className='flex items-center justify-center overflow-x-auto rounded-t-[18px] border border-b-0 border-gray-300 bg-gradient-to-b from-gray-100 to-gray-50 p-8'>
            {children}
        </div>
        <div className="overflow-hidden rounded-b-[18px] border border-gray-300 bg-gray-50">
            <CodeTabs data={data} />
        </div>
    </div>
}

export default ComponentHero;
