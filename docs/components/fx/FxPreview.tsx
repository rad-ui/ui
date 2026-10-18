'use client'
import { useState } from 'react'
import Button from '@radui/ui/Button'
import { RotateCcw } from 'lucide-react'

import './fx-docs.css'

// Stage for FX demos. "Replay" remounts the demo; "Reduce motion" sets
// data-rad-fx-motion="reduce", the same in-app override the FX components
// honour alongside the OS setting. Headings inside demos stay out of the TOC.
// `bare` drops the stage's own grid and glow, for effects that are a background themselves.
const FxPreview = ({ children, replayable = true, minHeight = 380, variant = 'stage' }: {
    children: React.ReactNode,
    replayable?: boolean,
    minHeight?: number,
    variant?: 'stage' | 'bare'
}) => {
    const [runId, setRunId] = useState(0)
    const [reduced, setReduced] = useState(false)

    return <div className="fx-stage" data-variant={variant} data-docs-toc-ignore="">
        <div className="fx-stage-toolbar">
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
        <div
            // Remount on toggle too, so JS-driven effects re-read the motion preference.
            key={`${runId}-${reduced}`}
            data-rad-fx-motion={reduced ? 'reduce' : undefined}
            className="fx-stage-body"
            style={{ minHeight }}
        >
            {children}
        </div>
    </div>
}

export default FxPreview
