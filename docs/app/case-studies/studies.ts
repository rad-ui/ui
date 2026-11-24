// Case studies: products built on Rad UI. Each one tells the problem Rad UI
// solved and what the product's users got from it. Keep them short.

export type CaseStudy = {
    slug: string
    name: string
    href: string
    /** One line for the sidebar's About. */
    summary: string
    /** The lead under the title: what Rad UI did for this product, in one sentence. */
    headline: string
    /** Logo, in /public/case-studies/logos. */
    logo: string
    /** What kind of product, for the sidebar. */
    kind: string
    /** Question-and-answer sections, in order. Each answer is a list of paragraphs. */
    sections: { question: string; answer: string[] }[]
}

export const caseStudies: CaseStudy[] = [
    {
        slug: "razzle",
        headline: "A Reel editor where every slider, toggle and approval dialog works by keyboard, by touch and with a screen reader.",
        logo: "/case-studies/logos/razzle.svg",
        kind: "Marketing SaaS",
        name: "Razzle",
        href: "https://getrazzle.com",
        summary: "A browser tool for making Instagram Reels and carousels, getting them approved and scheduling them.",
        sections: [
            {
                question: "What problem did Rad UI solve?",
                answer: [
                    "Razzle's editor is a wall of controls: sliders for timing, number fields, format toggles, selects for fonts and music, switches for captions. Then come the review dialogs, the drawers on phones, the menus and the calendar. Building each of those by hand, with focus, keyboard support and screen-reader labels done right, would have taken longer than building the editor.",
                    "Rad UI gave the team all of those parts with the behaviour already done, so the work went into the editor itself. Razzle keeps its own look with Tailwind on top.",
                ],
            },
            {
                question: "What did users get?",
                answer: [
                    "The whole editor works from the keyboard: Tab through the side panel, nudge a slider with the arrow keys, flip a switch with Space.",
                    "On a phone, the review flow opens in a drawer a client can approve with one thumb, and dialogs keep focus where it belongs. The same controls behave the same way in the editor, the calendar and the review screen, so nothing has to be learned twice.",
                ],
            },
        ],
    },
    {
        slug: "fpv-grind",
        headline: "A drone parts store and its admin share one set of accessible form controls, wrapped once.",
        logo: "/case-studies/logos/fpv-grind.svg",
        kind: "E-commerce + 3D sim",
        name: "FPV Grind",
        href: "https://www.fpvgrind.in",
        summary: "A store for FPV drone parts in India with a free 3D FPV simulator in the browser.",
        sections: [
            {
                question: "What problem did Rad UI solve?",
                answer: [
                    "A store has a lot of forms: checkout, accounts, search filters, and an admin for editing products and uploading photos. FPV Grind needed them consistent and accessible without a design-system team.",
                    "Its buttons, text fields, selects, sliders and checkboxes are thin wrappers around Rad UI. The rest of the code imports the store's own Button or Select, so upgrading Rad UI touches one folder.",
                ],
            },
            {
                question: "What did users get?",
                answer: [
                    "Forms that behave the same everywhere in the store, work with a keyboard, and label every field for screen readers. In the admin, risky changes ask for confirmation in a dialog that traps focus and closes on Escape.",
                ],
            },
        ],
    },
    {
        slug: "fiery-panda-studios",
        headline: "A pixel-art game studio site that looks nothing like a dashboard, on the same components.",
        logo: "/case-studies/logos/fiery-panda.png",
        kind: "Game studio site",
        name: "Fiery Panda Studios",
        href: "https://fierypandastudios.com",
        summary: "The website of an indie game studio making pixel-art action games in Godot.",
        sections: [
            {
                question: "What problem did Rad UI solve?",
                answer: [
                    "The site has a pixel-art look: chunky borders, a pixel font, fire colours. Most component libraries fight a look like that. Rad UI's theme loads into its own CSS layer, so the site's styles always win, and the components bring only the behaviour.",
                ],
            },
            {
                question: "What did users get?",
                answer: [
                    "Buttons and badges that look like they came out of the games, with proper focus rings, keyboard use and semantics underneath. A visitor using a keyboard or a screen reader gets the same site as everyone else.",
                ],
            },
        ],
    },
    {
        slug: "paudho",
        headline: "A phone-first gardening app moved every shared control to Rad UI with no visible change, and gained touch and keyboard support.",
        logo: "/case-studies/logos/paudho.svg",
        kind: "Gardening app",
        name: "Paudho",
        href: "https://www.paudho.com",
        summary: "Gardening help for terraces, balconies and small farms in India: what to plant, when, and how.",
        sections: [
            {
                question: "What problem did Rad UI solve?",
                answer: [
                    "Paudho's selects, dialogs, popovers and tooltips came from a mix of sources, and each behaved a little differently, especially on phones. Most of its visitors are on phones, often on slow connections.",
                    "The app moved every shared control onto Rad UI and kept its own Tailwind classes, checking screen by screen that nothing visible changed.",
                ],
            },
            {
                question: "What did users get?",
                answer: [
                    "The month picker, plant filters and seed forms now work the same way with a thumb, a keyboard or a screen reader. Dialogs and popovers open, close and return focus consistently across the whole app.",
                ],
            },
        ],
    },
    {
        slug: "awelgorithms",
        headline: "A hand-styled learning app replaced its home-made menus with Rad UI and gained arrow-key navigation.",
        logo: "/case-studies/logos/awelgorithms.svg",
        kind: "Learning platform",
        name: "Awelgorithms",
        href: "https://www.awelgorithms.com",
        summary: "A place to learn algorithms that measures your skill and unlocks practice problems as you improve.",
        sections: [
            {
                question: "What problem did Rad UI solve?",
                answer: [
                    "Awelgorithms has its own hand-written look, and its menus were hand-written too: code that placed them on screen, closed them on outside clicks and handled Escape. Every new menu copied that code and its bugs.",
                    "The account menu, chat menus, language picker, lesson tabs and the editor's reset confirm are now Rad UI parts carrying the app's own classes. The hand-written menu code is gone.",
                ],
            },
            {
                question: "What did users get?",
                answer: [
                    "Menus that move with the arrow keys, which the old ones never did, and that close and return focus the way people expect. The app looks exactly as it did before.",
                ],
            },
        ],
    },
]

export const linkSnippet = `<a href="https://www.rad-ui.com/case-studies?ref=your-product">Built with Rad UI</a>`
