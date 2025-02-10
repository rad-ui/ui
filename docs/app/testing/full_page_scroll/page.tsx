import FullHeightScroll from "@/components/layout/ScrollContainers/FullHeightScroll";

const FullPageScroll = () => {
    return <FullHeightScroll scrollable={true} className="bg-gray-200 p-10 pb-20">
        <div>
           {
            Array.from({ length: 100 }).map((_, index) => (
                <div key={index} className="text-gray-1000">
                    {index}
                </div>
            ))
           }
        </div>
    </FullHeightScroll>
}

export default FullPageScroll;