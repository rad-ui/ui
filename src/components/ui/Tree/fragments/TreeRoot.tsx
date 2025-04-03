import React, { useRef } from 'react';

import { TreeContext } from '../contexts/TreeContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Primitive from '~/core/primitives/Primitive';

type TreeRootProps = {
    children: React.ReactNode;
    [key: string]: any;
};

const TreeRoot = ({ children, ...props }: TreeRootProps) => {
    const treeRef = useRef(null);

    return (
        <TreeContext.Provider value={{}}>
            <RovingFocusGroup.Root orientation='vertical'>
                <RovingFocusGroup.Group>
                    <Primitive.div
                        {...props}
                        ref={treeRef}
                    >{children}</Primitive.div>
                </RovingFocusGroup.Group>

            </RovingFocusGroup.Root>

        </TreeContext.Provider>
    );
};

export default TreeRoot;
