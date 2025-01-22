const PAGE_NAME = 'TOGGLE_DOCS'
import Documentation from "@/components/layout/Documentation/Documentation"

import ToggleWrapper from "./ToggleWrapper"


import SEO from "../../docsIndex"
export const metadata = SEO.getMetadata(PAGE_NAME)

import codeUsage from "./docs/codeUsage"

const ToggleDocs = () => {
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
        <Documentation currentPage={PAGE_NAME} title='Toggle' description={`
            Toggles are used to switch between two states. They are commonly used in settings, forms, and more.
        `}>
            <Documentation.ComponentHero codeUsage={codeUsage}>
                  <ToggleWrapper/>
            </Documentation.ComponentHero>
            <div className="max-w-screen-md">
                <Documentation.Table columns={columns} data={data} />
            </div>
        </Documentation>
    </div>
}

export default ToggleDocs;