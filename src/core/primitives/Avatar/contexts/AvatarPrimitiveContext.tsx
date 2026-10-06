import { createContext } from 'react';

export type AvatarImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

interface AvatarPrimitiveContextType {
    imageLoadingStatus: AvatarImageLoadingStatus;
    isImageLoaded: boolean;
    hasError: boolean
    handleLoadImage: () => void;
    handleErrorImage: () => void;
    /** Marks a (new) image source as loading so a previous error or load result is discarded. */
    handleLoadingImage: () => void;
}

export const AvatarPrimitiveContext = createContext<AvatarPrimitiveContextType>({} as AvatarPrimitiveContextType);
