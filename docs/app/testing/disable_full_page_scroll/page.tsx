import FullHeightScroll from "@/components/layout/ScrollContainers/FullHeightScroll";

const FullPageScroll = () => {
    return <FullHeightScroll scrollable={false}>
        <div className="w-full h-full bg-gray-200">
           {
            Array.from({ length: 100 }).map((_, index) => (
                <div key={index} className="w-full h-10 bg-gray-200">
                    {index}
                </div>
            ))
           }
        </div>
    </FullHeightScroll>
}

export default FullPageScroll;