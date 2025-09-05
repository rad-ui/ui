import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import type { ElementRef, ComponentPropsWithoutRef } from 'react';

import { TreeContext } from '../contexts/TreeContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Primitive from '~/core/primitives/Primitive';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';

const COMPONENT_NAME = 'Tree';

export type TreeRootElement = ElementRef<typeof Primitive.div>;
export type TreeRootProps = {
    customRootClass?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
} & ComponentPropsWithoutRef<typeof Primitive.div>;

const TreeRoot = forwardRef<TreeRootElement, TreeRootProps>(({ children, className = '', customRootClass = '', 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, ...props }, ref) => {
    const treeRef = useRef<TreeRootElement>(null);
    useImperativeHandle(ref, () => treeRef.current as TreeRootElement);
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
                        ref={treeRef}
                        role="tree"
                        aria-label={ariaLabel}
                        aria-labelledby={ariaLabelledBy}
                        {...props}
                    >
                        {children}
                    </Primitive.div>
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        </TreeContext.Provider>
    );
});

TreeRoot.displayName = COMPONENT_NAME;

export default TreeRoot;

