const data = {
    name: "Root",
    description: "The root Tree component.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "aria-label", info_tooltips: "Accessible label for the tree when no visible label is present." }, type: "string", default: "--" },
        { prop: { name: "aria-labelledby", info_tooltips: "ID of an element that labels the tree." }, type: "string", default: "--" },
        { prop: { name: "loop", info_tooltips: "Whether arrow key navigation wraps from the last visible item to the first, and from the first to the last." }, type: "boolean", default: "true" },
    {
      prop: {
        name: "expanded",
        info_tooltips: "Keys of the expanded items (controlled). An item's key is its id, else value, else label."
      },
      type: "string[]",
      default: "--",
    },
    {
      prop: {
        name: "defaultExpanded",
        info_tooltips: "Keys of the items expanded at first."
      },
      type: "string[]",
      default: "--",
    },
    {
      prop: {
        name: "onExpandedChange",
        info_tooltips: "Called with the expanded keys."
      },
      type: "(expanded) => void",
      default: "--",
    },
    {
      prop: {
        name: "dir",
        info_tooltips: "In rtl, ArrowLeft expands and ArrowRight collapses."
      },
      type: "\"ltr\" | \"rtl\"",
      default: "--",
    }
  ]
}

export default data
