const showcaseDemos = [
    {
        href: "/showcase/music-app",
        label: "Music App",
        title: "Music player",
        summary: "A full streaming client: ⌘K search, track menus, right-click album menus, artist hover cards, a live queue, sleep timer, playlist creation and toasts.",
        components: ["Command", "DropdownMenu", "ContextMenu", "HoverCard", "Dialog", "Popover", "Toast", "Tabs", "Slider", "RadioGroup", "Switch", "Toggle", "Tooltip", "Avatar", "Kbd", "TextField", "Badge", "Button"],
    },
    {
        href: "/showcase/preferences",
        label: "Preferences",
        title: "Preferences and settings",
        summary: "Edit a profile with an unsaved-changes bar, recolor components live with the accent picker, and manage notifications and sessions.",
        components: ["RadioCards", "Switch", "TextField", "Progress", "Avatar", "Badge", "Button", "Separator"],
    },
    {
        href: "/showcase/product-page",
        label: "Product Page",
        title: "Product detail page",
        summary: "Pick a finish, set a quantity, add to the bag, and expand the details — a working product page.",
        components: ["ToggleGroup", "NumberField", "Accordion", "Breadcrumb", "Toggle", "Badge", "Button", "Separator"],
    },
    {
        href: "/showcase/messaging",
        label: "Messaging",
        title: "Team chat",
        summary: "Switch channels, send messages, and react — a working chat client with a channel sidebar and member panel.",
        components: ["Avatar", "TextField", "Tooltip", "Button", "Badge", "Separator"],
    },
    {
        href: "/showcase/inbox",
        label: "Inbox",
        title: "Email inbox",
        summary: "Search, star, select and archive in bulk, read in a split pane, and reply — a working mail client.",
        components: ["Checkbox", "Toggle", "TextField", "Avatar", "Tooltip", "Badge", "Button", "Separator"],
    },
    {
        href: "/showcase/dashboard",
        label: "Dashboard",
        title: "Analytics dashboard",
        summary: "Metric cards with sparklines, a chart driven by a range toggle group, and a filterable delivery board with progress bars, avatars, and status badges.",
        components: ["Table", "Progress", "ToggleGroup", "Kbd", "Avatar", "Badge", "Button", "Card", "Heading", "Text"],
    },
]

export const getShowcaseDemo = (pathname) =>
    showcaseDemos.find((demo) => demo.href === pathname)

export default showcaseDemos
