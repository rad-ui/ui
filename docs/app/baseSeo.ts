import generateSeoMetadata from "@/utils/seo/generateSeoMetadata"

const baseSeoMetadata = generateSeoMetadata({
    title: "Rad UI - Modern React UI Library for Accessible Web Applications",
    description: "Rad UI is a fast, flexible, and accessible open-source React UI library. Offering headless and unstyled components, it provides developers with the flexibility to customize and integrate seamlessly into any design system. Built with TypeScript and accessibility-first principles.",
    keywords: [
        "React UI library",
        "headless UI components", 
        "accessible React components",
        "TypeScript UI library",
        "React design system",
        "web accessibility",
        "WCAG compliant components",
        "React component library",
        "frontend development",
        "UI framework",
        "React hooks",
        "component composition",
        "customizable UI",
        "modern web development"
    ],
    canonicalUrl: "https://www.rad-ui.com",
    type: "website",
    authors: ["Rad UI Team"],
    tags: ["React", "UI Library", "TypeScript", "Accessibility", "Design System"]
})

export default baseSeoMetadata