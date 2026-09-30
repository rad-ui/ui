"use client"
import CodeBlock from '../CodeBlock';
import { useMemo } from 'react'
import Heading from "@radui/ui/Heading"
import { BookMarkLink } from '@/components/layout/Documentation/utils';
import { docsSectionBlockClassName, docsSectionHeadingClassName, docsSurfaceClassName } from '../../shared';

import CodeTabs from './CodeTabs';

const ComponentHero = ({ children, title='', codeUsage = {} }) => {

    const initializeTabs = (codeUsage) => {
        const tabs = []
        for (const key in codeUsage) {
            if (Object.hasOwnProperty.call(codeUsage, key)) {
                let language = key
                if(key === 'javascript') {
                    language = 'tsx'
                }
                tabs.push({
                    label: key,
                    value: key,
                    content: <CodeBlock className="my-0" language={language}>{codeUsage[key]?.code}</CodeBlock>,
                })
            }
        }
        return tabs
    }

    const data = useMemo(() => initializeTabs(codeUsage), [codeUsage]);

    return <section className={docsSectionBlockClassName}>
        {title && (
            <BookMarkLink id={title}>
                <Heading as="h2" className={docsSectionHeadingClassName}>{title}</Heading>
            </BookMarkLink>
        )}
        <div className={docsSurfaceClassName}>
            <div className="flex items-center gap-2 border-b border-gray-300 bg-gray-100 px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-gray-500" />
                <span className="h-2 w-2 rounded-full bg-gray-500" />
                <span className="h-2 w-2 rounded-full bg-gray-500" />
                <span className="ml-2 font-mono text-[11px] tracking-wide text-gray-800">
                    preview
                </span>
            </div>
            <div className='flex items-center justify-center overflow-x-auto bg-[linear-gradient(180deg,var(--rad-ui-surface-subtle)_0%,var(--rad-ui-surface-canvas)_100%)] p-8 sm:p-10'>
                {children}
            </div>
            <div className="border-t border-gray-300 px-4 pb-4 pt-3 sm:px-5">
                <CodeTabs data={data} />
            </div>
        </div>
    </section>
}

export default ComponentHero;
