'use client'

import React from "react"
import { ChevronRight, Home, Inbox, Menu, Search, Settings, SlidersHorizontal, X } from "lucide-react"
import Breadcrumb from "@radui/ui/Breadcrumb"
import Button from "@radui/ui/Button"
import Checkbox from "@radui/ui/Checkbox"
import CheckboxCards from "@radui/ui/CheckboxCards"
import CheckboxGroup from "@radui/ui/CheckboxGroup"
import Collapsible from "@radui/ui/Collapsible"
import Combobox from "@radui/ui/Combobox"
import Command from "@radui/ui/Command"
import ContextMenu from "@radui/ui/ContextMenu"
import DataList from "@radui/ui/DataList"
import Disclosure from "@radui/ui/Disclosure"
import Drawer from "@radui/ui/Drawer"
import DropdownMenu from "@radui/ui/DropdownMenu"
import Fieldset from "@radui/ui/Fieldset"
import Heading from "@radui/ui/Heading"
import HoverCard from "@radui/ui/HoverCard"
import Link from "@radui/ui/Link"
import LiveRegion from "@radui/ui/LiveRegion"
import Menubar from "@radui/ui/Menubar"
import Minimap from "@radui/ui/Minimap"
import NavigationMenu from "@radui/ui/NavigationMenu"
import NumberField from "@radui/ui/NumberField"
import Popover from "@radui/ui/Popover"
import Radio from "@radui/ui/Radio"
import RadioCards from "@radui/ui/RadioCards"
import RadioGroup from "@radui/ui/RadioGroup"
import ScrollArea from "@radui/ui/ScrollArea"
import Select from "@radui/ui/Select"
import Skeleton from "@radui/ui/Skeleton"
import Slider from "@radui/ui/Slider"
import Spinner from "@radui/ui/Spinner"
import Splitter from "@radui/ui/Splitter"
import Steps from "@radui/ui/Steps"
import TabNav from "@radui/ui/TabNav"
import Text from "@radui/ui/Text"
import TextArea from "@radui/ui/TextArea"
import TextField from "@radui/ui/TextField"
import Theme from "@radui/ui/Theme"
import Toast from "@radui/ui/Toast"
import Toolbar from "@radui/ui/Toolbar"
import Tree from "@radui/ui/Tree"
import ColorLooper from "../helpers/ColorLooper"

