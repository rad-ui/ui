import React, { useRef } from 'react';

import { TreeContext } from '../contexts/TreeContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Primitive from '~/core/primitives/Primitive';

type TreeRootProps = {
    children: React.ReactNode;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    [key: string]: any;
};

const TreeRoot = ({ children, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, ...props }: TreeRootProps) => {
    const treeRef = useRef(null);

    const treeContextValue = {};

    return (
        <TreeContext.Provider value={treeContextValue}>
            <RovingFocusGroup.Root orientation='vertical' mode='tree'>
                <RovingFocusGroup.Group>
                    <Primitive.div
                        {...props}
                        ref={treeRef}
                        role="tree"
                        aria-label={ariaLabel}
                        aria-labelledby={ariaLabelledBy}
                    >
                        {children}
                    </Primitive.div>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        </TreeContext.Provider>
    );
};

export default TreeRoot;
