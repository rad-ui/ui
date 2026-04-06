import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"

import FullHeightScroll from '@/components/layout/ScrollContainers/FullHeightScroll'


const ShowCase = ({children}) => {
    return <FullHeightScroll>
        <div className='min-h-full bg-zinc-950 px-4 py-6 text-white sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-[1480px]'>
                <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
                    <div>
                        <Text className='mb-2 uppercase tracking-[0.35em] !text-[11px] text-white/45'>
                            Showcase
                        </Text>
                        <Heading as="h3" className='!text-white'>
                            Music App
                        </Heading>
                        <Text className='mt-2 max-w-2xl text-white/60'>
                            A more cinematic demo surface for the component library, rebuilt around atmosphere,
                            depth, and stronger content hierarchy.
                        </Text>
                    </div>
                    <div className='flex items-center gap-3 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm sm:self-auto'>
                        <span className='h-2.5 w-2.5 rounded-full bg-orange-500' />
                        <Text className='!text-sm text-white/70'>
                            Live concept
                        </Text>
                    </div>
                </div>
                <div className='relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-stone-950 via-zinc-900 to-stone-900 shadow-2xl'>
                    <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/15 via-transparent to-amber-300/10' />
                    <div className='pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/5 to-transparent' />
                    <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10' />
                    <div className='relative'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </FullHeightScroll>
}

export default ShowCase
