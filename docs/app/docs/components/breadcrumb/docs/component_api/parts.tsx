const data = {
    name: "Parts",
    description: "Composable breadcrumb parts for list structure, links, current page text, and separators.",
    columns: [
        {
            name: "Part",
            id: "part",
        },
        {
            name: "Element",
            id: "element",
        },
        {
            name: "Notes",
            id: "notes",
        }
    ],
    data: [
        {
            part: "Breadcrumb.List",
            element: "ol",
            notes: "Wraps breadcrumb items in source order.",
        },
        {
            part: "Breadcrumb.Item",
            element: "li",
            notes: "Groups a link or current page with its separator.",
        },
        {
            part: "Breadcrumb.Link",
            element: "a",
            notes: "Supports asChild for router link components.",
        },
        {
            part: "Breadcrumb.Page",
            element: "span",
            notes: "Sets aria-current=\"page\" by default.",
        },
        {
            part: "Breadcrumb.Separator",
            element: "span",
            notes: "Decorative separator hidden from assistive technology.",
        }
    ]
};

export default data;
