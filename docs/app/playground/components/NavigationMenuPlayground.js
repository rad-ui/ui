'use client'

import NavigationMenu from "@radui/ui/NavigationMenu"
import PlaygroundSection from "../helpers/PlaygroundSection"

const NavigationMenuPlayground = () => (
    <div>
        <PlaygroundSection
            title="NavigationMenu"
            docsLink="/docs/components/navigation-menu"
            description="Site navigation with dropdown panels, Escape and outside-click dismissal."
        >
            <NavigationMenu.Root>
                <NavigationMenu.Item value="components">
                    <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <NavigationMenu.Link href="/docs/components/button">Button</NavigationMenu.Link>
                        <NavigationMenu.Link href="/docs/components/dialog">Dialog</NavigationMenu.Link>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item value="colors">
                    <NavigationMenu.Link href="/colors">Colors</NavigationMenu.Link>
                </NavigationMenu.Item>
            </NavigationMenu.Root>
        </PlaygroundSection>
    </div>
)

export default NavigationMenuPlayground
