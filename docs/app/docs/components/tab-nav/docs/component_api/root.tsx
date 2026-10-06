const data = {
    name: "Root",
    description: "The root TabNav container. Renders a <nav> landmark.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value", info_tooltips: "Controlled current link value." }, type: "string", default: "--" },
        { prop: { name: "defaultValue", info_tooltips: "Initial current link value (uncontrolled)." }, type: "string", default: "--" },
        { prop: { name: "onValueChange", info_tooltips: "Called when a link is activated (click or Enter). Moving focus with arrow keys does not change the value." }, type: "(value: string) => void", default: "--" },
        { prop: { name: "orientation", info_tooltips: "Arrow-key direction for roving focus." }, type: "'horizontal' | 'vertical'", default: "'horizontal'" },
        { prop: { name: "loop", info_tooltips: "Whether arrow-key focus wraps around." }, type: "boolean", default: "true" },
        { prop: { name: "aria-label", info_tooltips: "Accessible name for the navigation landmark. Recommended when the page has more than one <nav>." }, type: "string", default: "--" },
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: '""' }
    ]
}

export default data
