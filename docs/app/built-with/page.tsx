import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"
import Link from "next/link"

import CodeWithCopy from "@/components/CodeWithCopy"
import FullHeightScroll from "@/components/layout/ScrollContainers/FullHeightScroll"
import generateSeoMetadata from "@/utils/seo/generateSeoMetadata"

export const metadata = generateSeoMetadata({
    title: "Built with Rad UI",
    description:
        "Products built on Rad UI's headless, accessible React components, and a one-line link you can add to yours.",
    canonicalUrl: "https://www.rad-ui.com/built-with",
    kicker: "Showcase · Built with Rad UI",
})

/** Real products using Rad UI in production code. Add yours with a PR. */
const products = [
    {
        name: "X (working name)",
        href: "https://github.com/kotAPI/kinetic-beat",
        summary:
            "A browser-based editor for beat-synced kinetic typography videos. Its controls, dialogs, sliders and inspector fields are Rad UI.",
        components: ["Button", "Dialog", "Select", "ToggleGroup", "Slider", "Switch", "NumberField", "TextField", "TextArea", "Progress", "Badge", "Theme"],
    },
]

const badgeSnippet = `<a href="https://www.rad-ui.com/built-with?ref=your-product">Built with Rad UI</a>`

export default function BuiltWithPage() {
    return (
        <FullHeightScroll>
            <div className="relative lg:p-10">
                <div className="mx-auto max-w-4xl space-y-10">
                    <div className="space-y-4 text-center">
                        <Heading as="h1" className="text-4xl font-bold text-gray-1000">
                            Built with Rad UI
                        </Heading>
                        <Text className="mx-auto max-w-2xl text-lg text-gray-950">
                            Products that ship Rad UI&apos;s headless, accessible components to real users. The demos in
                            the <Link href="/showcase/music-app" className="underline">showcase</Link> show what&apos;s
                            possible; these are real products built on it.
                        </Text>
                    </div>

                    <ul className="space-y-4">
                        {products.map((product) => (
                            <li key={product.name} className="rounded-lg border border-gray-400 p-5">
                                <a
                                    href={product.href}
                                    className="text-xl font-semibold text-gray-1000 underline-offset-4 hover:underline"
                                >
                                    {product.name}
                                </a>
                                <Text className="mt-2 text-gray-950">{product.summary}</Text>
                                <Text className="mt-3 text-sm text-gray-950">
                                    Uses: {product.components.join(", ")}
                                </Text>
                            </li>
                        ))}
                    </ul>

                    <section className="space-y-3">
                        <Heading as="h2" className="text-2xl font-semibold text-gray-1000">
                            Add the link to your product
                        </Heading>
                        <Text className="text-gray-950">
                            A plain link in your footer is enough, styled however you like: Rad UI stays headless, so
                            there&apos;s no badge component to install. Set <code>ref</code> to your product&apos;s name
                            so we can see where visitors come from, then open a PR adding your product to this page.
                        </Text>
                        <CodeWithCopy code={badgeSnippet} />
                    </section>
                </div>
            </div>
        </FullHeightScroll>
    )
}