const sizes = ["small", "medium", "large"]
const colors = ["gray", "blue", "green", "red", "plum", "gold"]
const Section = ({ name, description, children }) => <ColorLooper title={name} docsLink={`/docs/components/${name.toLowerCase().replaceAll(" ", "-")}`} description={description}>{children}</ColorLooper>
const Grid = ({ children, two = false }) => <div className={two ? "grid gap-5 md:grid-cols-2" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"}>{children}</div>
const Row = ({ children }) => <div className="flex flex-wrap items-center gap-3">{children}</div>
const Sample = ({ label, children }) => <div className="min-w-0 border-t border-gray-200 pt-3"><Text className="mb-4 block text-xs font-semibold uppercase text-gray-600">{label}</Text>{children}</div>
const CommandRow = ({ icon, children }) => <span className="rad-ui-command-item-main">{icon}<span className="rad-ui-command-item-label">{children}</span></span>

const treeItems = [
    { label: "Components", expanded: true, items: [{ label: "Inputs" }, { label: "Overlays" }] },
    { label: "Tokens", expanded: false, items: [{ label: "Colors" }, { label: "Spacing" }] }
]

const ToastShelf = () => {
    const manager = Toast.useToastManager()
    return <><Toast.Portal><Toast.Viewport>{manager.toasts.map((toast) => <Toast.Root key={toast.id} toast={toast}><Toast.Content><Toast.Title>{toast.title}</Toast.Title><Toast.Close /></Toast.Content></Toast.Root>)}</Toast.Viewport></Toast.Portal><Row><Button onClick={() => manager.add({ title: "Saved changes", variant: "success" })}>Success</Button><Button variant="outline" onClick={() => manager.add({ title: "Build failed", variant: "error" })}>Error</Button><Button variant="soft" onClick={() => manager.add({ title: "Sync queued", variant: "info" })}>Info</Button></Row></>
}

const CompleteCoveragePlayground = () => {
    const [cards, setCards] = React.useState(["security"])
    const [checks, setChecks] = React.useState(["email"])
    const [range, setRange] = React.useState([24, 72])
    const [number, setNumber] = React.useState(3)
    const [message, setMessage] = React.useState("Ready")
    const [contextAction, setContextAction] = React.useState("No action selected")

    return <div>
        <Section name="Theme" description="Appearance, accent color, radius, and scaling tokens."><Grid>{[["Light / blue", { appearance: "light", accentColor: "blue", radius: "sm", scaling: "90%" }], ["Dark / green", { appearance: "dark", accentColor: "green", radius: "lg", scaling: "100%" }], ["System / red", { appearance: "system", accentColor: "red", radius: "md", scaling: "110%" }]].map(([label, props]) => <Theme key={label} {...props} className="border border-gray-300 p-5"><Text className="mb-3 block">{label}</Text><Button>Theme button</Button></Theme>)}</Grid></Section>

        <Section name="Checkbox" description="Checked, unchecked, indeterminate, disabled, color, and size states."><Grid>{sizes.map((size) => <Sample key={size} label={size}><Row><Checkbox.Root defaultChecked size={size}><Checkbox.Indicator /></Checkbox.Root><Checkbox.Root size={size}><Checkbox.Indicator /></Checkbox.Root><Checkbox.Root checked="indeterminate" size={size}><Checkbox.Indicator /></Checkbox.Root><Checkbox.Root defaultChecked disabled size={size}><Checkbox.Indicator /></Checkbox.Root></Row></Sample>)}</Grid><Row>{colors.map((color) => <Checkbox.Root key={color} color={color} defaultChecked aria-label={color}><Checkbox.Indicator /></Checkbox.Root>)}</Row></Section>

        <Section name="Checkbox Cards" description="Selectable cards in selected, unselected, and disabled states."><CheckboxCards.Root value={cards} onValueChange={setCards} name="preferences">{[["security", "Security alerts"], ["product", "Product updates"], ["billing", "Billing notices"]].map(([value, label]) => <CheckboxCards.Item key={value} value={value} disabled={value === "billing"}><CheckboxCards.Content><CheckboxCards.Indicator /></CheckboxCards.Content><div><strong>{label}</strong><div className="text-sm text-gray-600">Notification preference</div></div></CheckboxCards.Item>)}</CheckboxCards.Root></Section>

        <Section name="Checkbox Group" description="A keyboard-accessible group of related choices."><CheckboxGroup.Root value={checks} onValueChange={setChecks} aria-label="Channels">{["email", "sms", "push"].map((value) => <CheckboxGroup.Label key={value}><CheckboxGroup.Trigger value={value}><CheckboxGroup.Indicator /></CheckboxGroup.Trigger>{value}</CheckboxGroup.Label>)}</CheckboxGroup.Root></Section>

        <Section name="Radio" description="Outline and solid radios across every size and disabled state."><Grid two>{["outline", "solid"].map((variant) => <Sample key={variant} label={variant}><Row>{sizes.map((size) => <Radio key={size} name={`radio-${variant}`} value={size} variant={variant} size={size} />)}<Radio name={`radio-${variant}`} value="disabled" disabled /></Row></Sample>)}</Grid></Section>

        <Section name="Radio Group" description="Single selection with roving keyboard focus."><RadioGroup.Root defaultValue="comfortable" aria-label="Density">{["compact", "comfortable", "spacious"].map((value) => <RadioGroup.Label key={value}><RadioGroup.Item value={value}><RadioGroup.Indicator /></RadioGroup.Item>{value}</RadioGroup.Label>)}</RadioGroup.Root></Section>

        <Section name="Radio Cards" description="Card-shaped single selection for plans and settings."><RadioCards.Root defaultValue="pro" aria-label="Plan">{[["starter", "Starter"], ["pro", "Pro"], ["enterprise", "Enterprise"]].map(([value, label]) => <RadioCards.Item key={value} value={value}><div className="rad-ui-radio-cards-title">{label}</div><div className="rad-ui-radio-cards-description">Choose this plan</div></RadioCards.Item>)}</RadioCards.Root></Section>

        <Section name="Text Field" description="Slots, reset controls, sizes, read-only, and disabled states."><Grid two>{sizes.map((size) => <Sample key={size} label={size}><TextField.Root size={size}><TextField.Slot side="start"><Search size={16} /></TextField.Slot><TextField.Input placeholder="Search docs" /><TextField.Reset aria-label="Clear"><X size={14} /></TextField.Reset></TextField.Root></Sample>)}<TextField.Root><TextField.Input defaultValue="Read only" readOnly /></TextField.Root><TextField.Root><TextField.Input placeholder="Disabled" disabled /></TextField.Root></Grid></Section>

        <Section name="Text Area" description="Visual variants, sizes, and disabled/read-only states."><Grid two>{["soft", "outline", "solid", "ghost"].map((variant) => <TextArea key={variant} variant={variant} defaultValue={`${variant} text area`} />)}{sizes.map((size) => <TextArea key={size} size={size} placeholder={`${size} text area`} />)}<TextArea defaultValue="Read only" readOnly /><TextArea placeholder="Disabled" disabled /></Grid></Section>

        <Section name="Select" description="Grouped options, size variants, and disabled items."><Row>{sizes.map((size) => <Select.Root key={size} defaultValue="react"><Select.Trigger size={size}>Framework</Select.Trigger><Select.Portal><Select.Content><Select.Group>{["react", "vue", "svelte"].map((value) => <Select.Item key={value} value={value}><Select.Indicator />{value}</Select.Item>)}<Select.Item value="disabled" disabled>Disabled</Select.Item></Select.Group></Select.Content></Select.Portal></Select.Root>)}</Row></Section>

        <Section name="Combobox" description="A searchable option picker."><Combobox.Root><Combobox.Trigger>Choose component</Combobox.Trigger><Combobox.Content><Combobox.Search placeholder="Search components..." />{["Button", "Dialog", "ScrollArea", "Toolbar"].map((value) => <Combobox.Item key={value} value={value}>{value}</Combobox.Item>)}</Combobox.Content></Combobox.Root></Section>

        <Section name="Command" description="Filterable groups, empty state, and keyboard selection."><Command style={{ width: "100%", maxWidth: 620 }}><Command.Input placeholder="Type a command..." /><Command.List><Command.Empty>No results found.</Command.Empty><Command.Group heading="Navigation"><Command.Item value="home"><CommandRow icon={<Home />}>Home</CommandRow></Command.Item><Command.Item value="inbox"><CommandRow icon={<Inbox />}>Inbox</CommandRow></Command.Item><Command.Item value="settings"><CommandRow icon={<Settings />}>Settings</CommandRow></Command.Item></Command.Group></Command.List></Command></Section>

        <Section name="Number Field" description="Increment, decrement, bounds, and disabled state."><Row><NumberField.Root value={number} onValueChange={setNumber} min={0} max={10}><NumberField.Decrement>-</NumberField.Decrement><NumberField.Input /><NumberField.Increment>+</NumberField.Increment></NumberField.Root><NumberField.Root defaultValue={5} disabled><NumberField.Decrement>-</NumberField.Decrement><NumberField.Input /><NumberField.Increment>+</NumberField.Increment></NumberField.Root></Row></Section>

        <Section name="Slider" description="Single-value, range, and disabled sliders."><div className="grid max-w-2xl gap-8"><Slider aria-label="Range" value={range} onValueChange={setRange} /><Slider aria-label="Single" defaultValue={64} /><Slider aria-label="Disabled" defaultValue={35} disabled /></div></Section>

        <Section name="Fieldset" description="Legend, description, message, sizes, and surface variants."><Grid two>{["soft", "outline"].map((variant) => sizes.map((size) => <Fieldset.Root key={`${variant}-${size}`} variant={variant} size={size}><Fieldset.Legend>{variant} {size}</Fieldset.Legend><Fieldset.Description>Profile details</Fieldset.Description><Fieldset.Message>Field message</Fieldset.Message></Fieldset.Root>))}</Grid></Section>

        <Section name="Breadcrumb" description="Linked hierarchy with separators and a current page."><Breadcrumb.Root><Breadcrumb.List><Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link><Breadcrumb.Separator /></Breadcrumb.Item><Breadcrumb.Item><Breadcrumb.Link href="/docs">Docs</Breadcrumb.Link><Breadcrumb.Separator /></Breadcrumb.Item><Breadcrumb.Item><Breadcrumb.Page>Playground</Breadcrumb.Page></Breadcrumb.Item></Breadcrumb.List></Breadcrumb.Root></Section>

        <Section name="Navigation Menu" description="Top-level links and disclosure content."><NavigationMenu.Root><NavigationMenu.Item value="components"><NavigationMenu.Trigger>Components</NavigationMenu.Trigger><NavigationMenu.Content><NavigationMenu.Link href="/docs/components/button">Button</NavigationMenu.Link><NavigationMenu.Link href="/docs/components/dialog">Dialog</NavigationMenu.Link></NavigationMenu.Content></NavigationMenu.Item><NavigationMenu.Item value="colors"><NavigationMenu.Link href="/colors">Colors</NavigationMenu.Link></NavigationMenu.Item></NavigationMenu.Root></Section>

        <Section name="Dropdown Menu" description="Items, disabled actions, separators, and nested menus."><DropdownMenu.Root><DropdownMenu.Trigger><Menu size={18} /></DropdownMenu.Trigger><DropdownMenu.Content><DropdownMenu.Item label="Profile">Profile</DropdownMenu.Item><DropdownMenu.Item label="Disabled" disabled>Disabled</DropdownMenu.Item><DropdownMenu.Separator /><DropdownMenu.Sub><DropdownMenu.SubTrigger>More <ChevronRight size={14} /></DropdownMenu.SubTrigger><DropdownMenu.Content><DropdownMenu.Item label="Help">Help</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Sub></DropdownMenu.Content></DropdownMenu.Root></Section>

        <Section name="Menubar" description="Desktop-style menus with scoped arrow-key navigation."><Menubar.Root><Menubar.Menu><Menubar.Trigger>File</Menubar.Trigger><Menubar.Content><Menubar.Item label="New">New</Menubar.Item><Menubar.Item label="Open">Open</Menubar.Item></Menubar.Content></Menubar.Menu><Menubar.Menu><Menubar.Trigger>Edit</Menubar.Trigger><Menubar.Content><Menubar.Item label="Undo">Undo</Menubar.Item><Menubar.Item label="Redo">Redo</Menubar.Item></Menubar.Content></Menubar.Menu></Menubar.Root></Section>

        <Section name="Context Menu" description="Contextual actions opened from a right-click target."><div className="grid max-w-lg gap-3"><ContextMenu.Root><ContextMenu.Trigger><div className="border border-dashed border-gray-400 px-5 py-8 text-center text-sm">Right click this area</div></ContextMenu.Trigger><ContextMenu.Content><ContextMenu.Item label="Copy" onClick={() => setContextAction("Copied")}>Copy</ContextMenu.Item><ContextMenu.Item label="Paste" onClick={() => setContextAction("Pasted")}>Paste</ContextMenu.Item><ContextMenu.Item label="Delete" onClick={() => setContextAction("Deleted")}>Delete</ContextMenu.Item></ContextMenu.Content></ContextMenu.Root><Text aria-live="polite">{contextAction}</Text></div></Section>

        <Section name="Tab Nav" description="Route-like navigation with an active value."><TabNav.Root defaultValue="overview"><TabNav.Link value="overview" href="#overview">Overview</TabNav.Link><TabNav.Link value="usage" href="#usage">Usage</TabNav.Link><TabNav.Link value="api" href="#api">API</TabNav.Link></TabNav.Root></Section>

        <Section name="Toolbar" description="Buttons, toggles, separators, and links."><Toolbar.Root aria-label="Editor toolbar"><Toolbar.Button aria-label="Bold">B</Toolbar.Button><Toolbar.Button aria-label="Italic">I</Toolbar.Button><Toolbar.Separator /><Toolbar.ToggleGroup type="single"><Toolbar.ToggleItem value="left">L</Toolbar.ToggleItem><Toolbar.ToggleItem value="center">C</Toolbar.ToggleItem><Toolbar.ToggleItem value="right">R</Toolbar.ToggleItem></Toolbar.ToggleGroup><Toolbar.Link href="/docs/components/toolbar">Docs</Toolbar.Link></Toolbar.Root></Section>

        <Section name="Data List" description="Label/value data at every supported density."><Grid>{sizes.map((size) => <DataList.Root key={size} size={size}><DataList.Item><DataList.Label>Status</DataList.Label><DataList.Value>Live</DataList.Value></DataList.Item><DataList.Item><DataList.Label>Size</DataList.Label><DataList.Value>{size}</DataList.Value></DataList.Item></DataList.Root>)}</Grid></Section>

        <Section name="Tree" description="Expandable hierarchical data."><div className="max-w-md"><Tree.Root aria-label="Component groups">{treeItems.map((item) => <Tree.Item key={item.label} item={item}>{item.label}</Tree.Item>)}</Tree.Root></div></Section>

        <Section name="Steps" description="Sequential progress with tracks and content."><Steps.Root>{["Install", "Style", "Ship"].map((step, index) => <Steps.Item key={step} value={String(index)}><Steps.Track><Steps.Bubble>{index + 1}</Steps.Bubble><Steps.Line /></Steps.Track><Steps.Content><Text>{step}</Text></Steps.Content></Steps.Item>)}</Steps.Root></Section>

        <Section name="Minimap" description="Compact progress paired with matching step values."><Minimap.Provider><Minimap.Root>{["Install", "Style", "Ship"].map((step, index) => <Minimap.Item key={step} value={String(index)}><Minimap.Track><Minimap.Bubble>{index + 1}</Minimap.Bubble><Minimap.Line /></Minimap.Track><Minimap.Content><Text>{step}</Text></Minimap.Content></Minimap.Item>)}</Minimap.Root></Minimap.Provider></Section>

        <Section name="Scroll Area" description="Custom scrollbars without page scroll restoration."><div className="h-52 max-w-2xl border border-gray-300"><ScrollArea.Root type="always"><ScrollArea.Viewport><div className="grid w-[760px] gap-2 p-4">{Array.from({ length: 12 }).map((_, index) => <div key={index} className="bg-gray-100 p-2 text-sm">Scrollable row {index + 1}</div>)}</div></ScrollArea.Viewport><ScrollArea.Scrollbar orientation="vertical"><ScrollArea.Thumb /></ScrollArea.Scrollbar><ScrollArea.Scrollbar orientation="horizontal"><ScrollArea.Thumb /></ScrollArea.Scrollbar></ScrollArea.Root></div></Section>

        <Section name="Splitter" description="Resizable adjacent panels with an accessible handle."><div className="h-52 max-w-3xl overflow-hidden border border-gray-300"><Splitter.Root defaultSizes={[35, 65]}><Splitter.Panel index={0}><div className="h-full bg-gray-100 p-4">List</div></Splitter.Panel><Splitter.Handle index={0} /><Splitter.Panel index={1}><div className="h-full p-4">Preview</div></Splitter.Panel></Splitter.Root></div></Section>

        <Section name="Popover" description="Anchored non-modal content with close and arrow parts."><Popover.Root><Popover.Trigger asChild><Button variant="soft"><SlidersHorizontal size={16} /> Settings</Button></Popover.Trigger><Popover.Portal><Popover.Content align="start" collisionPadding={12} sideOffset={10}><div className="grid w-72 gap-4 pr-8"><div><Heading as="h3" className="text-lg">Dimensions</Heading><Text className="mt-1 text-sm text-gray-500">Set the maximum width for this surface.</Text></div><label className="grid gap-2 text-sm font-medium" htmlFor="playground-popover-width">Max width<TextField.Root><TextField.Input id="playground-popover-width" defaultValue="320px" /></TextField.Root></label><Popover.Close aria-label="Close"><X size={16} /></Popover.Close></div><Popover.Arrow /></Popover.Content></Popover.Portal></Popover.Root></Section>

        <Section name="Hover Card" description="Rich preview content shown after a hover delay."><HoverCard.Root openDelay={100}><HoverCard.Trigger><Link href="#hover-card">@radui</Link></HoverCard.Trigger><HoverCard.Content><div className="w-64"><Text className="font-semibold">Rad UI</Text><Text>Accessible React components for product interfaces.</Text></div></HoverCard.Content></HoverCard.Root></Section>

        <Section name="Drawer" description="A portal-based overlay for longer workflows."><Drawer.Root><Drawer.Trigger>Open drawer</Drawer.Trigger><Drawer.Portal><Drawer.Overlay /><Drawer.Content><Drawer.Title>Command center</Drawer.Title><Drawer.Description>Drawer content can host longer workflows.</Drawer.Description><Drawer.Close>Close</Drawer.Close></Drawer.Content></Drawer.Portal></Drawer.Root></Section>

        <Section name="Disclosure" description="A trigger and content pair for optional information."><Disclosure.Root><Disclosure.Item value="keyboard"><Disclosure.Trigger>Keyboard support</Disclosure.Trigger><Disclosure.Content>Focus movement and state are owned by the component.</Disclosure.Content></Disclosure.Item></Disclosure.Root></Section>

        <Section name="Collapsible" description="A single expandable region."><Collapsible.Root defaultOpen><Collapsible.Trigger>Release checklist</Collapsible.Trigger><Collapsible.Content><div className="mt-3 bg-gray-100 p-4 text-sm">Tests, docs, package checks, and visual verification.</div></Collapsible.Content></Collapsible.Root></Section>

        <Section name="Spinner" description="Inline loading indicators in content and buttons."><Row><Spinner /><Text>Syncing package metadata</Text><Button disabled><Spinner /> Saving</Button></Row></Section>
        <Section name="Skeleton" description="Loading placeholders for text and media layouts."><div className="grid max-w-xl gap-3"><Skeleton className="h-5 w-2/3" /><Skeleton className="h-24 w-full" /><Skeleton className="h-5 w-1/2" /></div></Section>
        <Section name="Toast" description="Success, error, and informational notifications."><Toast.Provider position="bottom-right" limit={3}><ToastShelf /></Toast.Provider></Section>
        <Section name="Live Region" description="Polite announcements for asynchronous status changes."><Row><Button variant="outline" onClick={() => setMessage(`Saved at ${new Date().toLocaleTimeString()}`)}>Update status</Button><Text>{message}</Text><LiveRegion>{message}</LiveRegion></Row></Section>
    </div>
}

export default CompleteCoveragePlayground
