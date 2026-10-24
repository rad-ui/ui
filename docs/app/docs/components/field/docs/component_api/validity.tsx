const data = {
    name: "Validity",
    description: "Renders custom UI from the field's validity, such as a password checklist. Its child is a function.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "children", info_tooltips: "Receives { state, errors, value, invalid, shown }: the ValidityState snapshot, the messages, the checked value, whether the field is invalid and whether results are shown yet." }, type: "(validity) => ReactNode", default: "--" }
    ]
}

export default data
