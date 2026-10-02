import Text from "@radui/ui/Text"

import FullHeightScroll from '@/components/layout/ScrollContainers/FullHeightScroll'
import ShowcaseHeader from "./helpers/ShowcaseHeader"
import ShowcaseTabs from "./helpers/ShowcaseTabs"


const ShowCase = ({children}) => {
    return <FullHeightScroll>
        <div className='min-h-full px-3 py-3 text-gray-1000 sm:px-4 lg:px-5'>
            <div className='mx-auto max-w-[1480px]'>
                <div className='mb-3 flex flex-col gap-2.5 sm:flex-row sm:items-end sm:justify-between'>
                    <ShowcaseHeader />
                    <div className='flex items-center gap-2 self-start rounded-full border border-gray-600 bg-gray-100 px-2.5 py-1 backdrop-blur-xs sm:self-auto'>
                        <span className='h-2.5 w-2.5 rounded-full bg-green-500' />
                        <Text className='text-xs! text-gray-1000/70'>
                            Live demos
                        </Text>
                    </div>
                </div>
                <div className='mb-3'>
                    <ShowcaseTabs />
                </div>
                <div className='relative overflow-hidden rounded-2xl border border-gray-600 bg-gray-50'>
                    <div className='pointer-events-none absolute inset-0 bg-linear-to-br from-green-500/10 via-transparent to-green-300/10' />
                    <div className='pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-gray-1000/5 to-transparent' />
                    <div className='pointer-events-none absolute -left-16 top-24 h-72 w-72 rounded-full bg-green-500/10 blur-3xl' />
                    <div className='pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-green-300/5 blur-3xl' />
                    <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gray-1000/10' />
                    <div className='relative'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </FullHeightScroll>
}

export default ShowCase
