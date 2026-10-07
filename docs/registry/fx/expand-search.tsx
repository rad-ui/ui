'use client'

import * as React from 'react'

import './expand-search.css'

export type ExpandSearchProps = {
    /** Called with the query on submit. */
    onSearch?: (query: string) => void
    placeholder?: string
    /** Accessible name for the field and the button. */
    label?: string
    className?: string
}

// A search button that widens into a field. The button reports aria-expanded,
// focus moves into the field on open, and Escape closes it and returns focus.
const ExpandSearch = ({ onSearch, placeholder = 'Search…', label = 'Search', className }: ExpandSearchProps) => {
    const [open, setOpen] = React.useState(false)
    const [query, setQuery] = React.useState('')
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const buttonRef = React.useRef<HTMLButtonElement | null>(null)
    const inputId = React.useId()

    React.useEffect(() => { if (open) inputRef.current?.focus() }, [open])

    const close = () => { setOpen(false); buttonRef.current?.focus() }

    return <form
        role="search"
        className={['rad-fx-search', className].filter(Boolean).join(' ')}
        data-state={open ? 'open' : 'closed'}
        onSubmit={(event) => { event.preventDefault(); onSearch?.(query) }}
    >
        <button
            ref={buttonRef}
            type="button"
            className="rad-fx-search-toggle"
            aria-label={label}
            aria-expanded={open}
            aria-controls={inputId}
            onClick={() => (open ? close() : setOpen(true))}
        >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="6.5" /><path d="M16 16 L20.5 20.5" /></svg>
        </button>
        <input
            ref={inputRef}
            id={inputId}
            type="search"
            className="rad-fx-search-input"
            aria-label={label}
            placeholder={placeholder}
            value={query}
            tabIndex={open ? 0 : -1}
            aria-hidden={!open || undefined}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => { if (event.key === 'Escape') { event.preventDefault(); close() } }}
        />
    </form>
}

export default ExpandSearch
