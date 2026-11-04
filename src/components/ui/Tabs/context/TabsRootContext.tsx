import React, { createContext } from 'react';

export type TabsRootContextType = {
  rootClass: string;
  /** Stable id prefix used to link each tab to its panel. */
  baseId: string;
  tabValue: string;
  handleTabChange: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  activationMode?: 'automatic' | 'manual';
  /** Consumer-provided trigger ids, keyed by tab value, so panels stay labelled by their tab. */
  customTriggerIds?: Record<string, string>;
  registerTriggerId?: (value: string, id: string | undefined) => void;
  /** The tablist element, used by `Tabs.Indicator` to measure the active tab. */
  listRef?: React.MutableRefObject<HTMLElement | null>;
  /** Trigger elements keyed by tab value, used by `Tabs.Indicator`. */
  triggerElementsRef?: React.MutableRefObject<Map<string, HTMLElement>>;
} | null;

const sanitize = (value: string) => value.replace(/\s+/g, '-');
export const makeTriggerId = (baseId: string, value: string) => `${baseId}-trigger-${sanitize(value)}`;
export const makeContentId = (baseId: string, value: string) => `${baseId}-content-${sanitize(value)}`;

const TabsRootContext = createContext<TabsRootContextType>(null);

export default TabsRootContext;
