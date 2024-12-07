'use client';
import React from 'react';
import { customClassSwitcher } from '~/core';

// Can be rendered as p, label, div, span, etc.
// TODO: Add as prop support
// TODO: Add a core reusable function to check and render an as prop

const COMPONENT_NAME = 'Text';

const tagMap = ['div' , 'span' ,'p','label']

export type TextProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    as?: 'div' | 'span' | 'p' | 'label';
} & React.ComponentProps<'p'>;

const Text = ({ children, customRootClass = '', className = '', as='p' , ...props }: TextProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
      let Tag = 'p'
      tagMap.map((tag) => tag === as && (Tag = as)) ;
      
      return React.createElement(Tag, { className: `${rootClass} ${className}`, ...props }, children) 
    
    
};

Text.displayName = COMPONENT_NAME;

export default Text;
