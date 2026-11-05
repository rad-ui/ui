const data = {
    name: "Indicator",
    description: "Renders the checkmark icon when the checkbox is checked.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "className", info_tooltips: "Additional CSS classes for the indicator." }, type: "string", default: '""' },
    {
      prop: {
        name: "forceMount",
        info_tooltips: "Keep it rendered while unchecked (with data-state=\"unchecked\"), for exit animations or reserved space."
      },
      type: "boolean",
      default: "false",
    }
  ]
}

export default data
