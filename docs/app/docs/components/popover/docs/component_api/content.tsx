const data = {
    name: "Content",
    description: "The floating surface. Positions itself against the trigger and owns dismissal behaviour.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "side", info_tooltips: "Preferred side of the trigger to render against." }, type: '"top" | "right" | "bottom" | "left"', default: '"bottom"' },
        { prop: { name: "sideOffset", info_tooltips: "Distance in pixels between the trigger and the content." }, type: "number", default: "0" },
        { prop: { name: "align", info_tooltips: "Alignment along the trigger edge." }, type: '"start" | "center" | "end"', default: '"center"' },
        { prop: { name: "alignOffset", info_tooltips: "Offset in pixels applied along the alignment axis." }, type: "number", default: "0" },
        { prop: { name: "avoidCollisions", info_tooltips: "Flips the side to keep the content inside the viewport." }, type: "boolean", default: "true" },
        { prop: { name: "collisionPadding", info_tooltips: "Minimum distance kept between the content and the boundary." }, type: "number", default: "0" },
        { prop: { name: "collisionBoundary", info_tooltips: "Element(s) the content is kept inside of." }, type: "Element | null | Array<Element | null>", default: "--" },
        { prop: { name: "arrowPadding", info_tooltips: "Padding between the arrow and the content edges." }, type: "number", default: "0" },
        { prop: { name: "sticky", info_tooltips: "Keeps the content aligned to the trigger while scrolling within the boundary." }, type: '"partial" | "always"', default: '"partial"' },
        { prop: { name: "hideWhenDetached", info_tooltips: "Hides the content when the trigger is no longer visible." }, type: "boolean", default: "false" },
        { prop: { name: "forceMount", info_tooltips: "Keeps the content mounted so exit animations can run." }, type: "boolean", default: "false" },
        { prop: { name: "asChild", info_tooltips: "Merges props onto the single child element instead of rendering a div." }, type: "boolean", default: "false" },
        { prop: { name: "onOpenAutoFocus", info_tooltips: "Called when focus moves into the content on open. Call preventDefault to keep focus on the trigger." }, type: "(event) => void", default: "--" },
        { prop: { name: "onCloseAutoFocus", info_tooltips: "Called when focus returns to the trigger on close." }, type: "(event) => void", default: "--" },
        { prop: { name: "onEscapeKeyDown", info_tooltips: "Called when Escape is pressed inside the popover." }, type: "(event: KeyboardEvent) => void", default: "--" },
        { prop: { name: "onPointerDownOutside", info_tooltips: "Called on an outside pointer press." }, type: "(event) => void", default: "--" },
        { prop: { name: "onFocusOutside", info_tooltips: "Called when focus moves outside the popover." }, type: "(event) => void", default: "--" },
        { prop: { name: "onInteractOutside", info_tooltips: "Called for any outside interaction, pointer or focus." }, type: "(event) => void", default: "--" }
    ]
}

export default data