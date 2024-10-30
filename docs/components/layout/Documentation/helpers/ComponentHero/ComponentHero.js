"use client"
import CodeBlock from '../CodeBlock';

import { useState } from 'react'



import Tabs from "@radui/ui/Tabs"



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


const ComponentHero = ({ children, codeUsage = {} }) => {
    const [activeTab, setActiveTab] = useState('tab1')
    const data = initializeTabs(codeUsage)

    return <div>
        <div className='bg-gradient-to-r from-indigo-900 to-purple-900 p-10 rounded-tl-md rounded-tr-md text-black flex items-center justify-center'>
            {children}
        </div>

        <div>
            <Tabs tabs={data} />
        </div>
    </div>

}

export default ComponentHero;