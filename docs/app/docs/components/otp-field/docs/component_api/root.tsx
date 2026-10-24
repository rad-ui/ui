const data = {
    name: "Root",
    description: "Holds the code and renders a group of slots plus a hidden input for forms.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "value", info_tooltips: "Controlled code." }, type: "string", default: "--" },
        { prop: { name: "defaultValue", info_tooltips: "Initial code when uncontrolled." }, type: "string", default: "\"\"" },
        { prop: { name: "onValueChange", info_tooltips: "Called with the code whenever it changes." }, type: "(value: string) => void", default: "--" },
        { prop: { name: "length", info_tooltips: "Number of characters." }, type: "number", default: "6" },
        { prop: { name: "validationType", info_tooltips: "Characters each slot accepts." }, type: "'numeric' | 'alpha' | 'alphanumeric' | 'none'", default: "'numeric'" },
        { prop: { name: "type", info_tooltips: "password masks the characters." }, type: "'text' | 'password'", default: "'text'" },
        { prop: { name: "onValueComplete", info_tooltips: "Called with the full code once every slot is filled." }, type: "(value: string) => void", default: "--" },
        { prop: { name: "autoSubmit", info_tooltips: "Submit the surrounding form once every slot is filled." }, type: "boolean", default: "false" },
        { prop: { name: "name", info_tooltips: "Form field name; the code submits through a hidden input." }, type: "string", default: "--" },
        { prop: { name: "disabled", info_tooltips: "Disable every slot." }, type: "boolean", default: "false" },
        { prop: { name: "readOnly", info_tooltips: "Show the code without allowing edits." }, type: "boolean", default: "false" },
        { prop: { name: "required", info_tooltips: "Mark the hidden input required." }, type: "boolean", default: "false" }
    ]
}

export default data
