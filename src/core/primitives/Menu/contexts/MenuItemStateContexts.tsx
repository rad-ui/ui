import React from 'react';

/** Checked state of the closest checkbox or radio item, for ItemIndicator. */
export const MenuItemIndicatorContext = React.createContext<{ checked: boolean } | null>(null);

export type MenuRadioGroupContextValue = {
    value: string;
    setValue: (value: string) => void;
    disabled: boolean;
};

export const MenuRadioGroupContext = React.createContext<MenuRadioGroupContextValue | null>(null);

/** Lets a GroupLabel name its Group. */
export const MenuGroupContext = React.createContext<{ labelId: string; setHasLabel: (hasLabel: boolean) => void } | null>(null);
