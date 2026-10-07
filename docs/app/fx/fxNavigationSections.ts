import registry from '../../registry/registry.json'

// Component sections are generated from the registry, grouped by the second
// category of each item, so adding an FX to registry.json adds it here too.
const CATEGORY_TITLES: Record<string, string> = {
    text: 'Text',
    backgrounds: 'Backgrounds',
    interactions: 'Interactions',
    components: 'Components'
}

export const fxComponents = registry.items.filter((item) => item.type === 'registry:component')

export const fxCategoryTitle = (category: string) => CATEGORY_TITLES[category] ?? category

export const fxNavigationSections = [
    {
        type: "CATEGORY",
        title: "Getting Started",
        items: [
            { title: "Introduction", path: "/fx" },
            { title: "Installation", path: "/fx/installation" },
            { title: "Accessibility Contract", path: "/fx/accessibility" }
        ]
    },
    ...Object.keys(CATEGORY_TITLES).map((category) => ({
        type: "CATEGORY",
        title: CATEGORY_TITLES[category],
        items: fxComponents
            .filter((item) => item.categories?.[1] === category)
            .map((item) => ({ title: item.title, path: `/fx/${item.name}` }))
    })).filter((section) => section.items.length > 0)
]

export default fxNavigationSections;
