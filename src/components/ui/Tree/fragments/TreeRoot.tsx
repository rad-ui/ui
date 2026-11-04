import React, { useRef, forwardRef, useImperativeHandle, useCallback, RefObject } from 'react';
import type { ElementRef, ComponentPropsWithoutRef } from 'react';

import { TreeContext } from '../contexts/TreeContext';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Primitive from '~/core/primitives/Primitive';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';
import { useDirection } from '~/core/hooks/useDirection';
import { useControllableState } from '~/core/hooks/useControllableState';

const COMPONENT_NAME = 'Tree';

export type TreeRootElement = ElementRef<typeof Primitive.div>;
export type TreeRootProps = {
    customRootClass?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    loop?: boolean;
    /** Reading direction. In `rtl`, ArrowLeft expands and ArrowRight collapses. */
    dir?: 'ltr' | 'rtl';
    /**
     * Keys of the expanded items (controlled). An item's key is its `id`, else `value`, else `label`.
     * Without `expanded` or `defaultExpanded`, items follow their own `expanded` field.
     */
    expanded?: string[];
    /** Keys of the items expanded at first (uncontrolled). */
    defaultExpanded?: string[];
    /** Called with the keys of the expanded items when one expands or collapses. */
    onExpandedChange?: (expanded: string[]) => void;
} & Omit<ComponentPropsWithoutRef<typeof Primitive.div>, 'dir'>;

const EMPTY: string[] = [];

const isTypeaheadKey = (event: React.KeyboardEvent) => (
    event.key.length === 1 &&
    event.key !== ' ' &&
    !event.ctrlKey &&
    !event.metaKey &&
    !event.altKey
);

const TreeRoot = forwardRef<TreeRootElement, TreeRootProps>(({ children, className = '', customRootClass = '', 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, loop = true, onKeyDown, dir: dirProp, expanded, defaultExpanded, onExpandedChange, ...props }, ref) => {
    const dir = useDirection(dirProp);
    const managed = expanded !== undefined || defaultExpanded !== undefined;
    const [expandedKeys, setExpandedKeys] = useControllableState<string[]>(expanded, defaultExpanded ?? EMPTY, onExpandedChange);
    const expandedRef = useRef(expandedKeys ?? EMPTY);
    expandedRef.current = expandedKeys ?? EMPTY;
    const setExpanded = useCallback((key: string, open: boolean) => {
        const current = expandedRef.current;
        if (open === current.includes(key)) return;
        setExpandedKeys(open ? [...current, key] : current.filter((entry) => entry !== key));
    }, [setExpandedKeys]);
    const expansion = React.useMemo(() => (managed
        ? { isExpanded: (key: string) => (expandedKeys ?? EMPTY).includes(key), setExpanded }
        : undefined), [managed, expandedKeys, setExpanded]);
    const treeRef = useRef<TreeRootElement>(null);
    useImperativeHandle(ref, () => treeRef.current as TreeRootElement);
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    
    const itemRefsMap = useRef(new Map<string, RefObject<HTMLButtonElement>>());

    const registerItemRef = useCallback((id: string, itemRef: RefObject<HTMLButtonElement>) => {
        itemRefsMap.current.set(id, itemRef);
    }, []);

    const unregisterItemRef = useCallback((id: string) => {
        itemRefsMap.current.delete(id);
    }, []);

    // Typeahead (WAI-ARIA tree pattern): typing a character moves focus to the next visible
    // item whose label starts with it. Items are resolved from the ref registry in DOM order.
    const handleKeyDown = (event: React.KeyboardEvent<TreeRootElement>) => {
        (onKeyDown as ((e: React.KeyboardEvent<TreeRootElement>) => void) | undefined)?.(event);
        if (event.defaultPrevented || !isTypeaheadKey(event)) return;

        const items = Array.from(itemRefsMap.current.values())
            .map((itemRef) => itemRef.current)
            .filter((node): node is HTMLButtonElement => Boolean(node && node.isConnected && !node.disabled))
            .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        if (items.length === 0) return;

        const char = event.key.toLowerCase();
        const currentIndex = items.findIndex((node) => node === event.target);
        const ordered = [...items.slice(currentIndex + 1), ...items.slice(0, currentIndex + 1)];
        const match = ordered.find((node) => (node.textContent ?? '').trim().toLowerCase().startsWith(char));
        if (match && match !== event.target) {
            event.preventDefault();
            match.focus();
        }
    };

    const treeContextValue = {
        rootClass,
        treeRef,
        itemRefs: itemRefsMap.current,
        registerItemRef,
        unregisterItemRef,
        dir,
        expansion
    };

    return (
        <TreeContext.Provider value={treeContextValue}>
            {/* asChild: no generic wrapper div; the role="tree" element carries aria-orientation itself */}
            <RovingFocusGroup.Root orientation='vertical' mode='tree' loop={loop} dir={dir} asChild>
                <RovingFocusGroup.Group>
                    <Primitive.div
                        className={clsx(rootClass, className)}
                        ref={treeRef}
                        role="tree"
                        aria-orientation="vertical"
                        aria-label={ariaLabel}
                        aria-labelledby={ariaLabelledBy}
                        dir={dir}
                        onKeyDown={handleKeyDown}
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
