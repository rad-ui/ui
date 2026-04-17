"use client"

import Disclosure from "@radui/ui/Disclosure"

const items = [
    { title: "What is Rad UI?", content: "Rad UI is a headless component library for React. Build your own design system on top of accessible, unstyled primitives." },
    { title: "Is it accessible?", content: "Yes. All components follow WAI-ARIA patterns and support full keyboard navigation." },
    { title: "Can I use it with Tailwind?", content: "Absolutely. Since components are headless, you can style them with any CSS approach including Tailwind." }
]

const DisclosureExample = () => {
    return (
        <div className="w-[360px]">
            <Disclosure items={items} />
        </div>
    )
}

export default DisclosureExample
