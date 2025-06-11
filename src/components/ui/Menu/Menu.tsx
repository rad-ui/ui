import React from 'react';

import MenuRoot from './fragments/MenuRoot';
import MenuTrigger from './fragments/MenuTrigger';
import MenuContent from './fragments/MenuContent';
import MenuItem from './fragments/MenuItem';

// Empty implementation - we don't support direct usage
const Menu = () => {
    console.warn('Direct usage of Menu is not supported. Please use Menu.Root and Menu.Item instead.');
    return null;
};

// Export fragments via direct assignment pattern
Menu.Root = MenuRoot;
Menu.Trigger = MenuTrigger;
Menu.Content = MenuContent;
Menu.Item = MenuItem;

export default Menu;
