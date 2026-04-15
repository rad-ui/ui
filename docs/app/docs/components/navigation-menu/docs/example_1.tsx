"use client"

import NavigationMenu from "@radui/ui/NavigationMenu"

const NavigationMenuExample = () => {
    return (
        <NavigationMenu.Root>
            <NavigationMenu.Item value="products">
                <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                    <NavigationMenu.Link href="#">Product A</NavigationMenu.Link>
                    <NavigationMenu.Link href="#">Product B</NavigationMenu.Link>
                    <NavigationMenu.Link href="#">Product C</NavigationMenu.Link>
                </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="resources">
                <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
                <NavigationMenu.Content>
                    <NavigationMenu.Link href="#">Documentation</NavigationMenu.Link>
                    <NavigationMenu.Link href="#">Blog</NavigationMenu.Link>
                </NavigationMenu.Content>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="about">
                <NavigationMenu.Link href="#">About</NavigationMenu.Link>
            </NavigationMenu.Item>
        </NavigationMenu.Root>
    )
}

export default NavigationMenuExample
