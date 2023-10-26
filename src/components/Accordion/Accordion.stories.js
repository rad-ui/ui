import React from 'react';
import  Accordion  from './Accordion';

export default {
  title: 'Components/Accordion',
  component: Accordion,
};

export const Default = () => <Accordion content={<div className='text-center text-sm text-gray-800'>Hello,World!</div>}>Hover me!</Accordion>;


