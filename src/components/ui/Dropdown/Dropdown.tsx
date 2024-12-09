import React from 'react';
import Popper from '~/components/tools/Popper/Popper';
import { clsx } from 'clsx';
// TODO: fix any
export type DropdownProps ={
    list: {value: any}[];
    selected: any;
}

const Dropdown = ({ list = [], selected }: DropdownProps) => {
    const PopElem = () => {
        return <ul className={clsx('bg-white px-2 py-2 shadow-lg rounded-md')}>
            {list.map((item, index) => {
                return <li key={index}>{item.value}</li>;
            })}
        </ul>;
    };
    return <div className={clsx('relative')}>
        <Popper open={false} placement="bottom-start" popperName="dropdown" pop={<PopElem/>}>
            <span>Dropdown</span>
        </Popper>
    </div>;
};

export default Dropdown;
