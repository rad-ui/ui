import React, { useId, useState, useRef, useContext, forwardRef, useImperativeHandle, useEffect, RefObject } from 'react';
import type { ElementRef, ComponentPropsWithoutRef } from 'react';
import ButtonPrimitive from '~/core/primitives/Button';

import clsx from 'clsx';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import { TreeContext } from '../contexts/TreeContext';

export type TreeItemElement = ElementRef<typeof ButtonPrimitive>;
export type TreeItemProps = {
    item: any;
    level?: number;
    parentId?: string | null;
    isSelected?: boolean;
    onToggleSelect?: (id: string, item: any) => void;
    getIsSelected?: (item: any) => boolean;
    onChildRefReady?: (childRef: RefObject<HTMLButtonElement>) => void;
} & ComponentPropsWithoutRef<typeof ButtonPrimitive>;

const TreeItem = forwardRef<TreeItemElement, TreeItemProps>(({ children, item, level = 0, className = '', parentId = null, isSelected = false, onToggleSelect, getIsSelected, onChildRefReady, ...props }, ref) => {
    const id = useId();
    const thisRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => thisRef.current as TreeItemElement);

    const hasChildren = Boolean(item?.items?.length);
    const [isToggled, setIsToggled] = useState(() => Boolean(item?.expanded));
    const { rootClass, itemRefs, registerItemRef, unregisterItemRef } = useContext(TreeContext);
    
    // Store ref for first child
    const firstChildRef = useRef<HTMLButtonElement | null>(null);

    // Register this item's ref with the tree context
    useEffect(() => {
        registerItemRef(id, thisRef);
        return () => {
            unregisterItemRef(id);
        };
    }, [id, registerItemRef, unregisterItemRef]);
    
    // Notify parent of this ref when ready
    useEffect(() => {
        if (onChildRefReady && thisRef.current) {
            onChildRefReady(thisRef);
        }
    }, [onChildRefReady]);

    const handleClick = () => {
        // Delegate selection toggling to the parent
        if (onToggleSelect) {
            onToggleSelect(id, item);
        }
        // On click, toggle expand/collapse if this item has children
        if (hasChildren) {
            setIsToggled(prev => !prev);
        }
    };

    const handleExpand = () => {
        // validations
        if (!hasChildren) return;
        if (isToggled) {
            // Focus first child when already expanded
            firstChildRef.current?.focus();
            return;
        }
        setIsToggled(true);
    };

    const handleCollapse = () => {
        // validations
        if (isToggled) {
            setIsToggled(false);
            return;
        }
        if (!parentId) return;
        
        // Focus parent item using ref from context
        const parentRef = itemRefs.get(parentId);
        if (parentRef?.current) {
            parentRef.current.focus();
        }

        setIsToggled(false);
    };

    // Callback to capture first child ref
    const handleFirstChildRef = (childRef: RefObject<HTMLButtonElement>) => {
        firstChildRef.current = childRef.current;
    };

    return (
        <>
            <RovingFocusGroup.Item handleRightKeyDown={handleExpand} handleLeftKeyDown={handleCollapse} role="treeitem">
                <ButtonPrimitive
                    ref={thisRef}
                    className={clsx(`${rootClass}-item`, className)}
                    onClick={handleClick}
                    onKeyDownCapture={(e: React.KeyboardEvent) => {
                        // Prevent Enter from triggering click/expand; expansion is only via ArrowRight
                        if (e.key === 'Enter') {
                            // Select via parent handler
                            if (onToggleSelect) {
                                onToggleSelect(id, item);
                            }
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }}
                    type="button"
                    data-selected={isSelected}
                    aria-selected={isSelected}
                    aria-expanded={hasChildren ? isToggled : undefined}
                    data-toggled={isToggled}
                    data-has-children={hasChildren}
                    data-id={id}
                    data-parent-id={parentId}
                    data-level={level}
                    {...props}
                >
                    <span className={`${rootClass}-item-chevron`} aria-hidden>
                        {hasChildren ? (
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                focusable="false"
                            >
                                <path
                                    d="M4.5 2.5L7.5 6L4.5 9.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        ) : null}
                    </span>
                    <span className={`${rootClass}-item-label`}>{children}</span>
                </ButtonPrimitive>
            </RovingFocusGroup.Item>

            {isToggled && item.items && (
                <div className={`${rootClass}-branch`} role="group">
                    {item.items.map((subItem: any, index: number) => {
                        const nextLevel = level + 1;
                        const childIsSelected = getIsSelected ? getIsSelected(subItem) : false;
                        
                        return (
                            <TreeItem
                                parentId={id}
                                level={nextLevel}
                                key={subItem.label}
                                item={subItem}
                                isSelected={childIsSelected}
                                onToggleSelect={onToggleSelect}
                                getIsSelected={getIsSelected}
                                onChildRefReady={index === 0 ? handleFirstChildRef : undefined}
                            >
                                {subItem.label}
                            </TreeItem>
                        );
                    })}
                </div>
            )}
        </>
    );
});

TreeItem.displayName = 'TreeItem';

export default TreeItem;
