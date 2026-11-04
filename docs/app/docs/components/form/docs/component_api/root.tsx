const data = {
    name: "Form",
    description: "Renders a <form> with browser validation bubbles off. On submit it validates every Field inside; with invalid fields it shows their errors and focuses the first, otherwise it calls onSubmit and onFormSubmit.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "errors", info_tooltips: "Errors keyed by field name, typically from the server. Each shows on its Field and clears when the user edits that field." }, type: "Record<string, string | string[]>", default: "--" },
        { prop: { name: "onFormSubmit", info_tooltips: "Called with the form's values as an object once every field is valid. Providing it prevents the default submission." }, type: "(values, event) => void", default: "--" },
        { prop: { name: "onClearErrors", info_tooltips: "Called when the user edits a field that has an error from errors." }, type: "(errors) => void", default: "--" },
        { prop: { name: "validationMode", info_tooltips: "Default validationMode for every Field inside." }, type: "'onSubmit' | 'onBlur' | 'onChange'", default: "'onSubmit'" },
        { prop: { name: "noValidate", info_tooltips: "Turn off the browser's own validation bubbles; Fields show the errors instead." }, type: "boolean", default: "true" },
        { prop: { name: "asChild", info_tooltips: "Render the child element instead of a form." }, type: "boolean", default: "false" },
        { prop: { name: "customRootClass", info_tooltips: "Override the generated class namespace." }, type: "string", default: "\"\"" },
    {
      prop: {
        name: "actionsRef",
        info_tooltips: "Ref with validate(name?), which checks every Field (or one by name) and shows the results."
      },
      type: "Ref<{ validate(name?): boolean }>",
      default: "--",
    }
  ]
}

export default data
