'use client';

import StepRoot from './fragments/StepRoot';
import StepItem from './fragments/StepItem';
import StepTrack from './fragments/StepTrack';
import StepBubble from './fragments/StepBubble';
import StepLine from './fragments/StepLine';
import StepContent from './fragments/StepContent';
import StepTitle from './fragments/StepTitle';
import StepDescription from './fragments/StepDescription';

const Steps = () => {
    console.warn('Direct usage of Steps is not supported. Please use Steps.Root, Steps.Item, etc. instead.');
    return null;
};

Steps.Root = StepRoot;
Steps.Item = StepItem;
Steps.Track = StepTrack;
Steps.Bubble = StepBubble;
Steps.Line = StepLine;
Steps.Content = StepContent;
Steps.Title = StepTitle;
Steps.Description = StepDescription;

export default Steps;
