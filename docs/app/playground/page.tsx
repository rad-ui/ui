import AccordionPlayground from "./components/AccordionPlayground"
import AlertDialogPlayground from "./components/AlertDialogPlayground"
import AspectRatioPlayground from "./components/AspectRatioPlayground"
import AvatarPlayground from "./components/AvatarPlayground"
import AvatarGroupPlayground from "./components/AvatarGroupPlayground"
import BadgePlayground from "./components/BadgePlayground"
import BlockquotePlayground from "./components/BlockquotePlayground"
import BreadcrumbPlayground from "./components/BreadcrumbPlayground"
import ButtonPlayground from "./components/ButtonPlayground"
import CalloutPlayground from "./components/CalloutPlayground"
import CardPlayground from "./components/CardPlayground"
import CheckboxPlayground from "./components/CheckboxPlayground"
import CheckboxCardsPlayground from "./components/CheckboxCardsPlayground"
import CheckboxGroupPlayground from "./components/CheckboxGroupPlayground"
import CodePlayground from "./components/CodePlayground"
import CollapsiblePlayground from "./components/CollapsiblePlayground"
import ComboboxPlayground from "./components/ComboboxPlayground"
import CommandPlayground from "./components/CommandPlayground"
import ContextMenuPlayground from "./components/ContextMenuPlayground"
import DataListPlayground from "./components/DataListPlayground"
import DialogPlayground from "./components/DialogPlayground"
import DisclosurePlayground from "./components/DisclosurePlayground"
import DrawerPlayground from "./components/DrawerPlayground"
import DropdownMenuPlayground from "./components/DropdownMenuPlayground"
import EmPlayground from "./components/EmPlayground"
import FieldsetPlayground from "./components/FieldsetPlayground"
import HeadingPlayground from "./components/HeadingPlayground"
import HoverCardPlayground from "./components/HoverCardPlayground"
import KbdPlayground from "./components/KbdPlayground"
import LinkPlayground from "./components/LinkPlayground"
import LiveRegionPlayground from "./components/LiveRegionPlayground"
import MenubarPlayground from "./components/MenubarPlayground"
import MinimapPlayground from "./components/MinimapPlayground"
import NavigationMenuPlayground from "./components/NavigationMenuPlayground"
import NumberFieldPlayground from "./components/NumberFieldPlayground"
import PopoverPlayground from "./components/PopoverPlayground"
import ProgressPlayground from "./components/ProgressPlayground"
import QuotePlayground from "./components/QuotePlayground"
import RadioPlayground from "./components/RadioPlayground"
import RadioCardsPlayground from "./components/RadioCardsPlayground"
import RadioGroupPlayground from "./components/RadioGroupPlayground"
import ScrollAreaPlayground from "./components/ScrollAreaPlayground"
import SelectPlayground from "./components/SelectPlayground"
import SeparatorPlayground from "./components/SeparatorPlayground"
import SkeletonPlayground from "./components/SkeletonPlayground"
import SliderPlayground from "./components/SliderPlayground"
import SpinnerPlayground from "./components/SpinnerPlayground"
import SplitterPlayground from "./components/SplitterPlayground"
import StepsPlayground from "./components/StepsPlayground"
import StrongPlayground from "./components/StrongPlayground"
import SwitchPlayground from "./components/SwitchPlayground"
import TablePlayground from "./components/TablePlayground"
import TabNavPlayground from "./components/TabNavPlayground"
import TabsPlayground from "./components/TabsPlayground"
import TextPlayground from "./components/TextPlayground"
import TextAreaPlayground from "./components/TextAreaPlayground"
import TextFieldPlayground from "./components/TextFieldPlayground"
import ToastPlayground from "./components/ToastPlayground"
import TogglePlayground from "./components/TogglePlayground"
import ToggleGroupPlayground from "./components/ToggleGroupPlayground"
import ToolbarPlayground from "./components/ToolbarPlayground"
import TooltipPlayground from "./components/TooltipPlayground"
import TreePlayground from "./components/TreePlayground"
import VisuallyHiddenPlayground from "./components/VisuallyHiddenPlayground"
import PlaygroundShell from "./helpers/PlaygroundShell"
import FullHeightScroll from '@/components/layout/ScrollContainers/FullHeightScroll'

