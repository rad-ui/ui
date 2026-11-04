const data = {
    name: "Root",
    description: "The root checkbox element.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "checked", info_tooltips: "Controlled checked state." }, type: "boolean", default: "false" },
        { prop: { name: "defaultChecked", info_tooltips: "Initial checked state (uncontrolled)." }, type: "boolean", default: "false" },
        { prop: { name: "disabled", info_tooltips: "Disables the checkbox." }, type: "boolean", default: "false" },
        { prop: { name: "required", info_tooltips: "Marks the checkbox as required in a form." }, type: "boolean", default: "false" },
        { prop: { name: "onCheckedChange", info_tooltips: "Callback when checked state changes." }, type: "function", default: "--" },
        { prop: { name: "color", info_tooltips: "Accent color applied to the checkbox." }, type: "string", default: '""' },
        { prop: { name: "size", info_tooltips: "Size variant." }, type: "string", default: '""' },
        { prop: { name: "variant", info_tooltips: "Style variant." }, type: "string", default: '""' },
        { prop: { name: "customRootClass", info_tooltips: "Override the root CSS class." }, type: "string", default: '""' },
        { prop: { name: "readOnly", info_tooltips: "Show the state without letting the user change it; stays focusable and in the form, with aria-readonly." }, type: "boolean", default: "false" },
    {
      prop: {
        name: "indeterminate",
        info_tooltips: "Show the mixed state regardless of checked."
      },
      type: "boolean",
      default: "false",
    },
    {
      prop: {
        name: "uncheckedValue",
        info_tooltips: "Value submitted under name while unchecked."
      },
      type: "string",
      default: "--",
    },
    {
      prop: {
        name: "form",
        info_tooltips: "id of a form elsewhere in the page."
      },
      type: "string",
      default: "--",
    },
    {
      prop: {
        name: "inputRef",
        info_tooltips: "Ref to the hidden checkbox input."
      },
      type: "Ref<HTMLInputElement>",
      default: "--",
    }
  ]
}

export default data
