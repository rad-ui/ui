import docsNavigationSections from "@/app/docs/docsNavigationSections"
import fxNavigationSections from "@/app/fx/fxNavigationSections"

// Rad UI ships two products, each with its own docs and its own top-nav links.
// The active product is derived from the pathname, so shared links always open
// with the right switcher state, nav links and sidebar.
export const products = [
    {
        id: "ui",
        label: "UI",
        title: "Rad UI",
        home: "/docs/first-steps/introduction",
        // Pages that belong to UI. Anything unmatched (e.g. the home page) also falls back to UI.
        ownsPath: /^\/(docs|playground|colors|showcase)(\/|$)/,
        docsPath: /^\/docs(\/|$)/,
        sections: docsNavigationSections,
        navLinks: [
            { href: "/docs/first-steps/introduction", label: "Docs", match: "/docs" },
            { href: "/playground", label: "Playground", match: "/playground" },
            { href: "/colors", label: "Colors", match: "/colors" },
            { href: "/showcase/music-app", label: "Showcase", match: "/showcase" }
        ]
    },
    {
        id: "fx",
        label: "FX",
        title: "Rad UI FX",
        home: "/fx",
        ownsPath: /^\/fx(\/|$)/,
        docsPath: /^\/fx(\/|$)/,
        sections: fxNavigationSections,
        navLinks: [
            { href: "/fx", label: "Docs", match: "/fx" },
            { href: "/fx/installation", label: "Installation", match: "/fx/installation" },
            { href: "/fx/accessibility", label: "Accessibility", match: "/fx/accessibility" }
        ]
    }
] as const

export type Product = typeof products[number]

/** The product a page belongs to; UI when no product claims it. */
export const getActiveProduct = (pathname: string | null): Product =>
    products.find((product) => pathname && product.ownsPath.test(pathname)) ?? products[0]

/** The product whose docs sidebar should show on this page, if any. */
export const getDocsProduct = (pathname: string | null): Product | undefined => {
    if (!pathname) return undefined
    return products.find((product) => product.docsPath.test(pathname))
}

/** The nav link to highlight: the longest `match` prefix of the current path. */
export const getActiveNavLink = (product: Product, pathname: string | null) => {
    if (!pathname) return undefined
    return [...product.navLinks]
        .filter((link) => pathname === link.match || pathname.startsWith(`${link.match}/`))
        .sort((a, b) => b.match.length - a.match.length)[0]
}
