'use client'
const Theme = ({ children, darkMode=false }) => {
    return (
        <div className={`${darkMode==='true'?'rad-ui-dark-theme':''}`} >
            {children}
        </div>
    )
}

export default Theme