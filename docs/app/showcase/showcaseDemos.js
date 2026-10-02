const showcaseDemos = [
    {
        href: "/showcase/music-app",
        label: "Music App",
        title: "Music streaming workspace",
        summary: "A three-surface player: sidebar navigation, an interactive album hero, and a persistent transport bar.",
        components: ["Tooltip", "Toggle", "Button", "Heading", "Text"],
    },
    {
        href: "/showcase/preferences",
        label: "Preferences",
        title: "Preferences and settings",
        summary: "Dense settings panels built from radio cards, switches, progress readouts, and grouped section cards.",
        components: ["RadioCards", "Switch", "Progress", "Badge", "Button", "Heading", "Text"],
    },
    {
        href: "/showcase/product-page",
        label: "Product Page",
        title: "Product detail page",
        summary: "Gallery, pricing tiers, and purchase actions composed from a segmented finish picker, a wishlist toggle, and cards.",
        components: ["ToggleGroup", "Toggle", "Badge", "Button", "Heading", "Text"],
    },
    {
        href: "/showcase/messaging",
        label: "Messaging",
        title: "Messaging workspace",
        summary: "Channel list, conversation thread, and composer laid out side by side.",
        components: ["Badge", "Button", "Heading", "Text"],
    },
    {
        href: "/showcase/inbox",
        label: "Inbox",
        title: "Email inbox",
        summary: "Category filters and a message list with per-row star toggles, selection, and bulk actions.",
        components: ["Toggle", "Badge", "Button", "Heading", "Text"],
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
