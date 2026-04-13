import TabNav from "@radui/ui/TabNav"

export default () => {
    return (
        <TabNav.Root value="tab1" onValueChange={() => {}}>
            <TabNav.Link value="tab1" href="#tab1" />
            <TabNav.Link value="tab2" href="#tab2" />
        </TabNav.Root>
    )
}
