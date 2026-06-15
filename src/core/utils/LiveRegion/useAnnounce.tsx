'use client';
import React, { useCallback, useState } from 'react';
import LiveRegion, { LiveRegionPoliteness } from './LiveRegion';

export type UseAnnounceOptions = {
    politeness?: LiveRegionPoliteness;
    atomic?: boolean;
};

export type UseAnnounceReturn = {
    announce: (message: string) => void;
    Announcer: () => React.JSX.Element | null;
};

/**
 * Programmatic screen reader announcements via a companion live region.
 * Render `Announcer` once in the tree (typically near the app root).
 */
export function useAnnounce(options: UseAnnounceOptions = {}): UseAnnounceReturn {
    const { politeness = 'polite', atomic = true } = options;
    const [message, setMessage] = useState('');

    const announce = useCallback((nextMessage: string) => {
        setMessage('');
        queueMicrotask(() => {
            setMessage(nextMessage);
        });
    }, []);

    const Announcer = useCallback(
        () => (
            <LiveRegion politeness={politeness} atomic={atomic}>
                {message}
            </LiveRegion>
        ),
        [message, politeness, atomic]
    );

    return { announce, Announcer };
}
