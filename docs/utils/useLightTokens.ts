'use client'
import { useEffect, useState } from 'react'

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000]
const RAMPS = ['gray', 'blue', 'violet', 'crimson', 'orange', 'jade', 'red', 'green', 'amber']
const LIGHT_TOKENS = [
    ...RAMPS.flatMap((ramp) => STEPS.map((step) => `--rad-ui-color-${ramp}-${step}`)),
    ...['xs', 'sm', 'md', 'lg', 'xl'].map((size) => `--rad-ui-shadow-${size}`)
]

/**
 * Clarity declares its light ramps on :root and only overrides them under
 * [data-rad-ui-theme="dark"], so a light Theme nested in a dark page would
 * inherit dark values. When that happens, re-declare the root (light) values
 * on the stage so the nested appearance is honest.
 */
export function useLightTokens(enabled: boolean) {
    const [vars, setVars] = useState<Record<string, string>>({})
    useEffect(() => {
        if (!enabled) {
            setVars({})
            return
        }
        const root = getComputedStyle(document.documentElement)
        const next: Record<string, string> = {}
        for (const name of LIGHT_TOKENS) {
            const value = root.getPropertyValue(name).trim()
            if (value) next[name] = value
        }
        setVars(next)
    }, [enabled])
    return vars
}
