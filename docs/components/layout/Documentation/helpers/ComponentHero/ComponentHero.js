"use client"
import CodeBlock from '../CodeBlock';
import { useState, useEffect, useMemo } from 'react'
import Tabs from "@radui/ui/Tabs"
import Heading from "@radui/ui/Heading"
import { BookMarkLink } from '@/components/layout/Documentation/utils';
import { docsSectionBlockClassName } from '../../shared';

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
                    content: <CodeBlock language={language} showHeader={false}>{codeUsage[key]?.code}</CodeBlock>,
                })
            }
        }
        return tabs
    }

    // Use useMemo to avoid recalculating tabs unnecessarily
    const data = useMemo(() => initializeTabs(codeUsage), [codeUsage]);

    return <section className={docsSectionBlockClassName}>
        {title && <BookMarkLink id={title}> <Heading as="h2">{title}</Heading> </BookMarkLink>}
        <div className='flex items-center justify-center overflow-x-auto rounded-t-[18px] border border-b-0 border-[var(--rad-ui-border-soft)] bg-gradient-to-b from-[var(--rad-ui-surface-subtle)] to-[var(--rad-ui-surface-canvas)] p-8'>
            {children}
        </div>
        <div className="rounded-b-[18px]">
            <CodeTabs data={data} />
        </div>
    </section>
}

export default ComponentHero;
