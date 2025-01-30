const FullHeightScroll = ({ children, scrollable = true }) => {
    // An important layout component that allows for full height scrolling
    return <div className={`flex flex-1 ${scrollable?'overflow-y-auto overflow-x-hidden':''}`}>
        {children}
    </div>
}

export default FullHeightScroll;