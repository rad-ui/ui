"use client"

import DirectionProvider from "@radui/ui/DirectionProvider"
import Tabs from "@radui/ui/Tabs"

// Arrow keys move right-to-left here: ArrowLeft goes to the next tab.
export default function DirectionProviderExample() {
    return (
        <DirectionProvider dir="rtl">
            <div dir="rtl">
                <Tabs.Root defaultValue="one">
                    <Tabs.List>
                        <Tabs.Trigger value="one">الأول</Tabs.Trigger>
                        <Tabs.Trigger value="two">الثاني</Tabs.Trigger>
                        <Tabs.Trigger value="three">الثالث</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="one">المحتوى الأول</Tabs.Content>
                    <Tabs.Content value="two">المحتوى الثاني</Tabs.Content>
                    <Tabs.Content value="three">المحتوى الثالث</Tabs.Content>
                </Tabs.Root>
            </div>
        </DirectionProvider>
    )
}
