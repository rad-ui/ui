import AvatarPlayground from "./components/AvatarPlayground"
import BadgePlayground from "./components/BadgePlayground"
import BlockquotePlayground from "./components/BlockquotePlayground"
import ButtonPlayground from "./components/ButtonPlayground"
import CodePlayground from "./components/CodePlayground"
import EmPlayground from "./components/EmPlayground"
import HeadingPlayground from "./components/HeadingPlayground"
import LinkPlayground from "./components/LinkPlayground"
import SeparatorPlayground from "./components/SeparatorPlayground"
import TextPlayground from "./components/TextPlayground"
import FullHeightScroll from '@/components/layout/ScrollContainers/FullHeightScroll'
import Badge from "@radui/ui/Badge"
import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"

const Playground = () => {
    return (
        <FullHeightScroll>
            <div className='min-h-full bg-gray-50 text-gray-900'>
                <div className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 md:px-8'>
                    <section className='rounded-3xl border border-gray-300 bg-white p-8 shadow-sm'>
                        <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
                            <div className='max-w-3xl space-y-3'>
                                <Badge variant="soft">Interactive Playground</Badge>
                                <Heading className="text-gray-950">
                                    Stable demos for the components that are already shipping
                                </Heading>
                                <Text className="text-gray-800">
                                    This page now uses supported props, real docs targets, and a cleaner layout so you can verify behavior quickly instead of debugging the demo itself.
                                </Text>
                            </div>
                            <div className='grid gap-2 text-sm text-gray-700 md:max-w-xs'>
                                <span>Coverage: avatar, badge, button, typography, separator</span>
                                <span>Focus: default component states with Tailwind-only layout styling</span>
                            </div>
                        </div>
                    </section>

                    <div className='grid gap-6'>
                        <AvatarPlayground />
                        <BadgePlayground />
                        <ButtonPlayground />
                        <BlockquotePlayground />
                        <CodePlayground />
                        <HeadingPlayground />
                        <EmPlayground />
                        <SeparatorPlayground />
                        <LinkPlayground />
                        <TextPlayground />
                    </div>
                </div>
            </div>
        </FullHeightScroll>
    )
}

export default Playground
