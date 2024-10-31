import { createContext } from 'react';

interface AvatarPrimitiveContextType {
    isImageLoaded: boolean;
    hasError: boolean;
    handleLoadImage: () => void;
    handleErrorImage: () => void;
}

export const AvatarPrimitiveContext = createContext<AvatarPrimitiveContextType>({} as AvatarPrimitiveContextType);
