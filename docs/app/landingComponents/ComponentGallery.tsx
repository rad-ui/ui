'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import {
    ArrowUpRight,
    ChevronDown,
    Copy,
    Download,
    MoreHorizontal,
    Pencil,
    Share2,
    SlidersHorizontal,
    Trash2
} from 'lucide-react'

import Accordion from '@radui/ui/Accordion'
import Button from '@radui/ui/Button'
import Combobox from '@radui/ui/Combobox'
import Dialog from '@radui/ui/Dialog'
import DropdownMenu from '@radui/ui/DropdownMenu'
import NumberField from '@radui/ui/NumberField'
import Popover from '@radui/ui/Popover'
import Switch from '@radui/ui/Switch'
import Toast from '@radui/ui/Toast'
import Tooltip from '@radui/ui/Tooltip'

function Tile({ name, href, hint, children }: { name: string; href: string; hint: string; children: ReactNode }) {
    return (
        <div className="flex min-h-[188px] min-w-0 flex-col rounded-2xl sm:min-h-[236px] bg-gray-50 p-5">
            <div className="flex flex-1 items-center justify-center py-4">{children}</div>
            <div className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                    <h3 className="text-[0.9375rem] font-semibold text-gray-1000">{name}</h3>
                    <p className="mt-0.5 text-[0.8125rem] leading-5 text-gray-950">{hint}</p>
                </div>
                <Link
                    href={href}
                    aria-label={`${name} docs`}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-gray-950 transition-colors hover:bg-gray-100 hover:text-gray-1000"
                >
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
            </div>
        </div>
    )
}

