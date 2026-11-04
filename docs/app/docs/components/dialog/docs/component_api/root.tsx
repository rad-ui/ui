const data = {
    name : "Root",
    description : "The root component for the Dialog.",
    columns : [
        {
            name : "Prop",
            id : "prop",
        },
        {
            name : "Type",
            id : "type",
        },
        {
            name: "Default",
            id : "default",
        }
    ],
    data:[
       {
        prop : {
            name : "className",
            info_tooltips : "The class name for the DialogRoot."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "customRootClass",
            info_tooltips : "The custom class name for the DialogRoot."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "open",
            info_tooltips : "The boolean to control the open state of the DialogRoot."
        },
        type : "boolean",
        default : "--",
       },
       {
        prop : {
            name : "children",
            info_tooltips : "The dialog parts rendered inside the root."
        },
        type : "ReactNode",
        default : "--",
       },
       {
        prop : {
            name : "defaultOpen",
            info_tooltips : "The initial open state for uncontrolled usage."
        },
        type : "boolean",
        default : "false",
       },
       {
        prop : {
            name : "onOpenChange",
            info_tooltips : "Called with the next open state. A handler with a second parameter also gets details: reason (trigger-press, outside-press, escape-key, focus-out, close-press…), event, and cancel() to keep the current state."
        },
        type : "(open: boolean, details) => void",
        default : "--",
       },
       {
        prop : {
            name : "onClickOutside",
            info_tooltips : "The function to handle the click outside of the DialogRoot."
        },
        type : "function",
        default : "--",
       },
        { prop: { name: "handle", info_tooltips: "Connects triggers rendered outside the Root, made with createHandle(). Children can then be a function of the opening trigger's payload." }, type: "Handle", default: "--" },
        { prop: { name: "onOpenChangeComplete", info_tooltips: "Called with true after the open animation finishes and with false after the close animation finishes (immediately when nothing animates)." }, type: "(open: boolean) => void", default: "--" },
        { prop: { name: "modal", info_tooltips: "true traps focus, locks page scroll and lets the overlay block the page; 'trap-focus' only traps focus; false leaves the page usable (no focus trap or aria-modal)." }, type: "boolean | 'trap-focus'", default: "true" },
    {
      prop: {
        name: "actionsRef",
        info_tooltips: "Ref with close(), to close it from code (reason 'imperative-action')."
      },
      type: "Ref<{ close(): void }>",
      default: "--",
    }
  ]
}

export default data;
