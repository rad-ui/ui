import generateOgTitleUrl from "./helpers/generateOgTitle"

// What a bare rad-ui.com link looks like when shared. Pages without their own
// openGraph metadata inherit this from the root layout.
export const SITE_SOCIAL_TITLE = "Rad UI: accessible React components, styled your way"
export const SITE_SOCIAL_DESCRIPTION =
    "60+ open-source React components with keyboard support, focus management and ARIA built in. Theme them with Clarity, retheme with tokens, or go fully headless. Totally rad."
// No title → the OG route renders the "Build something rad." hero card.
export const SITE_SOCIAL_IMAGE = {
    url: generateOgTitleUrl("", "Accessible React components, styled your way."),
    width: 1200,
    height: 630,
    alt: "Rad UI: Build something rad. Accessible React components, styled your way.",
}

export const siteOpenGraph = {
    type: "website",
    locale: "en_US",
    url: "https://www.rad-ui.com",
    siteName: "Rad UI",
    title: SITE_SOCIAL_TITLE,
    description: SITE_SOCIAL_DESCRIPTION,
    images: [SITE_SOCIAL_IMAGE],
}

export const siteTwitter = {
    card: "summary_large_image",
    title: SITE_SOCIAL_TITLE,
    description: SITE_SOCIAL_DESCRIPTION,
    images: [SITE_SOCIAL_IMAGE.url],
    creator: "@rad_ui",
    site: "@rad_ui",
}
