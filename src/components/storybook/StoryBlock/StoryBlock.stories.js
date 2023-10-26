import React from 'react';
import  StoryBlock  from './StoryBlock';
import Box from "../..//layout/Box/Box"
import Text from "../../Text/Text"

export default {
  title: 'Components/StoryBlock',
  component: StoryBlock,
};

export const Regular = () => <StoryBlock>
    <Box style={{marginTop:"10px"}}>
      
        <Text.Body style={{display:"block"}}>  We are also inside the box now!</Text.Body>
        <Text.Body>This is a story block!</Text.Body>
    </Box>
</StoryBlock>;


