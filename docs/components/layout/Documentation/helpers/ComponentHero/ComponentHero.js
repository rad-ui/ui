"use client"
import CodeBlock from '../CodeBlock';
import { useState, useEffect } from 'react'
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
   
    let data =  initializeTabs(codeUsage)
    const [activeTab, setActiveTab] = useState(data[0]?.value)


    return <div>
        {title &&  <BookMarkLink id={title}> <Heading>{title}</Heading> </BookMarkLink>}
        <div className='bg-gradient-to-r from-green-50 to-gray-200  border border-gray-500 shadow-md p-10 rounded-tl-md rounded-tr-md text-black flex items-center justify-center justify-evenly overflow-x-auto '>
            {children}
        </div>
        <div>
            <div>
                <Tabs.Root defaultValue={activeTab} onValueChange={(value)=>{
                    setActiveTab(value)
                }}>
                    <Tabs.List>
                        {data.map((tab, index) => (
                            <Tabs.Trigger key={index} value={tab.value}>{tab.label}</Tabs.Trigger>
                        ))}
                    </Tabs.List>
                    {data.map((tab, index) => (
                            <Tabs.Content key={index} value={tab.value}>{tab.content}</Tabs.Content>
                        ))}
                </Tabs.Root>
            </div>
        </div>
    </div>

}

export default ComponentHero;