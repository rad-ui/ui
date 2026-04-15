import ScrollArea from "@radui/ui/ScrollArea"

export default () => {
    return (
        <ScrollArea.Root>
            <ScrollArea.Viewport />
            <ScrollArea.Scrollbar orientation="vertical">
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar orientation="horizontal">
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
        </ScrollArea.Root>
    )
}
