import { createContext } from 'react';
import type { DisclosureItemValue } from './DisclosureContext';

export type DisclosureItemContextType = {
  itemValue: DisclosureItemValue;
  /** @deprecated The item value follows the `value` prop; this is a no-op kept for compatibility. */
  setItemValue: (value: DisclosureItemValue) => void;
  /** DOM id of the item's trigger, used to label its content region. */
  triggerId: string;
}

export const DisclosureItemContext = createContext<DisclosureItemContextType>({} as DisclosureItemContextType);
