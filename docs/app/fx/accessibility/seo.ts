import generateSeoMetadata from "@/utils/seo/generateSeoMetadata"

const metadata = generateSeoMetadata({
    title: "Accessibility Contract - Rad UI FX",
    description: "The accessibility rules every Rad UI FX component follows: reduced motion, screen reader output, decorative layers, pause controls and focus.",
    keywords: ["accessible animation", "prefers-reduced-motion", "WCAG animation", "motion accessibility"],
    canonicalUrl: "https://www.rad-ui.com/fx/accessibility"
});

export default metadata
