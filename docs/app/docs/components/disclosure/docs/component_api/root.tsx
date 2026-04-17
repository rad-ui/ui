const data = {
    name: "Root",
    description: "The root Disclosure container.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "items", info_tooltips: "Array of { title, content } for the convenience wrapper." }, type: "{ title: string, content: ReactNode }[]", default: "--" },
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: '""' }
    ]
}

export default data
