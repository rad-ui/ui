'use client'
const Theme = ({ children, className='', darkMode=false }) => {
    return (
        <div className={`${className} ${darkMode==='true'?'rad-ui-dark-theme':''}`} >
            {children}
        </div>
    )
}

export default Theme