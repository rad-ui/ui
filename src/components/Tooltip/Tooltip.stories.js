import React from 'react';
import  Tooltip  from './Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export const Default = () => <Tooltip content={<div className='text-center text-sm text-gray-800'>Hello,World!</div>}>Hover me!</Tooltip>;

