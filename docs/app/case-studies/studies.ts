// Case studies: real products built on Rad UI. Each one says what the
// product is, how it uses Rad UI, and what broke along the way, with the issues it led to.
// Paudho and Awelgorithms are being moved onto Rad UI now: don't deploy the docs until both run on it, then
// match their component lists and stories to what they actually use.

export type CaseStudy = {
    slug: string
    name: string
    href: string
    /** One line for the card. */
    summary: string
    /** Rad UI components the product uses. */
    components: string[]
    /** Question-and-answer sections, in order. Each answer is a list of paragraphs. */
    sections: { question: string; answer: string[] }[]
    /** rad-ui/ui issues this product filed. */
    issues: { number: number; title: string }[]
}

export const caseStudies: CaseStudy[] = [
    {
        slug: "razzle",
        name: "Razzle",
        href: "https://getrazzle.com",
        summary: "A browser tool for making Instagram Reels and carousels, getting them approved and scheduling them.",
        components: [
            "Button", "TextField", "TextArea", "Dialog", "AlertDialog", "DropdownMenu", "Drawer", "Select",
            "Slider", "NumberField", "ToggleGroup", "Switch", "Checkbox", "Tabs", "Toolbar", "Progress",
            "HoverCard", "Accordion", "Breadcrumb", "Kbd", "Theme",
        ],
        sections: [
            {
                question: "What is Razzle?",
                answer: [
                    "Razzle makes short videos and carousels for Instagram. You type or chat what you want, edit it in the browser, send it to a teammate for approval, and schedule it. The video is rendered in the browser, so there's no upload wait.",
                ],
            },
            {
                question: "How does it use Rad UI?",
                answer: [
                    "Almost every control in the app is a Rad UI component. The editor's side panel is built from Slider, NumberField, ToggleGroup, Select and Switch. Review and approval use Dialog, AlertDialog and Drawer. Menus, tabs and keyboard hints use DropdownMenu, Tabs and Kbd.",
                    "Razzle styles everything with Tailwind on top of Rad UI's default theme, so the components handle focus, keyboard use and screen readers while the app keeps its own look.",
                ],
            },
            {
                question: "What broke, and what changed because of it?",
                answer: [
                    "Razzle is where we find Rad UI's problems first. Whenever something broke, we worked around it in the app and filed an issue the same day, with a small example that shows the bug.",
                    "That led to 19 issues. Most were small but painful in a real app: dialogs pushed off the screen on phones, a select inside a drawer whose options couldn't be clicked, types that rejected normal button props. 13 of them are fixed as of November 2026, and Razzle removed each workaround once the fix shipped.",
                ],
            },
        ],
        issues: [
            { number: 2245, title: "Published .d.ts files import unresolved '~/' aliases" },
            { number: 2246, title: "Theme without classNamespace renders every component unstyled" },
            { number: 2247, title: "Dialog.Close / AlertDialog.Cancel types reject standard button props" },
            { number: 2248, title: "Select.Trigger renderValue is undocumented and missing from the types" },
            { number: 2252, title: "Tailwind preset: 'white' renders black in dark mode" },
            { number: 2255, title: "Tailwind preset: numeric colour scales flip in dark mode" },
            { number: 2257, title: "DropdownMenu.Trigger asChild overrides the button's variant" },
            { number: 2258, title: "Theme's global :focus-visible reset can't be overridden" },
            { number: 2265, title: "Button: no high-contrast solid variant for dark surfaces" },
            { number: 2266, title: "TextArea forwards ref to the root div, not the textarea" },
            { number: 2273, title: "Progress: hidden max-width stops the bar filling its container" },
            { number: 2277, title: "Dialog content is pushed off-screen on mobile" },
            { number: 2278, title: "Dialog initialFocus scrolls tall content" },
            { number: 2284, title: "TextArea: fixed min-height overrides rows" },
            { number: 2285, title: "Dialog content: no bottom padding without a Footer, tall content clipped" },
            { number: 2288, title: "ToggleGroup: a soft segmented variant for view switchers" },
            { number: 2321, title: "HoverCard.Trigger asChild applies link styling to the child" },
            { number: 2322, title: "Select inside a Drawer: options can't be clicked" },
            { number: 2323, title: "Dialog opened from a Drawer is marked aria-hidden" },
        ],
    },
    {
        slug: "fpv-grind",
        name: "FPV Grind",
        href: "https://www.fpvgrind.in",
        summary: "An online store for FPV drone parts in India, with build guides and a blog.",
        components: ["Button", "TextField", "TextArea", "Select", "Slider", "Checkbox", "Dialog", "Drawer"],
        sections: [
            {
                question: "What is FPV Grind?",
                answer: [
                    "FPV Grind sells parts for small FPV drones in India and writes guides for people building their first one.",
                ],
            },
            {
                question: "How does it use Rad UI?",
                answer: [
                    "The store's shared form controls (buttons, text fields, selects, sliders and checkboxes) are thin wrappers around Rad UI. The store's admin uses them to edit products, upload photos and confirm changes in a dialog.",
                    "Wrapping each component once means the rest of the code imports the store's own Button or Select, and Rad UI stays an implementation detail that's easy to upgrade.",
                ],
            },
            {
                question: "What broke?",
                answer: [
                    "The checkbox. Checkbox.Indicator always drew its own fixed-size icon, so the store couldn't use its own. That was filed and is now fixed.",
                ],
            },
        ],
        issues: [{ number: 2299, title: "Checkbox.Indicator always renders its own fixed-size icon" }],
    },
    {
        slug: "fiery-panda-studios",
        name: "Fiery Panda Studios",
        href: "https://fierypandastudios.com",
        summary: "The website of an indie game studio in Hyderabad making pixel-art action games in Godot.",
        components: ["Heading", "Badge", "Button", "Theme"],
        sections: [
            {
                question: "What is Fiery Panda Studios?",
                answer: [
                    "A small game studio in Hyderabad, India. Its site shows the studio's games, devlogs and news.",
                ],
            },
            {
                question: "How does it use Rad UI?",
                answer: [
                    "The site has a pixel-art look: chunky borders, a pixel font, fire colours. Headings, badges and buttons come from Rad UI, and the theme is loaded into its own CSS layer so the site's styles always win.",
                    "It shows that a headless library doesn't have to look like a dashboard. The components bring the behaviour, and the site brings the look.",
                ],
            },
            {
                question: "What broke?",
                answer: [
                    "Two things, both now fixed. The theme's focus ring couldn't be overridden by the site's own styles. And a Button rendered as a link caused a hydration warning and gave the link button-only attributes.",
                ],
            },
        ],
        issues: [
            { number: 2258, title: "Theme's global :focus-visible reset can't be overridden" },
            { number: 2283, title: "Button asChild with a link child: hydration mismatch" },
        ],
    },
    {
        slug: "paudho",
        name: "Paudho",
        href: "https://www.paudho.com",
        summary: "Gardening help for terraces, balconies and small farms in India: what to plant, when, and how.",
        components: ["Button", "TextField", "Select", "Dialog", "Tabs", "Checkbox", "Badge", "Theme"],
        sections: [
            {
                question: "What is Paudho?",
                answer: [
                    "Paudho helps people grow food at home in India. It has a plant library with hundreds of plants, a planner that works out what to sow each month for your city, and guides for small spaces.",
                ],
            },
            {
                question: "How does it use Rad UI?",
                answer: [
                    "The planner, plant library and shop are built from Rad UI components: selects and tabs to pick a city, a month or a plant type, dialogs to add plants to a plan, and badges for sowing seasons.",
                    "Most of Paudho's visitors are on phones, often on slow connections, so the components need to work well on small screens and with a keyboard or screen reader as much as with touch.",
                ],
            },
        ],
        issues: [],
    },
    {
        slug: "awelgorithms",
        name: "Awelgorithms",
        href: "https://www.awelgorithms.com",
        summary: "A place to learn algorithms that measures your skill and unlocks practice problems as you improve.",
        components: ["Button", "Tabs", "Dialog", "Progress", "Badge", "Accordion", "Tooltip", "Theme"],
        sections: [
            {
                question: "What is Awelgorithms?",
                answer: [
                    "Awelgorithms teaches algorithms step by step. It checks what you already know, takes you through lessons and roadmaps, and unlocks practice problems as your skills grow.",
                ],
            },
            {
                question: "How does it use Rad UI?",
                answer: [
                    "Lessons, roadmaps and skill checks are built from Rad UI components: tabs to switch between a lesson and its practice, progress bars for each skill, accordions for hints, and dialogs for results.",
                    "Learners spend long sessions in the app, often with only a keyboard, so focus handling and keyboard use matter as much as the look.",
                ],
            },
        ],
        issues: [],
    },
]

export const linkSnippet = `<a href="https://www.rad-ui.com/case-studies?ref=your-product">Built with Rad UI</a>`
