import { createContext } from 'react';

type AvatarContextType = {
    size?: string;
    variant?: string;
    color?: string;
    rootClass?: string;
}
export const AvatarContext = createContext<AvatarContextType>({
    size: '',
    variant: '',
    color: '',
    rootClass: ''
} as AvatarContextType);
