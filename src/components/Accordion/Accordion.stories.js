import React from 'react';
import  Accordion  from './Accordion';

import StoryBlock from '../storybook/StoryBlock/StoryBlock';

export default {
  title: 'Components/Accordion',
  component: Accordion,
};

export const Default = () => <StoryBlock>
  <Accordion content={<div className='text-center text-sm text-gray-800'>Hello,World!</div>}>Hover me!</Accordion>;
</StoryBlock> 


