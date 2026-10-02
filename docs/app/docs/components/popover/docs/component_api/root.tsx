const data = {
    name: "Root",
    description: "The root component for the Popover. Owns the open state and the parts rendered inside it.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "open", info_tooltips: "Controls the open state of the popover when used as a controlled component." }, type: "boolean", default: "--" },
        { prop: { name: "defaultOpen", info_tooltips: "Initial open state when uncontrolled." }, type: "boolean", default: "false" },
        { prop: { name: "onOpenChange", info_tooltips: "Called with the next open state whenever it changes." }, type: "(open: boolean) => void", default: "--" },
        { prop: { name: "modal", info_tooltips: "Traps focus and marks outside content inert while open." }, type: "boolean", default: "false" },
        { prop: { name: "className", info_tooltips: "Class name applied to the Popover root element." }, type: "string", default: "--" },
        { prop: { name: "customRootClass", info_tooltips: "Override the generated root class namespace." }, type: "string", default: '""' }
    ]
}

export default data