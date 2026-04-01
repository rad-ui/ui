'use client';

import StepRoot from './fragments/StepRoot';
import StepItem from './fragments/StepItem';
import StepTrack from './fragments/StepTrack';
import StepBubble from './fragments/StepBubble';
import StepLine from './fragments/StepLine';
import StepContent from './fragments/StepContent';
import StepTitle from './fragments/StepTitle';
import StepDescription from './fragments/StepDescription';

const StepsComponent = () => {
    console.warn('Direct usage of Steps is not supported. Please use Steps.Root, Steps.Item, etc. instead.');
    return null;
};

type StepsComponentType = typeof StepsComponent & {
    Root: typeof StepRoot;
    Item: typeof StepItem;
    Track: typeof StepTrack;
    Bubble: typeof StepBubble;
    Line: typeof StepLine;
    Content: typeof StepContent;
    Title: typeof StepTitle;
    Description: typeof StepDescription;
};

const Steps = Object.assign(StepsComponent, {
    Root: StepRoot,
    Item: StepItem,
    Track: StepTrack,
    Bubble: StepBubble,
    Line: StepLine,
    Content: StepContent,
    Title: StepTitle,
    Description: StepDescription
}) as StepsComponentType;

export type { StepsRootProps } from './fragments/StepRoot';
export type { StepItemProps } from './fragments/StepItem';
export type { StepTrackProps } from './fragments/StepTrack';
export type { StepBubbleProps } from './fragments/StepBubble';
export type { StepLineProps } from './fragments/StepLine';
export type { StepContentProps } from './fragments/StepContent';
export type { StepTitleProps } from './fragments/StepTitle';
export type { StepDescriptionProps } from './fragments/StepDescription';
export default Steps;
