const data = {
    name : "Root",
    description : "The root component for the AlertDialog.",
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
            info_tooltips : "The class name for the AlertDialogRoot."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "customRootClass",
            info_tooltips : "The custom class name for the AlertDialogRoot."
        },
        type : "string",
        default : "--",
       },
       {
        prop : {
            name : "open",
            info_tooltips : "The boolean to control the open state of the AlertDialogRoot."
        },
        type : "boolean",
        default : "--",
       },
       {
        prop : {
            name : "defaultOpen",
            info_tooltips : "Initial open state when the component is uncontrolled."
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
            name : "dismissOnOutsidePress",
            info_tooltips : "Whether pressing outside the dialog (including the overlay) closes it. Off by default, per the WAI-ARIA alertdialog pattern; Escape, Cancel and Action always close it."
        },
        type : "boolean",
        default : "false",
       },
        { prop: { name: "onOpenChangeComplete", info_tooltips: "Called with true after the open animation finishes and with false after the close animation finishes (immediately when nothing animates)." }, type: "(open: boolean) => void", default: "--" },
        { prop: { name: "modal", info_tooltips: "true traps focus, locks page scroll and lets the overlay block the page; 'trap-focus' only traps focus; false leaves the page usable (no focus trap or aria-modal)." }, type: "boolean | 'trap-focus'", default: "true" },
    {
      prop: {
        name: "actionsRef",
        info_tooltips: "Ref with close(), to close it from code (reason 'imperative-action')."
      },
      type: "Ref<{ close(): void }>",
      default: "--",
    },
    {
      prop: {
        name: "triggerId",
        info_tooltips: "With handle: the DOM id of the detached trigger the popup belongs to while open. It's anchored to that trigger and gets its payload, also when opened from code."
      },
      type: "string | null",
      default: "--",
    },
    {
      prop: {
        name: "defaultTriggerId",
        info_tooltips: "Uncontrolled triggerId: the trigger used when the popup opens without one, e.g. with defaultOpen."
      },
      type: "string | null",
      default: "--",
    }
  ]
}

export default data;
