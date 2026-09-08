const data = {
    name: "Item",
    description: "A single tree node rendered from an item object.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "item*", info_tooltips: "Node data for this item. Use item.items for children and item.expanded for the initial expanded state." }, type: "{ label: string; expanded?: boolean; items?: object[] }", default: "--" },
        { prop: { name: "level", info_tooltips: "Zero-based nesting level. Nested items receive this automatically." }, type: "number", default: "0" },
        { prop: { name: "isSelected", info_tooltips: "Marks this item as selected when selection is managed externally." }, type: "boolean", default: "false" },
        { prop: { name: "getIsSelected", info_tooltips: "Returns whether a child item should be marked selected." }, type: "(item) => boolean", default: "--" },
        { prop: { name: "onToggleSelect", info_tooltips: "Called with the internal item id and node data when an item is selected." }, type: "(id, item) => void", default: "--" },
        { prop: { name: "className", info_tooltips: "Additional CSS classes." }, type: "string", default: '""' }
    ]
}

export default data
