'use client'
import { useContext } from 'react'
import { Search } from 'lucide-react'
import Kbd from '@radui/ui/Kbd'

import { NavBarContext } from '@/components/Main/NavBar/NavBarContext'

/**
 * Opens the search palette. `compact` is the icon-only form for the top bar;
 * the default is the input-shaped field at the top of the sidebar.
 */
const SearchTrigger = ({ compact = false }: { compact?: boolean }) => {
    const { setIsSearchOpen } = useContext(NavBarContext)

    if (compact) {
        return (
            <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search documentation"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-1000 transition-colors hover:bg-gray-200"
            >
                <Search size={15} strokeWidth={2} aria-hidden />
            </button>
        )
    }

    return (
        <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex h-9 w-full items-center gap-2 rounded-lg border border-gray-400 bg-gray-100 px-2.5 text-left text-[0.84rem] text-gray-950 transition-colors hover:border-gray-500 hover:bg-gray-200 hover:text-gray-1000"
        >
            <Search size={14} strokeWidth={2} aria-hidden className="shrink-0" />
            <span className="flex-1 truncate">Search docs</span>
            <Kbd className="docs-kbd-hint" aria-hidden>⌘K</Kbd>
        </button>
    )
}

export default SearchTrigger
