import * as React from 'react'
import VisuallyHidden from '@radui/ui/VisuallyHidden'

import './skeleton.css'

export type SkeletonProps = {
    /** Announced to screen readers while loading, e.g. "Loading article". */
    label?: string
    /** Show an avatar circle. */
    avatar?: boolean
    /** Number of text lines. */
    lines?: number
    className?: string
}

// A loading placeholder with a soft shimmer. The shapes are aria-hidden; screen
// readers hear one status message instead of a pile of empty boxes.
const Skeleton = ({ label = 'Loading', avatar = false, lines = 3, className }: SkeletonProps) => (
    <div role="status" className={['rad-fx-skeleton', className].filter(Boolean).join(' ')}>
        <VisuallyHidden asChild><span>{label}</span></VisuallyHidden>
        <div className="rad-fx-skeleton-body" aria-hidden="true">
            {avatar ? <span className="rad-fx-skeleton-block" data-shape="avatar" /> : null}
            <span className="rad-fx-skeleton-lines">
                {Array.from({ length: lines }, (_, i) => (
                    <span key={i} className="rad-fx-skeleton-block" data-shape="line" style={{ width: i === lines - 1 ? '60%' : '100%' }} />
                ))}
            </span>
        </div>
    </div>
)

export default Skeleton