function DialogTile() {
    const [open, setOpen] = useState(false)
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <Button variant="outline">Delete project</Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content>
                    <Dialog.Title>Delete “Aurora”?</Dialog.Title>
                    <Dialog.Description>
                        Tab cycles inside this dialog, Escape closes it, and focus goes back to the trigger.
                    </Dialog.Description>
                    <Dialog.Footer>
                        <Dialog.Close asChild>
                            <Button variant="ghost">Cancel</Button>
                        </Dialog.Close>
                        <Button variant="destructive" onClick={() => setOpen(false)}>
                            Delete
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

function MenuTile() {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger aria-label="File actions">
                <MoreHorizontal size={18} aria-hidden />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Item label="Rename">
                    <span className="flex items-center gap-2.5">
                        <Pencil size={14} aria-hidden />
                        Rename
                    </span>
                </DropdownMenu.Item>
                <DropdownMenu.Item label="Duplicate">
                    <span className="flex items-center gap-2.5">
                        <Copy size={14} aria-hidden />
                        Duplicate
                    </span>
                </DropdownMenu.Item>
                <DropdownMenu.Item label="Download">
                    <span className="flex items-center gap-2.5">
                        <Download size={14} aria-hidden />
                        Download
                    </span>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item label="Delete">
                    <span className="flex items-center gap-2.5">
                        <Trash2 size={14} aria-hidden />
                        Delete
                    </span>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

const FRAMEWORKS = ['Next.js', 'Remix', 'Vite', 'Astro', 'Gatsby', 'Expo']

function ComboboxTile() {
    return (
        <div className="w-full max-w-[220px]">
            <Combobox.Root>
                <Combobox.Trigger aria-label="Framework">Pick a framework</Combobox.Trigger>
                <Combobox.Content>
                    <Combobox.Search placeholder="Search…" />
                    {FRAMEWORKS.map((value) => (
                        <Combobox.Item key={value} value={value}>
                            {value}
                        </Combobox.Item>
                    ))}
                </Combobox.Content>
            </Combobox.Root>
        </div>
    )
}

function ToastButtons() {
    const manager = Toast.useToastManager()
    return (
        <>
            <Toast.Portal>
                <Toast.Viewport>
                    {manager.toasts.map((toast) => (
                        <Toast.Root key={toast.id} toast={toast}>
                            <Toast.Content>
                                <Toast.Title>{toast.title}</Toast.Title>
                                {toast.description ? <Toast.Description>{toast.description}</Toast.Description> : null}
                                <Toast.Close />
                            </Toast.Content>
                        </Toast.Root>
                    ))}
                </Toast.Viewport>
            </Toast.Portal>
            <Button
                variant="soft"
                onClick={() => {
                    manager.add({
                        title: 'Changes published',
                        description: 'Announced to screen readers through a live region.',
                        variant: 'success'
                    })
                }}
            >
                Publish
            </Button>
        </>
    )
}

function ToastTile() {
    return (
        <Toast.Provider position="bottom-right" limit={3}>
            <ToastButtons />
        </Toast.Provider>
    )
}

function TooltipTile() {
    return (
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <Button variant="outline" aria-label="Share">
                    <Share2 size={16} aria-hidden />
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>Share with your team</Tooltip.Content>
        </Tooltip.Root>
    )
}

function PopoverTile() {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button variant="soft">
                    <SlidersHorizontal size={16} aria-hidden /> Filters
                </Button>
            </Popover.Trigger>
            <Popover.Content sideOffset={8}>
                <div className="grid w-56 gap-3">
                    <p className="text-sm font-semibold">Filters</p>
                    <div className="flex items-center justify-between gap-3 text-sm">
                        <label htmlFor="landing-pop-archived">Show archived</label>
                        <Switch.Root id="landing-pop-archived">
                            <Switch.Thumb />
                        </Switch.Root>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-sm">
                        <label htmlFor="landing-pop-mine">Only mine</label>
                        <Switch.Root id="landing-pop-mine" defaultChecked>
                            <Switch.Thumb />
                        </Switch.Root>
                    </div>
                </div>
                <Popover.Arrow />
            </Popover.Content>
        </Popover.Root>
    )
}

function AccordionTile() {
    return (
        <Accordion.Root collapsible defaultValue={['ssr']} className="w-full">
            {[
                { id: 'ssr', q: 'Server rendering?', a: 'Yes. IDs and data attributes are deterministic.' },
                { id: 'bundle', q: 'Tree-shakeable?', a: 'Import each component from its own entry.' }
            ].map((item) => (
                <Accordion.Item key={item.id} value={item.id}>
                    <Accordion.Header>
                        <Accordion.Trigger>
                            {item.q}
                            <ChevronDown className="rad-ui-accordion-chevron" aria-hidden />
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>{item.a}</Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion.Root>
    )
}

function NumberFieldTile() {
    return (
        <NumberField.Root defaultValue={2} min={1} max={12} step={1}>
            <NumberField.Decrement aria-label="Fewer seats">−</NumberField.Decrement>
            <NumberField.Input aria-label="Seats" />
            <NumberField.Increment aria-label="More seats">+</NumberField.Increment>
        </NumberField.Root>
    )
}

export default function ComponentGallery() {
    return (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Tile name="Dialog" href="/docs/components/dialog" hint="Focus trap and restore">
                <DialogTile />
            </Tile>
            <Tile name="Dropdown menu" href="/docs/components/dropdown-menu" hint="Arrows, typeahead, Escape">
                <MenuTile />
            </Tile>
            <Tile name="Combobox" href="/docs/components/combobox" hint="Searchable, filterable listbox">
                <ComboboxTile />
            </Tile>
            <Tile name="Toast" href="/docs/components/toast" hint="Stacked, announced, dismissible">
                <ToastTile />
            </Tile>
            <Tile name="Tooltip" href="/docs/components/tooltip" hint="Opens on hover and focus">
                <TooltipTile />
            </Tile>
            <Tile name="Popover" href="/docs/components/popover" hint="Positioned with collision handling">
                <PopoverTile />
            </Tile>
            <Tile name="Accordion" href="/docs/components/accordion" hint="Single or multiple panels">
                <AccordionTile />
            </Tile>
            <Tile name="Number field" href="/docs/components/number-field" hint="Clamped steps, arrow keys">
                <NumberFieldTile />
            </Tile>
        </div>
    )
}
