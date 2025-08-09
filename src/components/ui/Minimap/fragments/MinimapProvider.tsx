'use client';
import React from 'react';
import MinimapProviderContext from '../context/MinimapProviderContext';

const MinimapProvider = ({ children }: { children: React.ReactNode }) => {
    const [visibleItems, setVisibleItems] = React.useState<string[]>([]);

    const handleInView = React.useCallback((value: string | null) => {
        setVisibleItems((prev) => {
            if (value === null || prev.includes(value)) {
                return prev;
            }
            return [...prev, value];
        });
    }, []);

    const handleOutView = React.useCallback((value: string | null) => {
        setVisibleItems((prev) => {
            if (value === null || !prev.includes(value)) {
                return prev;
            }
            return prev.filter((item) => item !== value);
        });
    }, []);

    const contextValue = React.useMemo(() => ({
        visibleItems,
        handleInView,
        handleOutView
    }), [visibleItems, handleInView, handleOutView]);

    return <MinimapProviderContext.Provider value={contextValue}>{children}</MinimapProviderContext.Provider>;
};

export default MinimapProvider;