// One entry per component, alphabetical. Drives both the sidebar index and the sections.
const sections = [
    { title: "Accordion", Component: AccordionPlayground },
    { title: "AlertDialog", Component: AlertDialogPlayground },
    { title: "AspectRatio", Component: AspectRatioPlayground },
    { title: "Avatar", Component: AvatarPlayground },
    { title: "AvatarGroup", Component: AvatarGroupPlayground },
    { title: "Badge", Component: BadgePlayground },
    { title: "BlockQuote", Component: BlockquotePlayground },
    { title: "Breadcrumb", Component: BreadcrumbPlayground },
    { title: "Button", Component: ButtonPlayground },
    { title: "Callout", Component: CalloutPlayground },
    { title: "Card", Component: CardPlayground },
    { title: "Checkbox", Component: CheckboxPlayground },
    { title: "CheckboxCards", Component: CheckboxCardsPlayground },
    { title: "CheckboxGroup", Component: CheckboxGroupPlayground },
    { title: "Code", Component: CodePlayground },
    { title: "Collapsible", Component: CollapsiblePlayground },
    { title: "Combobox", Component: ComboboxPlayground },
    { title: "Command", Component: CommandPlayground },
    { title: "ContextMenu", Component: ContextMenuPlayground },
    { title: "DataList", Component: DataListPlayground },
    { title: "Dialog", Component: DialogPlayground },
    { title: "Disclosure", Component: DisclosurePlayground },
    { title: "Drawer", Component: DrawerPlayground },
    { title: "DropdownMenu", Component: DropdownMenuPlayground },
    { title: "Em", Component: EmPlayground },
    { title: "Fieldset", Component: FieldsetPlayground },
    { title: "Heading", Component: HeadingPlayground },
    { title: "HoverCard", Component: HoverCardPlayground },
    { title: "Kbd", Component: KbdPlayground },
    { title: "Link", Component: LinkPlayground },
    { title: "LiveRegion", Component: LiveRegionPlayground },
    { title: "Menubar", Component: MenubarPlayground },
    { title: "Minimap", Component: MinimapPlayground },
    { title: "NavigationMenu", Component: NavigationMenuPlayground },
    { title: "NumberField", Component: NumberFieldPlayground },
    { title: "Popover", Component: PopoverPlayground },
    { title: "Progress", Component: ProgressPlayground },
    { title: "Quote", Component: QuotePlayground },
    { title: "Radio", Component: RadioPlayground },
    { title: "RadioCards", Component: RadioCardsPlayground },
    { title: "RadioGroup", Component: RadioGroupPlayground },
    { title: "ScrollArea", Component: ScrollAreaPlayground },
    { title: "Select", Component: SelectPlayground },
    { title: "Separator", Component: SeparatorPlayground },
    { title: "Skeleton", Component: SkeletonPlayground },
    { title: "Slider", Component: SliderPlayground },
    { title: "Spinner", Component: SpinnerPlayground },
    { title: "Splitter", Component: SplitterPlayground },
    { title: "Steps", Component: StepsPlayground },
    { title: "Strong", Component: StrongPlayground },
    { title: "Switch", Component: SwitchPlayground },
    { title: "Table", Component: TablePlayground },
    { title: "TabNav", Component: TabNavPlayground },
    { title: "Tabs", Component: TabsPlayground },
    { title: "Text", Component: TextPlayground },
    { title: "TextArea", Component: TextAreaPlayground },
    { title: "TextField", Component: TextFieldPlayground },
    { title: "Toast", Component: ToastPlayground },
    { title: "Toggle", Component: TogglePlayground },
    { title: "ToggleGroup", Component: ToggleGroupPlayground },
    { title: "Toolbar", Component: ToolbarPlayground },
    { title: "Tooltip", Component: TooltipPlayground },
    { title: "Tree", Component: TreePlayground },
    { title: "VisuallyHidden", Component: VisuallyHiddenPlayground }
]

const Playground = () => {
    return (
        <FullHeightScroll>
            <PlaygroundShell sections={sections.map((section) => section.title)}>
                {sections.map(({ title, Component }) => (
                    <Component key={title} />
                ))}
            </PlaygroundShell>
        </FullHeightScroll>
    )
}

export default Playground
