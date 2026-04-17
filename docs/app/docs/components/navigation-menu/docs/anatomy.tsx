import NavigationMenu from "@radui/ui/NavigationMenu"

export default () => {
    return (
        <NavigationMenu.Root>
            <NavigationMenu.Item>
                <NavigationMenu.Trigger />
                <NavigationMenu.Content>
                    <NavigationMenu.Link href="#" />
                </NavigationMenu.Content>
            </NavigationMenu.Item>
        </NavigationMenu.Root>
    )
}
