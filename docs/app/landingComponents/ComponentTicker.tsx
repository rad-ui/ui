const COMPONENTS = [
    'Accordion',
    'AlertDialog',
    'AspectRatio',
    'Avatar',
    'AvatarGroup',
    'Badge',
    'BlockQuote',
    'Button',
    'Callout',
    'Card',
    'Checkbox',
    'CheckboxCards',
    'CheckboxGroup',
    'Code',
    'Collapsible',
    'Combobox',
    'Command',
    'ContextMenu',
    'DataList',
    'Dialog',
    'Disclosure',
    'Drawer',
    'DropdownMenu',
    'Em',
    'Heading',
    'HoverCard',
    'Kbd',
    'Link',
    'Menubar',
    'Minimap',
    'NavigationMenu',
    'NumberField',
    'Progress',
    'Quote',
    'Radio',
    'RadioCards',
    'RadioGroup',
    'ScrollArea',
    'Select',
    'Separator',
    'Skeleton',
    'Slider',
    'Spinner',
    'Splitter',
    'Steps',
    'Strong',
    'Switch',
    'TabNav',
    'Table',
    'Tabs',
    'Text',
    'TextArea',
    'Theme',
    'Toggle',
    'ToggleGroup',
    'Toolbar',
    'Tooltip',
    'Tree',
    'VisuallyHidden'
]

/**
 * Ticker of the actual published entry points. The duplicated copy is
 * what makes the `-50%` translate loop seamless.
 */
export default function ComponentTicker() {
    const track = [...COMPONENTS, ...COMPONENTS]

    return (
        <section
            aria-label={`${COMPONENTS.length} published components`}
            className="relative border-y border-gray-400"
        >
            <div className="landing-ticker-mask overflow-hidden py-4">
                <div className="landing-ticker-track flex w-max items-center gap-8 pr-8">
                    {track.map((name, index) => (
                        <span key={`${name}-${index}`} className="flex shrink-0 items-center gap-8">
                            <span className="font-mono text-[0.78rem] tracking-tight text-gray-1000">
                                {name}
                            </span>
                            <span aria-hidden className="h-1 w-1 rounded-full bg-green-1000/70" />
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}