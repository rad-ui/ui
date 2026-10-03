'use client'

import React from "react"
import {
    Bell,
    Calendar,
    Check,
    ChevronRight,
    FileCode2,
    FolderOpen,
    Home,
    Inbox,
    Menu,
    Search,
    Settings,
    SlidersHorizontal,
    X
} from "lucide-react"
import Accordion from "@radui/ui/Accordion"
import Badge from "@radui/ui/Badge"
import Avatar from "@radui/ui/Avatar"
import AvatarGroup from "@radui/ui/AvatarGroup"
import Breadcrumb from "@radui/ui/Breadcrumb"
import Button from "@radui/ui/Button"
import Callout from "@radui/ui/Callout"
import Card from "@radui/ui/Card"
import Checkbox from "@radui/ui/Checkbox"
import CheckboxCards from "@radui/ui/CheckboxCards"
import CheckboxGroup from "@radui/ui/CheckboxGroup"
import Collapsible from "@radui/ui/Collapsible"
import Combobox from "@radui/ui/Combobox"
import Command from "@radui/ui/Command"
import ContextMenu from "@radui/ui/ContextMenu"
import DataList from "@radui/ui/DataList"
import BlockQuote from "@radui/ui/BlockQuote"
import Code from "@radui/ui/Code"
import Disclosure from "@radui/ui/Disclosure"
import Drawer from "@radui/ui/Drawer"
import DropdownMenu from "@radui/ui/DropdownMenu"
import Fieldset from "@radui/ui/Fieldset"
import Heading from "@radui/ui/Heading"
import HoverCard from "@radui/ui/HoverCard"
import Kbd from "@radui/ui/Kbd"
import Link from "@radui/ui/Link"
import LiveRegion from "@radui/ui/LiveRegion"
import Menubar from "@radui/ui/Menubar"
import Minimap from "@radui/ui/Minimap"
import NavigationMenu from "@radui/ui/NavigationMenu"
import NumberField from "@radui/ui/NumberField"
import Popover from "@radui/ui/Popover"
import Progress from "@radui/ui/Progress"
import Radio from "@radui/ui/Radio"
import RadioCards from "@radui/ui/RadioCards"
import RadioGroup from "@radui/ui/RadioGroup"
import ScrollArea from "@radui/ui/ScrollArea"
import Select from "@radui/ui/Select"
import Separator from "@radui/ui/Separator"
import Skeleton from "@radui/ui/Skeleton"
import Slider from "@radui/ui/Slider"
import Spinner from "@radui/ui/Spinner"
import Splitter from "@radui/ui/Splitter"
import Steps from "@radui/ui/Steps"
import Switch from "@radui/ui/Switch"
import TabNav from "@radui/ui/TabNav"
import Text from "@radui/ui/Text"
import TextArea from "@radui/ui/TextArea"
import TextField from "@radui/ui/TextField"
import Toast from "@radui/ui/Toast"
import Toggle from "@radui/ui/Toggle"
import ToggleGroup from "@radui/ui/ToggleGroup"
import Toolbar from "@radui/ui/Toolbar"
import Tooltip from "@radui/ui/Tooltip"
import Tree from "@radui/ui/Tree"
import ColorLooper from "../helpers/ColorLooper"

const colors = ["gray", "blue", "green", "red", "plum", "gold"]
const badgeVariants = ["solid", "soft", "surface", "outline", "ghost"]
const buttonVariants = ["solid", "soft", "outline", "ghost"]
const sizes = ["small", "medium", "large", "x-large"]
const surfaceVariants = ["soft", "outline"]

const SectionGrid = ({ children }) => (
    <div className="grid gap-4 lg:grid-cols-2">
        {children}
    </div>
)

const Panel = ({ title, children }) => (
    <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-xs">
        <Text className="mb-3 text-sm font-semibold text-gray-950">{title}</Text>
        {children}
    </div>
)

const Label = ({ children, htmlFor }) => (
    <label htmlFor={htmlFor} className="text-sm font-medium text-gray-900">
        {children}
    </label>
)

const Row = ({ icon, label, description }) => (
    <span className="rad-ui-command-item-main">
        {icon}
        <span className="rad-ui-command-item-copy">
            <span className="rad-ui-command-item-label">{label}</span>
            {description ? <span className="rad-ui-command-item-description">{description}</span> : null}
        </span>
    </span>
)

