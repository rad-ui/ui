import docsNavigationSections from "@/app/docs/docsNavigationSections"
import fxNavigationSections from "@/app/fx/fxNavigationSections"

// Each docs product owns a URL prefix. The current product is derived from the
// pathname, so shared links always open with the right sidebar and switcher.
export const docsProducts = [
    {
        id: "ui",
        label: "UI",
        title: "Rad UI",
        description: "Headless components",
        home: "/docs/first-steps/introduction",
        pathPattern: /^\/docs(\/|$)/,
        sections: docsNavigationSections
    },
    {
        id: "fx",
        label: "FX",
        title: "Rad UI FX",
        description: "Accessible motion",
        home: "/fx",
        pathPattern: /^\/fx(\/|$)/,
        sections: fxNavigationSections
    }
] as const

export type DocsProduct = typeof docsProducts[number]

export const getDocsProduct = (pathname: string | null): DocsProduct | undefined => {
    if (!pathname) return undefined
    return docsProducts.find((product) => product.pathPattern.test(pathname))
}
