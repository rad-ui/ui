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

    const [isToggled, setIsToggled] = useState(false);
    const { rootClass } = useContext(TreeContext);

    const handleClick = () => {
        // Delegate selection toggling to the parent
        if (onToggleSelect) {
            onToggleSelect(id, item);
        }
        // On click, toggle expand/collapse if this item has children
        if (item?.items && item.items.length > 0) {
            setIsToggled(prev => !prev);
        }
    };

    const handleExpand = () => {
        // validations
        if (!item.items || item.items.length === 0) return;
        if (isToggled) {
            // focus next item
            const itemElement = thisRef.current;
            // get the button that comes after the current item
            const nextButton = itemElement?.nextElementSibling as HTMLButtonElement;
            if (nextButton) {
                nextButton.focus();
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
            <RovingFocusGroup.Item handleRightKeyDown={handleExpand} handleLeftKeyDown={handleCollapse}>
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
                    data-selected={isSelected}
                    aria-selected={isSelected}
                    data-toggled={isToggled}
                    data-id={id}
                    data-parent-id={parentId}
                    data-level={level}
                    {...props}
                >
                    {children}
                </ButtonPrimitive>
            </RovingFocusGroup.Item>

            {isToggled && item.items && (
                <>
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
                </>
            )}
        </>
    );
});

TreeItem.displayName = 'TreeItem';

export default TreeItem;
