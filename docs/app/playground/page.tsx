import AccordionPlayground from "./components/AccordionPlayground"
import AlertDialogPlayground from "./components/AlertDialogPlayground"
import AspectRatioPlayground from "./components/AspectRatioPlayground"
import AvatarPlayground from "./components/AvatarPlayground"
import AvatarGroupPlayground from "./components/AvatarGroupPlayground"
import BadgePlayground from "./components/BadgePlayground"
import BlockquotePlayground from "./components/BlockquotePlayground"
import ButtonPlayground from "./components/ButtonPlayground"
import CalloutPlayground from "./components/CalloutPlayground"
import CardPlayground from "./components/CardPlayground"
import CodePlayground from "./components/CodePlayground"
import DialogPlayground from "./components/DialogPlayground"
import EmPlayground from "./components/EmPlayground"
import HeadingPlayground from "./components/HeadingPlayground"
import KbdPlayground from "./components/KbdPlayground"
import LinkPlayground from "./components/LinkPlayground"
import ProgressPlayground from "./components/ProgressPlayground"
import SeparatorPlayground from "./components/SeparatorPlayground"
import StrongPlayground from "./components/StrongPlayground"
import SwitchPlayground from "./components/SwitchPlayground"
import TablePlayground from "./components/TablePlayground"
import TabsPlayground from "./components/TabsPlayground"
import TextPlayground from "./components/TextPlayground"
import TogglePlayground from "./components/TogglePlayground"
import ToggleGroupPlayground from "./components/ToggleGroupPlayground"
import TooltipPlayground from "./components/TooltipPlayground"
import VisuallyHiddenPlayground from "./components/VisuallyHiddenPlayground"
import FullHeightScroll from '@/components/layout/ScrollContainers/FullHeightScroll'
import Badge from "@radui/ui/Badge"
import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"

const Playground = () => {
    return (
        <FullHeightScroll>
            <div className='min-h-full bg-gray-50 text-gray-900'>
                <div className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 md:px-8'>
                    <section className='rounded-3xl bg-gray-50 p-8 shadow-sm'>
                        <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
                            <div className='max-w-3xl space-y-3'>
                                <Badge variant="soft">Interactive Playground</Badge>
                                <Heading className="text-gray-950">
                                    Playground coverage for the full documented component set
                                </Heading>
                                <Text className="text-gray-800">
                                    Each section uses the current public API, keeps the layout neutral, and links back to the corresponding documentation page where one exists.
                                </Text>
                            </div>
                            <div className='grid gap-2 text-sm text-gray-700 md:max-w-xs'>
                                <span>Coverage: all documented components in the docs app</span>
                                <span>Focus: valid default states with Tailwind-only layout styling</span>
                            </div>
                        </div>
                    </section>

                    <div className='grid gap-6'>
                        <AccordionPlayground />
                        <AlertDialogPlayground />
                        <AspectRatioPlayground />
                        <AvatarPlayground />
                        <AvatarGroupPlayground />
                        <BadgePlayground />
                        <BlockquotePlayground />
                        <ButtonPlayground />
                        <CalloutPlayground />
                        <CardPlayground />
                        <CodePlayground />
                        <DialogPlayground />
                        <EmPlayground />
                        <HeadingPlayground />
                        <KbdPlayground />
                        <SeparatorPlayground />
                        <ProgressPlayground />
                        <StrongPlayground />
                        <SwitchPlayground />
                        <TablePlayground />
                        <TabsPlayground />
                        <LinkPlayground />
                        <TextPlayground />
                        <TogglePlayground />
                        <ToggleGroupPlayground />
                        <TooltipPlayground />
                        <VisuallyHiddenPlayground />
                    </div>
                </div>
            </div>
        </FullHeightScroll>
    )
}

export default Playground
