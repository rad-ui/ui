import React, { useRef } from 'react';

import { TreeContext } from '../contexts/TreeContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Primitive from '~/core/primitives/Primitive';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';

const COMPONENT_NAME = 'Tree';

type TreeRootProps = {
    children: React.ReactNode;
    className?: string;
    customRootClass?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    [key: string]: any;
};

const TreeRoot = ({ children, className = '', customRootClass = '', 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, ...props }: TreeRootProps) => {
    const treeRef = useRef<HTMLDivElement | null>(null);
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const treeContextValue = {
        rootClass,
        treeRef
    };

    return (
        <TreeContext.Provider value={treeContextValue}>
            <RovingFocusGroup.Root orientation='vertical' mode='tree'>
                <RovingFocusGroup.Group>
                    <Primitive.div
                        className={clsx(rootClass, className)}
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
