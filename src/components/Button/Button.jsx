const Button = ({children,type="button",className="", isDark=false, variant="secondary",...props}) => {
    return (
        <button
            type="button"
            className={`button-${variant} ${isDark?'rad-ui-dark-theme':''} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
