const data = {
    name: 'Root',
    description: 'One toast item (<li>): timers, swipe-to-dismiss, stack transforms, and live region semantics.',
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
    ],
    data: [
        {
            prop: { name: 'toast', info_tooltips: 'Toast data from the manager (id, title, variant, actionProps, …).' },
            type: 'ToastData',
            default: '--',
        },
        {
            prop: { name: 'children', info_tooltips: 'Usually Toast.Content and controls.' },
            type: 'ReactNode',
            default: '--',
        },
    {
      prop: {
        name: "swipeDirection",
        info_tooltips: "Direction(s) this toast can be swiped to dismiss it; overrides the provider's swipeDirections. Defaults to the edge the toasts sit on. Set as a toast option."
      },
      type: "'up' | 'down' | 'left' | 'right' | Array",
      default: "--",
    },
    {
      prop: {
        name: "anchor",
        info_tooltips: "Show the toast beside this element (or virtual element, ref or function) instead of in the stack, e.g. \"Copied\" next to a copy button. Set as a toast option; Toaster renders it, or render Toast.AnchoredToasts with your own Provider."
      },
      type: "Element | VirtualElement | RefObject | () => Element",
      default: "--",
    },
    {
      prop: {
        name: "side",
        info_tooltips: "With anchor: side of the anchor to show on."
      },
      type: "'top' | 'right' | 'bottom' | 'left'",
      default: "'top'",
    },
    {
      prop: {
        name: "align",
        info_tooltips: "With anchor: alignment against the anchor."
      },
      type: "'start' | 'center' | 'end'",
      default: "'center'",
    },
    {
      prop: {
        name: "sideOffset",
        info_tooltips: "With anchor: distance from the anchor in px."
      },
      type: "number",
      default: "8",
    },
    {
      prop: {
        name: "alignOffset",
        info_tooltips: "With anchor: shift along the anchor in px."
      },
      type: "number",
      default: "0",
    },
        {
            prop: { name: 'className', info_tooltips: 'Additional class names for the list item.' },
            type: 'string',
            default: "''",
        },
    ],
}

export default data
