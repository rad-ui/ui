import React from 'react';

import TreeRoot from './shards/TreeRoot';
import TreeItem from './shards/TreeItem';

const COMPONENT_NAME = 'Tree';

type TreeProps = {
    children: React.ReactNode;
    [key: string]: any;
};

const Tree = ({ children, items = [], ...props }: TreeProps) => {
    return <TreeRoot {...props}>
        {items.map((item: any) => (
            <>
                <TreeItem key={item.label} expanded={item.expanded}>
                    {item.label}
                </TreeItem>
                <>
                    {item.items && item.expanded && item.items.map((subItem: any) => (
                        <TreeItem className='ml-4' key={subItem.label} expanded={subItem.expanded}>
                            {subItem.label}
                        </TreeItem>
                    ))}
                </>
            </>
        ))}
    </TreeRoot>;
};

Tree.displayName = COMPONENT_NAME;

export default Tree;
