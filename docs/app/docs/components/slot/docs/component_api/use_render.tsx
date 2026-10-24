const data = {
    name: "useRender",
    description: "Lets your component accept a render prop: an element to swap the rendered tag (props are merged onto it), or a function that receives the props.",
    columns: [
        { name: "Prop", id: "prop" },
        { name: "Type", id: "type" },
        { name: "Default", id: "default" }
    ],
    data: [
        { prop: { name: "render", info_tooltips: "Element or function to render." }, type: "ReactElement | (props) => ReactElement", default: "--" },
        { prop: { name: "props", info_tooltips: "Your component's props, merged under the element's own." }, type: "object", default: "--" },
        { prop: { name: "ref", info_tooltips: "Ref for the rendered element." }, type: "Ref", default: "--" },
        { prop: { name: "defaultTagName", info_tooltips: "Tag to create without render." }, type: "string", default: "'div'" }
    ]
}

export default data