const treeItems = [
    {
        label: "Components",
        expanded: true,
        items: [
            { label: "Inputs", expanded: false },
            { label: "Overlays", expanded: false },
            { label: "Navigation", expanded: false }
        ]
    },
    {
        label: "Tokens",
        expanded: false,
        items: [{ label: "Colors", expanded: false }, { label: "Spacing", expanded: false }]
    }
]

const ToastShelf = () => {
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
            <div className="flex flex-wrap gap-2">
                <Button onClick={() => manager.add({ title: "Saved changes", variant: "success" })}>Success</Button>
                <Button variant="outline" onClick={() => manager.add({ title: "Build failed", description: "Check the release logs.", variant: "error" })}>Error</Button>
                <Button variant="soft" onClick={() => manager.add({ title: "Sync queued", variant: "info" })}>Info</Button>
            </div>
        </>
    )
}

const CompleteCoveragePlayground = () => {
    const [liveMessage, setLiveMessage] = React.useState("Ready")
    const [checkboxCards, setCheckboxCards] = React.useState(["security"])
    const [checkboxGroup, setCheckboxGroup] = React.useState(["email"])
    const [sliderValue, setSliderValue] = React.useState([24, 72])
    const [numberValue, setNumberValue] = React.useState(3)

    return (
        <div className="grid gap-6">
            <ColorLooper
                title="Theme colors, variants, and sizes"
                docsLink="/docs/components/badge"
                description="The playground should make theme breadth visible at a glance, not hide it behind one happy-path example."
            >
                <div className="grid gap-6">
                    <Panel title="Badge colors and variants">
                        <div className="grid gap-3">
                            {badgeVariants.map((variant) => (
                                <div key={variant} className="grid gap-2 sm:grid-cols-[5rem_1fr] sm:items-center">
                                    <Text className="text-xs uppercase text-gray-600">{variant}</Text>
                                    <div className="flex flex-wrap gap-2">
                                        {colors.map((color) => (
                                            <Badge key={`${variant}-${color}`} color={color} variant={variant}>
                                                {color}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Panel>
                    <Panel title="Button variants and sizes">
                        <div className="grid gap-4">
                            {buttonVariants.map((variant) => (
                                <div key={variant} className="flex flex-wrap items-center gap-2">
                                    {sizes.map((size) => (
                                        <Button key={`${variant}-${size}`} size={size} variant={variant}>
                                            {variant}
                                        </Button>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </Panel>
                    <Panel title="Callout colors">
                        <div className="grid gap-3">
                            {colors.slice(1).map((color) => (
                                <Callout.Root key={color} color={color} variant={color === "red" ? "outline" : "soft"}>
                                    <Callout.Icon><Check size={16} /></Callout.Icon>
                                    <Callout.Text>
                                        <strong>{color}</strong>
                                        <span>Color prop coverage across alert-like content.</span>
                                    </Callout.Text>
                                </Callout.Root>
                            ))}
                        </div>
                    </Panel>
                </div>
            </ColorLooper>

            <ColorLooper
                title="Forms and selection"
                docsLink="/docs/components/checkbox"
                description="Inputs, grouped choices, cards, text entry, numeric controls, sliders, and switches."
            >
                <SectionGrid>
                    <Panel title="Checkbox, radio, switch, toggle">
                        <div className="grid gap-4">
                            <label className="flex items-center gap-3">
                                <Checkbox.Root defaultChecked>
                                    <Checkbox.Indicator />
                                </Checkbox.Root>
                                <span>Email notifications</span>
                            </label>
                            <RadioGroup.Root defaultValue="comfortable" aria-label="Density">
                                {["compact", "comfortable", "spacious"].map((value) => (
                                    <RadioGroup.Label key={value}>
                                        <RadioGroup.Item value={value}>
                                            <RadioGroup.Indicator />
                                        </RadioGroup.Item>
                                        {value}
                                    </RadioGroup.Label>
                                ))}
                            </RadioGroup.Root>
                            <label className="flex items-center gap-3">
                                <Switch.Root defaultChecked>
                                    <Switch.Thumb />
                                </Switch.Root>
                                <span>Publish automatically</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                                <Toggle defaultPressed>Preview</Toggle>
                                <ToggleGroup.Root type="multiple" defaultValue={["bold"]}>
                                    <ToggleGroup.Item value="bold">B</ToggleGroup.Item>
                                    <ToggleGroup.Item value="italic">I</ToggleGroup.Item>
                                    <ToggleGroup.Item value="underline">U</ToggleGroup.Item>
                                </ToggleGroup.Root>
                            </div>
                        </div>
                    </Panel>

                    <Panel title="Text fields and fieldset">
                        <Fieldset.Root className="grid gap-3">
                            <Fieldset.Legend>Profile</Fieldset.Legend>
                            <Fieldset.Description>Common input states in one form block.</Fieldset.Description>
                            <div className="grid gap-2">
                                <Label htmlFor="playground-name">Display name</Label>
                                <TextField id="playground-name" placeholder="Ada Lovelace" startSlot={<Search size={16} />} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="playground-bio">Bio</Label>
                                <TextArea id="playground-bio" placeholder="Write a short profile..." />
                            </div>
                            <Fieldset.Message>Form message slot</Fieldset.Message>
                        </Fieldset.Root>
                    </Panel>

                    <Panel title="Checkbox and radio cards">
                        <div className="grid gap-4">
                            <CheckboxCards.Root value={checkboxCards} onValueChange={setCheckboxCards} name="playground-preferences">
                                {[
                                    ["security", "Security alerts", "Critical account activity."],
                                    ["product", "Product updates", "Feature launches and release notes."]
                                ].map(([value, title, description]) => (
                                    <CheckboxCards.Item key={value} value={value}>
                                        <CheckboxCards.Content><CheckboxCards.Indicator /></CheckboxCards.Content>
                                        <div>
                                            <div className="text-sm font-semibold">{title}</div>
                                            <div className="text-xs text-gray-600">{description}</div>
                                        </div>
                                    </CheckboxCards.Item>
                                ))}
                            </CheckboxCards.Root>
                            <RadioCards.Root defaultValue="pro" aria-label="Plan">
                                {[
                                    ["starter", "Starter", "Small teams."],
                                    ["pro", "Pro", "Growing products."],
                                    ["enterprise", "Enterprise", "Large organizations."]
                                ].map(([value, title, description]) => (
                                    <RadioCards.Item key={value} value={value}>
                                        <div className="rad-ui-radio-cards-title">{title}</div>
                                        <div className="rad-ui-radio-cards-description">{description}</div>
                                    </RadioCards.Item>
                                ))}
                            </RadioCards.Root>
                        </div>
                    </Panel>

                    <Panel title="Select, combobox, command">
                        <div className="grid gap-4">
                            <Select.Root defaultValue="react">
                                <Select.Trigger>Framework</Select.Trigger>
                                <Select.Content>
                                    <Select.Group>
                                        {["react", "vue", "svelte", "solid"].map((value) => (
                                            <Select.Item key={value} value={value}><Select.Indicator />{value}</Select.Item>
                                        ))}
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                            <Combobox.Root>
                                <Combobox.Trigger>Choose component</Combobox.Trigger>
                                <Combobox.Content>
                                    <Combobox.Search placeholder="Search components..." />
                                    {["Button", "Dialog", "ScrollArea", "Toolbar"].map((value) => (
                                        <Combobox.Item key={value} value={value}>{value}</Combobox.Item>
                                    ))}
                                </Combobox.Content>
                            </Combobox.Root>
                            <Command style={{ width: "100%" }}>
                                <Command.Input placeholder="Type a command..." />
                                <Command.List>
                                    <Command.Empty>No results found.</Command.Empty>
                                    <Command.Group heading="Navigation">
                                        <Command.Item value="home"><Row icon={<Home />} label="Home" /></Command.Item>
                                        <Command.Item value="inbox"><Row icon={<Inbox />} label="Inbox" /></Command.Item>
                                        <Command.Item value="settings"><Row icon={<Settings />} label="Settings" /></Command.Item>
                                    </Command.Group>
                                </Command.List>
                            </Command>
                        </div>
                    </Panel>

                    <Panel title="Number and range">
                        <div className="grid gap-5">
                            <NumberField.Root value={numberValue} onValueChange={setNumberValue} min={0} max={10} step={1}>
                                <NumberField.Decrement>-</NumberField.Decrement>
                                <NumberField.Input />
                                <NumberField.Increment>+</NumberField.Increment>
                            </NumberField.Root>
                            <Slider aria-label="Range" value={sliderValue} onValueChange={setSliderValue} />
                            <Slider aria-label="Disabled" defaultValue={64} disabled />
                        </div>
                    </Panel>

                    <Panel title="Checkbox group">
                        <CheckboxGroup.Root value={checkboxGroup} onValueChange={setCheckboxGroup} aria-label="Channels">
                            {["email", "sms", "push"].map((value) => (
                                <CheckboxGroup.Label key={value}>
                                    <CheckboxGroup.Trigger value={value}>
                                        <CheckboxGroup.Indicator />
                                    </CheckboxGroup.Trigger>
                                    {value}
                                </CheckboxGroup.Label>
                            ))}
                        </CheckboxGroup.Root>
                    </Panel>
                </SectionGrid>
            </ColorLooper>

            <ColorLooper
                title="Navigation and structure"
                docsLink="/docs/components/navigation-menu"
                description="Breadcrumbs, menus, tabs, tab navigation, trees, steps, minimap, data lists, toolbar, and scroll areas."
            >
                <SectionGrid>
                    <Panel title="Breadcrumb and navigation menu">
                        <div className="grid gap-4">
                            <Breadcrumb.Root>
                                <Breadcrumb.List>
                                    <Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link><Breadcrumb.Separator /></Breadcrumb.Item>
                                    <Breadcrumb.Item><Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link><Breadcrumb.Separator /></Breadcrumb.Item>
                                    <Breadcrumb.Item><Breadcrumb.Page>Playground</Breadcrumb.Page></Breadcrumb.Item>
                                </Breadcrumb.List>
                            </Breadcrumb.Root>
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
                        </div>
                    </Panel>

                    <Panel title="Menus">
                        <div className="flex flex-wrap gap-3">
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger><Menu size={18} /></DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Item label="Profile">Profile</DropdownMenu.Item>
                                    <DropdownMenu.Item label="Settings">Settings</DropdownMenu.Item>
                                    <DropdownMenu.Separator />
                                    <DropdownMenu.Sub>
                                        <DropdownMenu.SubTrigger>More <ChevronRight size={14} /></DropdownMenu.SubTrigger>
                                        <DropdownMenu.Content>
                                            <DropdownMenu.Item label="Help">Help</DropdownMenu.Item>
                                            <DropdownMenu.Item label="Feedback">Feedback</DropdownMenu.Item>
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Sub>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                            <Menubar.Root>
                                <Menubar.Menu>
                                    <Menubar.Trigger>File</Menubar.Trigger>
                                    <Menubar.Content>
                                        <Menubar.Item label="New">New</Menubar.Item>
                                        <Menubar.Item label="Open">Open</Menubar.Item>
                                    </Menubar.Content>
                                </Menubar.Menu>
                                <Menubar.Menu>
                                    <Menubar.Trigger>Edit</Menubar.Trigger>
                                    <Menubar.Content>
                                        <Menubar.Item label="Undo">Undo</Menubar.Item>
                                        <Menubar.Item label="Redo">Redo</Menubar.Item>
                                    </Menubar.Content>
                                </Menubar.Menu>
                            </Menubar.Root>
                            <ContextMenu.Root>
                                <ContextMenu.Trigger>
                                    <div className="rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm">Right click target</div>
                                </ContextMenu.Trigger>
                                <ContextMenu.Content>
                                    <ContextMenu.Item label="Copy">Copy</ContextMenu.Item>
                                    <ContextMenu.Item label="Paste">Paste</ContextMenu.Item>
                                </ContextMenu.Content>
                            </ContextMenu.Root>
                        </div>
                    </Panel>

                    <Panel title="Tab navigation and toolbar">
                        <div className="grid gap-4">
                            <TabNav.Root defaultValue="overview">
                                <TabNav.Link value="overview" href="#overview">Overview</TabNav.Link>
                                <TabNav.Link value="usage" href="#usage">Usage</TabNav.Link>
                                <TabNav.Link value="api" href="#api">API</TabNav.Link>
                            </TabNav.Root>
                            <Toolbar.Root aria-label="Editor toolbar">
                                <Toolbar.Button aria-label="Bold">B</Toolbar.Button>
                                <Toolbar.Button aria-label="Italic">I</Toolbar.Button>
                                <Toolbar.Separator />
                                <Toolbar.ToggleGroup type="single">
                                    <Toolbar.ToggleItem value="left">L</Toolbar.ToggleItem>
                                    <Toolbar.ToggleItem value="center">C</Toolbar.ToggleItem>
                                </Toolbar.ToggleGroup>
                                <Toolbar.Link href="/docs/components/toolbar">Docs</Toolbar.Link>
                            </Toolbar.Root>
                        </div>
                    </Panel>

                    <Panel title="Data list and tree">
                        <div className="grid gap-4">
                            <DataList.Root>
                                <DataList.Item>
                                    <DataList.Label>Status</DataList.Label>
                                    <DataList.Value><Badge color="green">Live</Badge></DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                    <DataList.Label>Version</DataList.Label>
                                    <DataList.Value>0.6.0</DataList.Value>
                                </DataList.Item>
                            </DataList.Root>
                            <Tree.Root aria-label="Component groups">
                                {treeItems.map((item) => (
                                    <Tree.Item key={item.label} item={item}>{item.label}</Tree.Item>
                                ))}
                            </Tree.Root>
                        </div>
                    </Panel>

                    <Panel title="Steps and minimap">
                        <Minimap.Provider>
                            <div className="grid gap-4 md:grid-cols-[1fr_14rem]">
                                <Steps.Root>
                                    {["Install", "Style", "Ship"].map((step, index) => (
                                        <Steps.Item key={step} value={String(index)}>
                                            <Steps.Track><Steps.Bubble>{index + 1}</Steps.Bubble><Steps.Line /></Steps.Track>
                                            <Steps.Content><Text>{step}</Text></Steps.Content>
                                        </Steps.Item>
                                    ))}
                                </Steps.Root>
                                <Minimap.Root>
                                    {["Install", "Style", "Ship"].map((step, index) => (
                                        <Minimap.Item key={step} value={String(index)}>
                                            <Minimap.Track><Minimap.Bubble>{index + 1}</Minimap.Bubble><Minimap.Line /></Minimap.Track>
                                            <Minimap.Content><Text>{step}</Text></Minimap.Content>
                                        </Minimap.Item>
                                    ))}
                                </Minimap.Root>
                            </div>
                        </Minimap.Provider>
                    </Panel>

                    <Panel title="Scroll area and splitter">
                        <div className="grid gap-4">
                            <div className="h-44 rounded-lg border border-gray-200">
                                <ScrollArea.Root type="always">
                                    <ScrollArea.Viewport>
                                        <div className="grid w-[720px] gap-2 p-4">
                                            {Array.from({ length: 12 }).map((_, index) => (
                                                <div key={index} className="rounded-md bg-gray-100 p-2 text-sm">Scrollable row {index + 1}</div>
                                            ))}
                                        </div>
                                    </ScrollArea.Viewport>
                                    <ScrollArea.Scrollbar orientation="vertical"><ScrollArea.Thumb /></ScrollArea.Scrollbar>
                                    <ScrollArea.Scrollbar orientation="horizontal"><ScrollArea.Thumb /></ScrollArea.Scrollbar>
                                </ScrollArea.Root>
                            </div>
                            <div className="h-44 overflow-hidden rounded-lg border border-gray-200">
                                <Splitter.Root defaultSizes={[35, 65]}>
                                    <Splitter.Panel index={0}><div className="h-full bg-gray-100 p-3">List</div></Splitter.Panel>
                                    <Splitter.Handle index={0} />
                                    <Splitter.Panel index={1}><div className="h-full bg-white p-3">Preview</div></Splitter.Panel>
                                </Splitter.Root>
                            </div>
                        </div>
                    </Panel>
                </SectionGrid>
            </ColorLooper>

            <ColorLooper
                title="Overlays and feedback"
                docsLink="/docs/components/popover"
                description="Dialogs, drawers, popovers, hover cards, tooltips, live regions, toast, loading, progress, and disclosure behavior."
            >
                <SectionGrid>
                    <Panel title="Popover, hover card, tooltip">
                        <div className="flex min-h-36 flex-wrap items-center gap-4">
                            <Popover.Root>
                                <Popover.Trigger asChild>
                                    <Button variant="soft"><SlidersHorizontal size={16} /> Settings</Button>
                                </Popover.Trigger>
                                <Popover.Content sideOffset={8}>
                                    <div className="grid w-64 gap-3">
                                        <Heading as="h3">Dimensions</Heading>
                                        <TextField defaultValue="320px" />
                                        <Popover.Close aria-label="Close"><X size={16} /></Popover.Close>
                                    </div>
                                    <Popover.Arrow />
                                </Popover.Content>
                            </Popover.Root>
                            <HoverCard.Root openDelay={100}>
                                <HoverCard.Trigger><Link href="#">@radui</Link></HoverCard.Trigger>
                                <HoverCard.Content>
                                    <div className="w-64">
                                        <Text className="font-semibold">Rad UI</Text>
                                        <Text>Headless React components with accessible behavior.</Text>
                                    </div>
                                </HoverCard.Content>
                            </HoverCard.Root>
                            <Tooltip.Root>
                                <Tooltip.Trigger>
                                    <span className="inline-flex rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900">
                                        Hover
                                    </span>
                                </Tooltip.Trigger>
                                <Tooltip.Content>Tooltip content</Tooltip.Content>
                            </Tooltip.Root>
                        </div>
                    </Panel>

                    <Panel title="Drawer and disclosure">
                        <div className="grid gap-4">
                            <Drawer.Root>
                                <Drawer.Trigger>
                                    <span className="inline-flex rounded-md bg-gray-950 px-3 py-2 text-sm font-medium text-white">
                                        Open drawer
                                    </span>
                                </Drawer.Trigger>
                                <Drawer.Portal>
                                    <Drawer.Overlay />
                                    <Drawer.Content>
                                        <Drawer.Title>Command center</Drawer.Title>
                                        <Drawer.Description>Drawer content can host longer workflows.</Drawer.Description>
                                        <Drawer.Close>Close</Drawer.Close>
                                    </Drawer.Content>
                                </Drawer.Portal>
                            </Drawer.Root>
                            <Disclosure.Root>
                                <Disclosure.Item value="keyboard">
                                    <Disclosure.Trigger>Keyboard support</Disclosure.Trigger>
                                    <Disclosure.Content>Focus movement and state are owned by the component.</Disclosure.Content>
                                </Disclosure.Item>
                            </Disclosure.Root>
                            <Collapsible.Root defaultOpen>
                                <Collapsible.Trigger>Release checklist</Collapsible.Trigger>
                                <Collapsible.Content>
                                    <div className="rounded-lg bg-gray-100 p-3 text-sm">Tests, changesets, docs, and package artifact checks.</div>
                                </Collapsible.Content>
                            </Collapsible.Root>
                        </div>
                    </Panel>

                    <Panel title="Loading and status">
                        <div className="grid gap-4">
                            <Progress value={68} max={100} />
                            <div className="flex items-center gap-3"><Spinner /> Syncing package metadata</div>
                            <div className="grid gap-2">
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    </Panel>

                    <Panel title="Toast and live region">
                        <Toast.Provider position="bottom-right" limit={3}>
                            <div className="grid gap-4">
                                <ToastShelf />
                                <div className="flex flex-wrap items-center gap-3">
                                    <Button variant="outline" onClick={() => setLiveMessage(`Saved at ${new Date().toLocaleTimeString()}`)}>
                                        Update live region
                                    </Button>
                                    <span className="text-sm text-gray-700">{liveMessage}</span>
                                    <LiveRegion>{liveMessage}</LiveRegion>
                                </div>
                            </div>
                        </Toast.Provider>
                    </Panel>

                    <Panel title="Keyboard affordances">
                        <div className="flex flex-wrap items-center gap-2">
                            <Kbd>⌘</Kbd><Kbd>K</Kbd>
                            <Separator orientation="vertical" />
                            <Kbd>Tab</Kbd><Kbd>Enter</Kbd><Kbd>Esc</Kbd>
                        </div>
                    </Panel>
                </SectionGrid>
            </ColorLooper>

            <ColorLooper
                title="Variants and sizes"
                docsLink="/docs/components"
                description="Every supported visual variant and size is represented here so changes to the component API are easy to spot."
            >
                <SectionGrid>
                    <Panel title="Avatar and avatar group">
                        <div className="grid gap-5">
                            <div className="flex flex-wrap items-end gap-4">
                                {["", "sm", "lg"].map((size) => (
                                    <div key={size || "default"} className="grid justify-items-center gap-2">
                                        <Avatar.Root size={size} variant="circle" color="blue">
                                            <Avatar.Fallback>RU</Avatar.Fallback>
                                        </Avatar.Root>
                                        <span className="text-xs text-gray-600">{size || "default"}</span>
                                    </div>
                                ))}
                                <div className="grid justify-items-center gap-2">
                                    <Avatar.Root variant="square" color="green">
                                        <Avatar.Fallback>SQ</Avatar.Fallback>
                                    </Avatar.Root>
                                    <span className="text-xs text-gray-600">square</span>
                                </div>
                            </div>
                            <AvatarGroup.Root size="large" variant="circle">
                                <AvatarGroup.Item><AvatarGroup.Avatar src="/images/avatars/nina.jpg" alt="Nina" /><AvatarGroup.Fallback>NI</AvatarGroup.Fallback></AvatarGroup.Item>
                                <AvatarGroup.Item><AvatarGroup.Avatar src="/images/avatars/omar.jpg" alt="Omar" /><AvatarGroup.Fallback>OM</AvatarGroup.Fallback></AvatarGroup.Item>
                                <AvatarGroup.Item><AvatarGroup.Avatar src="/images/avatars/maya.jpg" alt="Maya" /><AvatarGroup.Fallback>MA</AvatarGroup.Fallback></AvatarGroup.Item>
                            </AvatarGroup.Root>
                        </div>
                    </Panel>

                    <Panel title="BlockQuote and Code">
                        <div className="grid gap-4">
                            {surfaceVariants.map((variant) => (
                                <BlockQuote key={variant} variant={variant} size="large" color="blue">
                                    {variant} quote with a large text scale.
                                </BlockQuote>
                            ))}
                            <div className="flex flex-wrap gap-3">
                                {surfaceVariants.map((variant) => (
                                    <Code key={variant} variant={variant} size="large" color="blue">
                                        {variant} code
                                    </Code>
                                ))}
                            </div>
                        </div>
                    </Panel>

                    <Panel title="Card sizes and variants">
                        <div className="grid gap-3 sm:grid-cols-2">
                            {surfaceVariants.map((variant) => sizes.map((size) => (
                                <Card key={`${variant}-${size}`} variant={variant} size={size}>
                                    <Card.Header><Card.Title>{variant}</Card.Title></Card.Header>
                                    <Card.Content><Card.Description>{size} card</Card.Description></Card.Content>
                                </Card>
                            )))}
                        </div>
                    </Panel>

                    <Panel title="DataList, Fieldset, Link, and TextArea">
                        <div className="grid gap-5">
                            <div className="grid gap-2 sm:grid-cols-3">
                                {["small", "medium", "large"].map((size) => (
                                    <DataList.Root key={size} size={size}>
                                        <DataList.Item>
                                            <DataList.Label>Size</DataList.Label>
                                            <DataList.Value>{size}</DataList.Value>
                                        </DataList.Item>
                                    </DataList.Root>
                                ))}
                            </div>
                            <Fieldset.Root size="large" variant="soft" color="blue" className="grid gap-2">
                                <Fieldset.Legend>Fieldset variants</Fieldset.Legend>
                                <Fieldset.Description>Large, soft, blue.</Fieldset.Description>
                            </Fieldset.Root>
                            <div className="flex flex-wrap items-center gap-4">
                                {sizes.map((size) => <Link key={size} size={size} href="/docs/components/link">{size} link</Link>)}
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {surfaceVariants.map((variant) => (
                                    <TextArea key={variant} variant={variant} size="large" color="blue" defaultValue={`${variant} textarea`} />
                                ))}
                            </div>
                        </div>
                    </Panel>
                </SectionGrid>
            </ColorLooper>
        </div>
    )
}

export default CompleteCoveragePlayground
