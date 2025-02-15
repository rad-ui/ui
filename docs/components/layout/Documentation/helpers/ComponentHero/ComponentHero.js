"use client"
import CodeBlock from '../CodeBlock';
import { useState } from 'react'
import Tabs from "@radui/ui/Tabs"
import Heading from "@radui/ui/Heading"
import { BookMarkLink } from '@/components/layout/Documentation/utils';


const TabContainer = ({ children }) => {
    return <div className='px-2'>
        {children}
    </div>
}

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


const ComponentHero = ({ children, title='', codeUsage = {} }) => {
    const [activeTab, setActiveTab] = useState('tab1')
    const data = initializeTabs(codeUsage)

    return <div>
        {title &&  <BookMarkLink id={title}> <Heading>{title}</Heading> </BookMarkLink>}
        <div className='bg-gradient-to-r from-green-50 to-gray-200  border border-gray-500 shadow-md p-10 rounded-tl-md rounded-tr-md text-black flex item-center justify-center justify-evenly overflow-x-auto'>
            {children}
        </div>
        <div>
            <Tabs tabs={data} />
        </div>
    </div>

}

export default ComponentHero;