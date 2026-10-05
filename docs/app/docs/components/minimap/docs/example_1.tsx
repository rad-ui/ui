"use client"

import Minimap from "@radui/ui/Minimap"

const sections = [
    { value: "section-intro", title: "Introduction", body: "Start here for an overview of the page and what it covers." },
    { value: "section-install", title: "Installation", body: "Add the package and import the styles once at the root of your app." },
    { value: "section-usage", title: "Usage", body: "Compose the parts you need. Each part exposes data attributes for styling." },
    { value: "section-api", title: "API", body: "Every part forwards its ref and accepts the props of the element it renders." }
]

const MinimapExample = () => {
    return (
        <Minimap.Provider className="flex w-full gap-8">
            <div className="h-64 flex-1 overflow-y-auto pr-4">
                {sections.map((section) => (
                    <Minimap.Waypoint key={section.value} value={section.value}>
                        <section className="min-h-48 py-2">
                            <h3 className="mb-2 font-semibold">{section.title}</h3>
                            <p className="text-sm">{section.body}</p>
                        </section>
                    </Minimap.Waypoint>
                ))}
            </div>
            <Minimap.Root aria-label="On this page">
                {sections.map((section, index) => (
                    <Minimap.Item key={section.value} value={section.value}>
                        <Minimap.Track>
                            <Minimap.Bubble>{index + 1}</Minimap.Bubble>
                            <Minimap.Line />
                        </Minimap.Track>
                        <Minimap.Content>{section.title}</Minimap.Content>
                    </Minimap.Item>
                ))}
            </Minimap.Root>
        </Minimap.Provider>
    )
}

export default MinimapExample
