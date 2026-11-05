const data = {
    name: "Root",
    description: "Holds the field's state and links its parts. Renders a div.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "invalid", info_tooltips: "Forces the field invalid, for example after a server error: the control gets aria-invalid and Field.Error renders." }, type: "boolean", default: "false" },
        { prop: { name: "validate", info_tooltips: "Custom validation, run after the browser's checks (required, type, pattern, min/max) pass. Return a message, several, or null, or a promise of one for async checks." }, type: "(value) => string | string[] | null | Promise<…>", default: "--" },
        { prop: { name: "validationMode", info_tooltips: "When results show: after a submit attempt (onSubmit), on blur, or on change. Once shown they update as the user types. Inside a Form, defaults to the Form's mode." }, type: "'onSubmit' | 'onBlur' | 'onChange'", default: "'onSubmit'" },
        { prop: { name: "disabled", info_tooltips: "Disables the control and adds data-disabled to every part." }, type: "boolean", default: "false" },
        { prop: { name: "required", info_tooltips: "Marks the control required." }, type: "boolean", default: "false" },
        { prop: { name: "name", info_tooltips: "Form field name, passed to the control." }, type: "string", default: "--" },
        { prop: { name: "asChild", info_tooltips: "Render the child element instead of a div." }, type: "boolean", default: "false" },
        { prop: { name: "customRootClass", info_tooltips: "Override the generated root class namespace." }, type: "string", default: '""' },
        { prop: { name: "validationDebounceTime", info_tooltips: "With validationMode=\"onChange\", ms to wait after typing stops before validating." }, type: "number", default: "0" },
    {
      prop: {
        name: "touched",
        info_tooltips: "Controlled touched state."
      },
      type: "boolean",
      default: "--",
    },
    {
      prop: {
        name: "dirty",
        info_tooltips: "Controlled dirty state."
      },
      type: "boolean",
      default: "--",
    },
    {
      prop: {
        name: "actionsRef",
        info_tooltips: "Ref with validate(), which checks the field and shows the result."
      },
      type: "Ref<{ validate(): boolean }>",
      default: "--",
    }
  ]
}

export default data
