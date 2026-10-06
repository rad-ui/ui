import FullHeightScroll from '@/components/layout/ScrollContainers/FullHeightScroll'
import ShowcaseHeader from "./helpers/ShowcaseHeader"
import ShowcaseTabs from "./helpers/ShowcaseTabs"


const ShowCase = ({children}) => {
    return <FullHeightScroll>
        <div className='min-h-full px-4 pb-10 pt-6 text-gray-1000 sm:px-6 sm:pt-8 lg:px-8'>
            <div className='mx-auto max-w-[1480px]'>
                <ShowcaseHeader />
                <div className='mt-6'>
                    <ShowcaseTabs />
                </div>
                <div className='mt-4 overflow-hidden rounded-xl border border-gray-500 bg-gray-50 shadow-sm'>
                    {children}
                </div>
            </div>
        </div>
    </FullHeightScroll>
}

export default ShowCase
