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

type DropdownMenuProps = PropsWithChildren

const DropdownMenu = ({children}: DropdownMenuProps) => {
    return (
        <Root>
            <Trigger/>
            <Content >
                {children}
            </Content>
        </Root>
    );
};

DropdownMenu.displayName = COMPONENT_NAME;
DropdownMenu.Root= Root;
DropdownMenu.Trigger= Trigger;
DropdownMenu.Content= Content;

export default DropdownMenu;

export type {DropdownMenuProps, DropdownRootProps, DropdownTriggerProps, DropdownContentProps};
