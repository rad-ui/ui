type TabRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    color?: string;
    props?: Record<string, any>[];
    tabs: [];
    activeTab: any
}

export default TabRootProps;
