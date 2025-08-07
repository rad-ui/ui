import React, { useId, useState } from 'react';
import ButtonPrimitive from '~/core/primitives/Button';

import { clsx } from 'clsx';

import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

type TreeItemProps = {
    children: React.ReactNode;
    [key: string]: any;
};

const TreeItem = ({ children, item, level = 0, className = '', ...props }: TreeItemProps) => {
    const id = useId();

    const [isToggled, setIsToggled] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        console.log('clicked', id);
        // selected items list should actually be maintained in the parent component
        setIsSelected(!isSelected);
    };

    const handleExpand = () => {
        console.log('handleExpand', id);
        // validations
        if (!item.items || item.items.length === 0) return;
        if (isToggled) return;
        setIsToggled(true);
    };

    const handleCollapse = () => {
        console.log('handleCollapse', id);
        // validations
        if (!item.items || item.items.length === 0) return;
        if (!isToggled) return;
        setIsToggled(false);
    };

    return <>
        <RovingFocusGroup.Item handleRightKeyDown={handleExpand} handleLeftKeyDown={handleCollapse} >
            <ButtonPrimitive
                className={clsx(className)}
                onClick={handleClick}
                aria-selected={isSelected}
                style={{ display: 'block', alignItems: 'center', gap: '0.5rem', backgroundColor: isSelected ? 'red' : 'blue' }}
                {...props}>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: `${level * 16}px` }}>
                    <div>
                        {isToggled ? 'v' : '>'}
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </ButtonPrimitive>
        </RovingFocusGroup.Item>

        {isToggled && item.items && <>
            {item.items.map((subItem: any) => {
                const nextLevel = level + 1;
                return <TreeItem level={nextLevel} key={subItem.label} item={subItem}>
                    {subItem.label}
                </TreeItem>;
            })}
        </>}
    </>
    ;
};

export default TreeItem;
