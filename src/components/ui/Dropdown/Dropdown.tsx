import React, {PropsWithChildren} from 'react';
import Content, {DropdownContentProps} from './shards/DropdownContent';
import Trigger, {DropdownTriggerProps} from './shards/DropdownTrigger';
import Root, {DropdownRootProps} from './shards/DropdownRoot';

/* https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
 * CHECKLIST
 *
 * Add aria-control
 * */

const COMPONENT_NAME = 'DropdownMenu';

type DropdownProps = PropsWithChildren & {triggerContent?: string}

const Dropdown = ({children, triggerContent}: DropdownProps) => {
    return (
        <Root>
            <Trigger content={triggerContent}/>
            <Content >
                {children}
            </Content>
        </Root>
    );
};

Dropdown.displayName = COMPONENT_NAME;
Dropdown.Root= Root;
Dropdown.Trigger= Trigger;
Dropdown.Content= Content;

export default Dropdown;

export type {DropdownProps, DropdownRootProps, DropdownTriggerProps, DropdownContentProps};
