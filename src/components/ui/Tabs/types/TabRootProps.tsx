type TabRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    color?: string;
    props?: Record<string, any>[];
    tabs: [];
    defaultTab: string;
}

export default TabRootProps;
