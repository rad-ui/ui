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
                    content: <CodeBlock className="my-0" language={language}>{codeUsage[key]?.code}</CodeBlock>,
                })
            }
        }
        return tabs
    }

    // Use useMemo to avoid recalculating tabs unnecessarily
    const data = useMemo(() => initializeTabs(codeUsage), [codeUsage]);

    return <section className={docsSectionBlockClassName}>
        {title && <BookMarkLink id={title}> <Heading as="h2">{title}</Heading> </BookMarkLink>}
        <div className="overflow-hidden rounded-[18px] border border-[var(--rad-ui-border-soft)] bg-[var(--rad-ui-surface-canvas)]">
            <div className='flex items-center justify-center overflow-x-auto bg-gradient-to-b from-[var(--rad-ui-surface-subtle)] to-[var(--rad-ui-surface-canvas)] p-8'>
                {children}
            </div>
            <div className="border-t border-[var(--rad-ui-border-soft)] px-5 pb-5 pt-4">
                <CodeTabs data={data} />
            </div>
        </div>
    </section>
}

export default ComponentHero;
