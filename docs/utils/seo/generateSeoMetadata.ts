import generateOgTitleUrl from "./helpers/generateOgTitle"

// The small label above the title on the OG card, picked from the page's URL.
const KICKERS: [prefix: string, kicker: string][] = [
    ["/docs/components", "Components"],
    ["/docs/contributing", "Contributing"],
    ["/docs", "Docs"],
    ["/showcase", "Showcase · Built with Rad UI"],
    ["/playground", "Playground"],
]

const kickerFor = (canonicalUrl?: string) => {
    if (!canonicalUrl) return undefined
    const pathname = new URL(canonicalUrl, "https://www.rad-ui.com").pathname
    return KICKERS.find(([prefix]) => pathname.startsWith(prefix))?.[1]
}

const generateSeoMetadata = ({
    title, 
    description, 
    keywords = [],
    canonicalUrl,
    type = "website",
    publishedTime,
    modifiedTime,
    authors = ["Rad UI Team"],
    section,
    tags = [],
    kicker,
}: {
    title: string
    description: string
    keywords?: string[]
    canonicalUrl?: string
    type?: string
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
    section?: string
    tags?: string[]
    kicker?: string
}) => {
    const imageUrl = generateOgTitleUrl(title, description, kicker ?? kickerFor(canonicalUrl))
    // Link previews show this title on its own, so make sure the brand is in it.
    const socialTitle = /rad ui/i.test(title) ? title : `${title} | Rad UI`
    const defaultKeywords = [
        "React UI library",
        "headless components",
        "headless UI React",
        "accessible components",
        "React accessibility",
        "TypeScript UI",
        "React components",
        "UI library",
        "design system",
        "web components",
        "frontend development",
        "React development",
        "uncontrolled controlled components",
        "TypeScript component library"
    ]
    
    const allKeywords = Array.from(new Set([...defaultKeywords, ...keywords]))

    return {
        title: title,
        description,
        keywords: allKeywords,
        authors: authors,
        creator: "Rad UI Team",
        publisher: "Rad UI",
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: socialTitle,
            description,
            url: canonicalUrl,
            siteName: "Rad UI",
            images: [
                { 
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: socialTitle
                },
            ],
            locale: "en_US",
            type,
            publishedTime,
            modifiedTime,
            authors,
            section,
            tags,
        },
        twitter: {
            card: "summary_large_image",
            title: socialTitle,
            description,
            images: [imageUrl],
            creator: "@rad_ui",
            site: "@rad_ui",
        },
        verification: {
            google: process.env.GOOGLE_SITE_VERIFICATION,
            yandex: process.env.YANDEX_VERIFICATION,
            yahoo: process.env.YAHOO_VERIFICATION,
        },
        other: {
            "theme-color": "#000000",
            "color-scheme": "dark light",
            "apple-mobile-web-app-capable": "yes",
            "apple-mobile-web-app-status-bar-style": "default",
            "apple-mobile-web-app-title": "Rad UI",
            "application-name": "Rad UI",
            "msapplication-TileColor": "#000000",
            "msapplication-config": "/browserconfig.xml",
        }
    }
}

export default generateSeoMetadata
