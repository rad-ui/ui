'use client'

import * as React from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * True when the user asked for less motion: the OS "Reduce motion" setting, or an
 * in-app setting via data-rad-fx-motion="reduce" on any ancestor of `ref`.
 * Starts as false on the server and updates after mount.
 */
export function useReducedMotion(ref?: React.RefObject<Element | null>): boolean {
    const [reduced, setReduced] = React.useState(false)

    React.useEffect(() => {
        const query = typeof window.matchMedia === 'function' ? window.matchMedia(QUERY) : null
        const update = () => setReduced(
            Boolean(query?.matches) || Boolean(ref?.current?.closest('[data-rad-fx-motion="reduce"]'))
        )
        update()
        query?.addEventListener('change', update)
        return () => query?.removeEventListener('change', update)
    }, [ref])

    return reduced
}

/** Calls `onEnter` once when `ref` first scrolls into view (or right away without IntersectionObserver). */
export function useInViewOnce(ref: React.RefObject<Element | null>, onEnter: () => void, enabled = true, threshold = 0.2) {
    const callback = React.useRef(onEnter)
    // Keep the latest callback without re-subscribing the observer on every render.
    React.useEffect(() => { callback.current = onEnter })

    React.useEffect(() => {
        if (!enabled) return
        const node = ref.current
        if (!node || typeof IntersectionObserver === 'undefined') {
            callback.current()
            return
        }
        const observer = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                observer.disconnect()
                callback.current()
            }
        }, { threshold })
        observer.observe(node)
        return () => observer.disconnect()
    }, [ref, enabled, threshold])
}

/** True while `ref` is outside the viewport, so looping effects can pause. */
export function useOffscreen(ref: React.RefObject<Element | null>): boolean {
    const [offscreen, setOffscreen] = React.useState(false)
    React.useEffect(() => {
        const node = ref.current
        if (!node || typeof IntersectionObserver === 'undefined') return
        const observer = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting))
        observer.observe(node)
        return () => observer.disconnect()
    }, [ref])
    return offscreen
}
