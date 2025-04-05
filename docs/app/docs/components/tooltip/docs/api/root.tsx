const data = {
  name: "Root",
  description: "The wrapper component that provides context for the tooltip.",
  columns: [
    {
      name: "Prop",
      id: "prop",
    },
    {
      name: "Type",
      id: "type",
    },
    {
      name: "Default",
      id: "default",
    },
    {
      name: "",
      id: "info_tooltips",
    }
  ],
  data: [
    {
      prop: {
        name: "defaultOpen",
        info_tooltips: "Whether the tooltip is open by default."
      },
      type: "boolean",
      default: "false",
    },
    {
      prop: {
        name: "open",
        info_tooltips: "Controlled open state of the tooltip."
      },
      type: "boolean",
      default: "--",
    },
    {
      prop: {
        name: "onOpenChange",
        info_tooltips: "Callback called when open state changes."
      },
      type: "function",
      default: "--",
    },
    {
      prop: {
        name: "delayDuration",
        info_tooltips: "Duration from when the mouse enters the trigger until the tooltip opens."
      },
      type: "number",
      default: "700",
    }
  ]
};

export default data; 