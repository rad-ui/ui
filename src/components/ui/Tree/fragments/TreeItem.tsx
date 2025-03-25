import React, { useId, useRef, useState } from 'react';
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

    const handleClick = () => {
        console.log('clicked', id);
        setIsToggled(!isToggled);
    };

    return <>
        <RovingFocusGroup.Item >
            <ButtonPrimitive
                className={clsx(className)}
                onClick={handleClick}
                style={{ display: 'block', alignItems: 'center', gap: '0.5rem' }}
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
