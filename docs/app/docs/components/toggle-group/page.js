const PAGE_NAME = 'TOGGLE_GROUP_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"
import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import ToggleGroupWrapper from "./ToggleGroupWrapper"

import codeUsage from "./docs/codeUsage"

const ToggleGroupDocs = () => {
    const columns = [
        {name: 'Prop', id: 'prop'},
        {name: 'Type', id: 'type'},
        {name: 'Default', id: 'default'},
        {name: 'Description', id: 'description'},
    ];

    const data = [
        {prop: 'color', type: 'string', default: 'null', description: 'Accent Color of the toggled item', id: 'color'},
        // {prop: 'pressed', type: 'boolean', default: 'false', description: 'Accent Color of the toggled item', id: 'pressed'},
        // {prop: 'disabled', type: 'boolean', default: 'null', description: 'Accent Color of the toggled item', id: 'disabled'},
    ];
    return <div>
        <Documentation currentPage={PAGE_NAME} title='ToggleGroup' description={`
           ToggleGroup is a component that allows you to group multiple toggles together. Useful for when you want to allow users to select multiple options. For example, a user can select multiple filters for a search.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                <div className='text-gray-900 bg-gray-50 rounded shadow-lg font-normal p-5 space-y-1'>
                        <ToggleGroupWrapper/>
                </div>
            </Documentation.ComponentHero>
            
            <div>
                <Documentation.Table columns={columns} data={data} />
            </div>
        </Documentation>
    </div>
}

export default ToggleGroupDocs;