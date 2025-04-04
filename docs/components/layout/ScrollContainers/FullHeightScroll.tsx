const FullHeightScroll = ({ children, scrollable = true, className='', ...props }) => {
    // An important layout component that allows for full height scrolling
    return <div
className={` ${className}  ${scrollable?' overflow-y-auto overflow-x-hidden':''}`} {...props} style={{

    }}>
        <div className="max-w-[1440px] mx-auto">
            {children}
        </div>
    </div>
}

export default FullHeightScroll;