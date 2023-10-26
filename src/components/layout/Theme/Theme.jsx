const Theme = ({children,isDark=false})=>{
    return <div className={`${isDark?'rad-ui-dark-theme':''}`}>
        {children}
    </div>
}

export default Theme;