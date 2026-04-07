import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"

import FullHeightScroll from '@/components/layout/ScrollContainers/FullHeightScroll'
import ShowcaseTabs from "./helpers/ShowcaseTabs"


const ShowCase = ({children}) => {
    return <FullHeightScroll>
        <div className='min-h-full px-3 py-3 text-slate-1000 sm:px-4 lg:px-5'>
            <div className='mx-auto max-w-[1480px]'>
                <div className='mb-3 flex flex-col gap-2.5 sm:flex-row sm:items-end sm:justify-between'>
                    <div>
                        <Text className='mb-2 uppercase tracking-[0.35em] !text-[11px] text-slate-1000/45'>
                            Showcase
                        </Text>
                        <Heading as="h4" className='!text-slate-1000'>
                            Demo Gallery
                        </Heading>
                        <Text className='mt-1 max-w-2xl !text-base text-slate-1000/60'>
                            Switch between multi-surface demos to preview how Rad UI can handle very different
                            product shapes with the same component foundation.
                        </Text>
                    </div>
                    <div className='flex items-center gap-2 self-start rounded-full border border-slate-400 bg-slate-100 px-2.5 py-1 backdrop-blur-sm sm:self-auto'>
                        <span className='h-2.5 w-2.5 rounded-full bg-orange-500' />
                        <Text className='!text-xs text-slate-1000/70'>
                            Live demos
                        </Text>
                    </div>
                </div>
                <div className='mb-3'>
                    <ShowcaseTabs />
                </div>
                <div className='relative overflow-hidden rounded-[32px] border border-slate-500 bg-gradient-to-br from-slate-50 via-mauve-50 to-slate-100'>
                    <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/8 via-transparent to-amber-300/8' />
                    <div className='pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-1000/5 to-transparent' />
                    <div className='pointer-events-none absolute -left-16 top-24 h-72 w-72 rounded-full bg-orange-500/8 blur-3xl' />
                    <div className='pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-amber-300/5 blur-3xl' />
                    <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-slate-1000/10' />
                    <div className='relative'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </FullHeightScroll>
}

export default ShowCase
