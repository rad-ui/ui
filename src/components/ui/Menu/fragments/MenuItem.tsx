const MenuItem = ({ children, ...props }: MenuItemProps) => {
    return <div {...props}>{children}</div>;
};

export default MenuItem;
