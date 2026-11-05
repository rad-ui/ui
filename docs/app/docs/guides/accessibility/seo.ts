import generateSeoMetadata from "@/utils/seo/generateSeoMetadata"

const accessibilityMetadata = generateSeoMetadata({
    title: "Accessibility Guide for Rad UI",
    description: "How Rad UI components handle keyboard navigation, focus, ARIA roles and screen readers, and what your app still has to do to stay accessible.",
    canonicalUrl: "https://www.rad-ui.com/docs/guides/accessibility"
})

export default accessibilityMetadata
