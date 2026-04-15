const data = {
    name: "Link",
    description: "A tab link that navigates to a URL.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "href*", info_tooltips: "The URL the tab link navigates to." }, type: "string", default: "--" },
        { prop: { name: "active", info_tooltips: "Marks this tab as the currently active one." }, type: "boolean", default: "false" },
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: '""' }
    ]
}

export default data
