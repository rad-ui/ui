import generateSeoMetadata from "@/utils/seo/generateSeoMetadata"

import { getShowcaseDemo } from "../showcaseDemos"

const showcaseMetadata = (href) => {
    const demo = getShowcaseDemo(href)

    return generateSeoMetadata({
        title: `${demo.title} demo`,
        description: `${demo.summary} Built entirely with Rad UI.`,
        keywords: demo.components.map((component) => `React ${component}`),
        canonicalUrl: `https://www.rad-ui.com${href}`,
    })
}

export default showcaseMetadata
