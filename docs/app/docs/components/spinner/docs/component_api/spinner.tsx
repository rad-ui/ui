const data = {
    name: "Spinner",
    description: "An animated loading indicator.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "size", info_tooltips: "Controls the size of the spinner." }, type: "string", default: '""' },
        { prop: { name: "customRootClass", info_tooltips: "Override the root CSS class." }, type: "string", default: '""' },
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: '""' },
        { prop: { name: "aria-label", info_tooltips: "Accessible name. The spinner is a role=\"status\" region named \"Loading\" by default." }, type: "string", default: '"Loading"' },
        { prop: { name: "aria-labelledby", info_tooltips: "Names the spinner from another element instead of aria-label." }, type: "string", default: "--" },
        { prop: { name: "aria-hidden", info_tooltips: "Marks the spinner decorative (removes the status role and name), e.g. inside a button that already has a label." }, type: "boolean", default: "false" }
    ]
}

export default data
