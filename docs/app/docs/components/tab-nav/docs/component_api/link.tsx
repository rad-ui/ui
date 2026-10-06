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
        { prop: { name: "value", info_tooltips: "Identifies the link. When it matches the root value, the link is current (aria-current=\"page\", data-state=\"active\")." }, type: "string", default: "--" },
        { prop: { name: "active", info_tooltips: "Marks this link as the current page, overriding the root value. Useful when the active link comes from your router." }, type: "boolean", default: "--" },
        { prop: { name: "disabled", info_tooltips: "Removes href, skips the link during arrow-key navigation, and sets data-disabled." }, type: "boolean", default: "false" },
        { prop: { name: "asChild", info_tooltips: "Merge props onto the child element (e.g. a router Link)." }, type: "boolean", default: "false" },
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: '""' }
    ]
}

export default data
