import { createContext } from 'react';

export type DrawerProviderContextType = {
    active: boolean;
    registerOpenDrawer: () => () => void;
};

export const DrawerProviderContext = createContext<DrawerProviderContextType>({
    active: false,
    registerOpenDrawer: () => () => {}
});

export default DrawerProviderContext;
