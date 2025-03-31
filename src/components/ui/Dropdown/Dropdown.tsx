import React from 'react';

// TODO: fix any
export type DropdownProps ={
    list: {value: any}[];
    selected: any;
}

const Dropdown = ({ list = [], selected }: DropdownProps) => {
    const PopElem = () => {
        return <ul className='bg-white px-2 py-2 shadow-lg rounded-md'>
            {list.map((item, index) => {
                return <li key={index}>{item.value}</li>;
            })}
        </ul>;
    };
    return <div className='relative'>

        <span>Dropdown</span>

    </div>;
};

export default Dropdown;
