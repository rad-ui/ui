import React, {PropsWithChildren} from 'react';
import {Content, DropdownContentProps} from './shards/DropdownContent';
import {Trigger, DropdownTriggerProps} from './shards/DropdownTrigger';
import {Root, DropdownRootProps} from './shards/DropdownRoot';

/* https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
 * CHECKLIST
 *
 * Add aria-control
 * */

export default {Trigger, Content, Root};
type DropdownMenuProps = PropsWithChildren
