import React, { useRef } from 'react';

import { TreeContext } from '../contexts/TreeContext';
import { getAllBatchElements, getNextBatchItem, getPrevBatchItem } from '~/core/batches';

type TreeRootProps = {
    children: React.ReactNode;
    [key: string]: any;
};

const TreeRoot = ({ children, ...props }: TreeRootProps) => {
    const treeRef = useRef(null);
    const moveUp = () => {
        const batches = getAllBatchElements(treeRef?.current);
        console.log(batches);
        const prevItem = getPrevBatchItem(batches);
        return prevItem;
    };
    const moveDown = () => {
        const batches = getAllBatchElements(treeRef?.current);
        console.log(batches);
        const nextItem = getNextBatchItem(batches);
        return nextItem;
    };
    return (
        <TreeContext.Provider value={{ treeRef, moveUp, moveDown }}>
            <div
                {...props}
                ref={treeRef}
            >{children}</div>
        </TreeContext.Provider>
    );
};

export default TreeRoot;
