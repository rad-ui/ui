import generateOgTitleUrl from "./helpers/generateOgTitle"

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
    tags = []
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
}) => {
    const imageUrl = generateOgTitleUrl(title, description)
    const defaultKeywords = [
        "React UI library",
        "headless components", 
        "accessible components",
        "TypeScript UI",
        "React components",
        "UI library",
        "design system",
        "web components",
        "frontend development",
        "React development"
    ]
    
    const allKeywords = [...new Set([...defaultKeywords, ...keywords])]

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
            title,
            description,
            url: canonicalUrl,
            siteName: "Rad UI",
            images: [
                { 
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title
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
            title,
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
