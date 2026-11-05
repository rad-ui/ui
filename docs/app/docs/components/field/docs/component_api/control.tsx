const data = {
    name: "Control",
    description: "The form control. Renders an input; use asChild to wire up TextField, TextArea or your own control.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "asChild", info_tooltips: "Pass the field's id, name, aria-describedby, aria-invalid, disabled and required to the child control." }, type: "boolean", default: "false" },
        { prop: { name: "id", info_tooltips: "Keep your own id; the label follows it." }, type: "string", default: "generated" },
    {
      prop: {
        name: "onValueChange",
        info_tooltips: "Called with the new value as the user edits it."
      },
      type: "(value, event) => void",
      default: "--",
    }
  ]
}

export default data
