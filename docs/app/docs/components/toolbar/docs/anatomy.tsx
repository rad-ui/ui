import Toolbar from "@radui/ui/Toolbar";

export default () => {
    return (
        <Toolbar.Root aria-label="Formatting options">
            <Toolbar.ToggleGroup type="multiple" defaultValue={["bold"]}>
                <Toolbar.ToggleItem value="bold" aria-label="Bold">B</Toolbar.ToggleItem>
                <Toolbar.ToggleItem value="italic" aria-label="Italic">I</Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
            <Toolbar.Separator />
            <Toolbar.Link href="#">Link</Toolbar.Link>
        </Toolbar.Root>
    )
}
