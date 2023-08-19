import React from 'react';
import  Text  from './Text';

import StoryBlock from "../storybook/StoryBlock/StoryBlock"


export default {
  title: 'Components/Text',
  component: Text,
};


const TEXT_CONTENT = "The quick brown fox jumped over the lazy dogs"


export const AllText = () => <StoryBlock>
    <Text.Header>{TEXT_CONTENT}</Text.Header>
    <Text.H1>{TEXT_CONTENT}</Text.H1>
    <Text.H2>{TEXT_CONTENT}</Text.H2>
    <Text.H3>{TEXT_CONTENT}</Text.H3>
    <Text.H4>{TEXT_CONTENT}</Text.H4>
    <Text.Body>{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.{TEXT_CONTENT}.</Text.Body>
</StoryBlock>




