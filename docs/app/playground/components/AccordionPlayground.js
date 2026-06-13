'use client'

import { ChevronDown } from "lucide-react"
import Accordion from "@radui/ui/Accordion"
import ColorLooper from "../helpers/ColorLooper"

const items = [
    {
        id: "installation",
        title: "Installation",
        content: "Install the package, include the theme stylesheet, and start with a small surface before scaling across the app."
    },
    {
        id: "composition",
        title: "Composition",
        content: "Use the compound API so structure stays explicit and each sub-part can be rearranged without losing behavior."
    },
    {
        id: "theming",
        title: "Theming",
        content: "Keep the playground neutral and let product pages decide color treatment."
    }
]

const AccordionPlayground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="Accordion"
            docsLink="/docs/components/accordion"
            description="Composable sections with keyboard support and clear trigger/content structure."
        >
            <Accordion.Root collapsible defaultValue={["installation"]}>
                {items.map((item) => (
                    <Accordion.Item key={item.id} value={item.id}>
                        <Accordion.Header>
                            <Accordion.Trigger>
                                {item.title}
                                <ChevronDown className="rad-ui-accordion-chevron" />
                            </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content>
                            {item.content}
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion.Root>
        </ColorLooper>
    </div>
)

export default AccordionPlayground
