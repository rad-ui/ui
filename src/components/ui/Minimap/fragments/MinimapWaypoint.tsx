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
    const { handleInView, handleOutView } = React.useContext(MinimapProviderContext) || { handleInView: () => { }, handleOutView: () => { } };

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

    return (
        <div
            ref={ref}
            className={clsx(`${rootClass}-waypoint`, className)}
            {...props}
        >
            {children}
        </div>
    );
};

export default MinimapWaypoint;
