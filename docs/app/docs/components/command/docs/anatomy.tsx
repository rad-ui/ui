import Command from '@radui/ui/Command';

export default function Anatomy() {
    return (
        <Command>
            <Command.Input />
            <Command.List>
                <Command.Empty />
                <Command.Group heading="Group">
                    <Command.Item value="item">
                        Item
                        <Command.Shortcut />
                    </Command.Item>
                </Command.Group>
                <Command.Separator />
                <Command.Loading>Loading…</Command.Loading>
            </Command.List>
        </Command>
    );
}
