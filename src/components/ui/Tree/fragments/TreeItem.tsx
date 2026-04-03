import React, { useId, useState, useRef, useContext, forwardRef, useImperativeHandle } from 'react';
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
} & ComponentPropsWithoutRef<typeof ButtonPrimitive>;

const TreeItem = forwardRef<TreeItemElement, TreeItemProps>(({ children, item, level = 0, className = '', parentId = null, isSelected = false, onToggleSelect, getIsSelected, ...props }, ref) => {
    const id = useId();
    const thisRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => thisRef.current as TreeItemElement);

    const hasChildren = Boolean(item?.items?.length);
    const [isToggled, setIsToggled] = useState(() => Boolean(item?.expanded));
    const { rootClass } = useContext(TreeContext);

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
            const itemElement = thisRef.current;
            const next = itemElement?.nextElementSibling as HTMLElement | null | undefined;
            if (!next) return;
            if (next.getAttribute('role') === 'group') {
                const firstChild = next.querySelector('[role="treeitem"]') as HTMLElement | null;
                firstChild?.focus();
                return;
            }
            if (next.matches('[role="treeitem"]')) {
                next.focus();
            }
            return;
        }
        setIsToggled(true);
    };

    const handleCollapse = () => {
        // validations
        // if (!item.items || item.items.length === 0) return;
        if (isToggled) {
            setIsToggled(false);
            return;
        }
        if (!parentId) return;
        // get the parent item

        const parentItem = document.querySelector(`[data-id="${parentId}"]`) as HTMLButtonElement;
        // get the button that comes before the current item
        if (parentItem) {
            parentItem.focus();
        }

        setIsToggled(false);
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
                    {item.items.map((subItem: any) => {
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
