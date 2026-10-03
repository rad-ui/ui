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
import QuotePlayground from "./components/QuotePlayground"
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
import CompleteCoveragePlayground from "./components/CompleteCoveragePlayground"
import FullHeightScroll from '@/components/layout/ScrollContainers/FullHeightScroll'
import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"

const Playground = () => {
    return (
        <FullHeightScroll>
            <div className='playground-static min-h-full bg-gray-50 text-gray-900'>
                <div className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 md:px-8'>
                    <header className='max-w-3xl py-4'>
                        <div className='space-y-3'>
                            <Heading className="text-gray-950" size="x-large">
                                Playground
                            </Heading>
                            <Text className="text-gray-800">
                                Inspect every component, supported variant, size, state, and interaction in one place.
                            </Text>
                        </div>
                    </header>

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
                        <QuotePlayground />
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
                        <CompleteCoveragePlayground />
                    </div>
                </div>
            </div>
        </FullHeightScroll>
    )
}

export default Playground
