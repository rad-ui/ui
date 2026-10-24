const data = {
    name: "Provider",
    description: "Shares hover delays between tooltips. Once one has opened, moving to another within timeout opens it instantly. Wrap your app or a toolbar in it.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "openDelay", info_tooltips: "Delay in ms before a tooltip in the group opens on hover." }, type: "number", default: "600" },
        { prop: { name: "closeDelay", info_tooltips: "Delay in ms before a tooltip in the group closes." }, type: "number", default: "0" },
        { prop: { name: "timeout", info_tooltips: "How long in ms after a tooltip closes that the next one opens instantly." }, type: "number", default: "400" },
        { prop: { name: "children", info_tooltips: "The tooltips that share the delay." }, type: "ReactNode", default: "--" }
    ]
}

export default data
