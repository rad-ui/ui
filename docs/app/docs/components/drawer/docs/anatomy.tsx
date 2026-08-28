import Drawer from '@radui/ui/Drawer'

export default () => {
    return (
        <Drawer.Root>
            <Drawer.Trigger>Open drawer</Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay />
                <Drawer.Content>
                    <Drawer.Handle />
                    <Drawer.Title>Drawer title</Drawer.Title>
                    <Drawer.Description>Drawer description</Drawer.Description>
                    <Drawer.Close>Close</Drawer.Close>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}
