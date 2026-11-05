const data = {
    name: "Content",
    description: "The content that is shown or hidden.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: '""' },
        { prop: { name: "hiddenUntilFound", info_tooltips: "Keep closed content searchable with the browser's find-in-page; a match opens it." }, type: "boolean", default: "false" },
        { prop: { name: "forceMount", info_tooltips: "Keep the content mounted while closed." }, type: "boolean", default: "false" }
    ]
}

export default data
