'use client';
import React from 'react';

import TooltipRoot from './fragments/TooltipRoot';
import TooltipTrigger from './fragments/TooltipTrigger';
import TooltipContent from './fragments/TooltipContent';

const Tooltip = () => {
    console.warn('Direct usage of Tabs is not supported. Please use Tabs.Root, Tabs.List, etc. instead.');
    return null;
};

Tooltip.Root = TooltipRoot;
Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;

export default Tooltip;
