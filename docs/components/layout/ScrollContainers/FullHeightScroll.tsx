'use client'
import ScrollArea from '@radui/ui/ScrollArea';

const FullHeightScroll = ({ children, scrollable = true, fullWidth = false, className='', ...props }) => {
    // An important layout component that allows for full height scrolling
    return <ScrollArea.Root style={{ height: "100%", width: "100%" }}>
        <ScrollArea.Viewport style={{ height: "100%" }}>
            <div className={` ${className}  ${scrollable?'':''}`} {...props}>
                <div className={fullWidth ? "w-full" : "max-w-[1440px] mx-auto"}>
                    {children}
                </div>
            </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar orientation='vertical'>
            <ScrollArea.Thumb />
        </ScrollArea.Scrollbar>
    </ScrollArea.Root>
}

export default FullHeightScroll;
