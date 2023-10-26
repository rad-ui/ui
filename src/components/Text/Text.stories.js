import React from 'react';
import  Text  from './Text';

import StoryBlock from "../storybook/StoryBlock/StoryBlock"


export default {
  title: 'Components/Text',
  component: Text,
};


export const AllText = () => <StoryBlock>
    <Text.Header>Build your apps at the speed of light with Rad UI!</Text.Header>
    <Text.H1>Build your apps at the speed of light with Rad UI!</Text.H1>
    <Text.H2>Build your apps at the speed of light with Rad UI!</Text.H2>
    <Text.H3>Build your apps at the speed of light with Rad UI!</Text.H3>
    <Text.H4>Build your apps at the speed of light with Rad UI!</Text.H4>
    <Text.Body>Build your apps at the speed of light with Rad UI!</Text.Body>
</StoryBlock>




