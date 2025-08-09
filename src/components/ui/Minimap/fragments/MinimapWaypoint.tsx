'use client';
import React from 'react';
import { clsx } from 'clsx';
import MinimapContext from '../context/MinimapContext';
import MinimapProviderContext from '../context/MinimapProviderContext';
import { useInView } from '~/core/hooks/useInView/useInView';

type MinimapWaypointProps = React.HTMLAttributes<HTMLDivElement> & {
    value?: string | null;
};

const MinimapWaypoint = ({ children, className = '', value = '', ...props }: MinimapWaypointProps) => {
    const { rootClass } = React.useContext(MinimapContext) || { rootClass: '' };
    const { handleInView, handleOutView, registerRef } = React.useContext(MinimapProviderContext) || {
        handleInView: () => { },
        handleOutView: () => { },
        registerRef: () => { }
    };

    // Memoize callbacks to prevent useEffect re-runs
    const handleEnter = React.useCallback(() => {
        console.log('waypoint', value, 'in view');
        handleInView(value);
    }, [value, handleInView]);

    const handleLeave = React.useCallback(() => {
        console.log('waypoint', value, 'out of view');
        handleOutView(value);
    }, [value, handleOutView]);

    const ref = useInView<HTMLDivElement>({
        onEnter: handleEnter,
        onLeave: handleLeave,
        threshold: 0.1 // Trigger when 10% visible
    });

    // Combined ref callback to handle both useInView and registerRef
    const combinedRef = React.useCallback((node: HTMLDivElement | null) => {
        // Set the ref for useInView
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref) {
            ref.current = node;
        }

        // Register with provider for scrollToItem functionality
        if (value) {
            registerRef(value, node);
        }
    }, [ref, value, registerRef]);

    return (
        <div
            ref={combinedRef}
            className={clsx(className)}
            {...props}
        >
            {children}
        </div>
    );
};

export default MinimapWaypoint;
