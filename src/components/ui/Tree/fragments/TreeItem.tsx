import React, { useContext, useId, useRef, useState } from 'react';
import ButtonPrimitive from '~/core/primitives/Button';
import { TreeContext } from '../contexts/TreeContext';

type TreeItemProps = {
    children: React.ReactNode;
    [key: string]: any;
};

const TreeItem = ({ children, item, level = 0, className = '', ...props }: TreeItemProps) => {
    const id = useId();
    const buttonRef = useRef(null);

    const [isToggled, setIsToggled] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const { moveUp, moveDown } = useContext(TreeContext);

    const handleMove = (direction: 'down' | 'up') => {
        if (direction === 'down') {
            const nextItem = moveDown();
            console.log(nextItem);
            if (nextItem) {
                nextItem.focus();
            }
        } else if (direction === 'up') {
            const prevItem = moveUp();
            console.log(prevItem);
            if (prevItem) {
                prevItem.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            console.log('trapped');
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            // move down

            handleMove('down');
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            // move up
            handleMove('up');
        }
    };

    const handleClick = () => {
        console.log('clicked', id);
        setIsToggled(!isToggled);
    };

    // apply `data-rad-ui-focus-element` if the button is focused

    return <>

        <ButtonPrimitive
            className={className}
            ref={buttonRef}
            onClick={handleClick}
            data-rad-ui-batch-element
            id={`tree-data-item-${id}`}
            onKeyDown={handleKeyDown}
            onFocus={() => {
                setIsFocused(true);
            }}
            onBlur={() => {
                setIsFocused(false);
            }}

            style={{ display: 'block', alignItems: 'center', gap: '0.5rem' }}
            {...(isFocused && { 'data-rad-ui-focus-element': true })}
            {...props}>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div>
                    {isToggled ? 'v' : '>'}
                </div>
                <div>
                    {children}
                </div>
            </div>
        </ButtonPrimitive>
        {isToggled && item.items && <>
            {item.items.map((subItem: any) => {
                const nextLevel = level + 1;
                return <TreeItem level={nextLevel} key={subItem.label} item={subItem}>
                    {subItem.label}
                </TreeItem>;
            })}
        </>}
    </>;
};

export default TreeItem;
