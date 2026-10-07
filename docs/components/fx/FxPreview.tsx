'use client'
import { useState } from 'react'
import Button from '@radui/ui/Button'
import { RotateCcw } from 'lucide-react'

import { docsSurfaceClassName } from '@/components/layout/Documentation/shared'

// Preview frame for FX demos. "Replay" remounts the demo; "Reduce motion"
// sets data-rad-fx-motion="reduce", the same in-app override the FX
// components honour alongside the OS prefers-reduced-motion setting.
const FxPreview = ({ children, replayable = true, minHeight = 280 }: {
    children: React.ReactNode,
    replayable?: boolean,
    minHeight?: number
}) => {
    const [runId, setRunId] = useState(0)
    const [reduced, setReduced] = useState(false)

    return <div className={docsSurfaceClassName}>
        <div className="flex items-center justify-between gap-2 border-b border-gray-300 bg-gray-100 px-4 py-2">
            <span className="font-mono text-[11px] tracking-wide text-gray-950">preview</span>
            <div className="flex items-center gap-1">
                <Button
                    size="small"
                    variant={reduced ? 'soft' : 'ghost'}
                    color="gray"
                    aria-pressed={reduced}
                    onClick={() => setReduced((value) => !value)}
                >
                    Reduce motion
                </Button>
                {replayable ? <Button size="small" variant="ghost" color="gray" onClick={() => setRunId((id) => id + 1)}>
                    <RotateCcw size={13} aria-hidden="true" /> Replay
                </Button> : null}
            </div>
        </div>
        <div
            // Remount on toggle too, so JS-driven effects re-read the motion preference.
            key={`${runId}-${reduced}`}
            data-rad-fx-motion={reduced ? 'reduce' : undefined}
            className="flex items-center justify-center overflow-hidden"
            style={{ minHeight }}
        >
            {children}
        </div>
    </div>
}

export default FxPreview
