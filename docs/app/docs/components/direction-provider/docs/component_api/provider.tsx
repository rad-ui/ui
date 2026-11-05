const data = {
    name: "DirectionProvider",
    description: "Provides the direction. It renders no element: set dir on <html> as well so text and CSS follow. A component's own dir prop still wins.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "dir", info_tooltips: "Reading direction for every component inside." }, type: "'ltr' | 'rtl'", default: "--" },
        { prop: { name: "children", info_tooltips: "Your app or a section of it." }, type: "ReactNode", default: "--" }
    ]
}

export default data
