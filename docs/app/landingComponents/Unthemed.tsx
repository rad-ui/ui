'use client'

import { useContext, useId, type ReactNode } from 'react'
import Theme from '@radui/ui/Theme'

import { NavBarContext } from '@/components/Main/NavBar/NavBarContext'

/**
 * A Theme scope without a class namespace: Rad UI components inside render
 * no generated classes, so the Clarity stylesheet never touches them and the
 * landing page styles them purely off their data-* attributes.
 */
export default function Unthemed({
    children,
    className = 'contents',
    classNamespace
}: {
    children: ReactNode
    className?: string
    classNamespace?: string
}) {
    const { darkMode } = useContext(NavBarContext)
    const id = useId()
    return (
        <Theme
            id={`landing-unthemed-${id.replace(/:/g, '')}`}
            appearance={darkMode ? 'dark' : 'light'}
            classNamespace={classNamespace}
            className={className}
        >
            {children}
        </Theme>
    )
}
