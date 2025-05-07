import { createContext } from 'react';

type AvatarContextType = {
    size?: string;
    variant?: string;
    color?: string;
    fallback: string;
    src: string;
    alt: string;
    rootClass?: string;
}
export const AvatarContext = createContext<AvatarContextType>({
    size: '',
    variant: '',
    color: '',
    fallback: '',
    src: '',
    alt: '',
    rootClass: ''
} as AvatarContextType);
