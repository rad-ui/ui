'use client'

import Button from "@radui/ui/Button"
import VisuallyHidden from "@radui/ui/VisuallyHidden"
import ColorLooper from "../helpers/ColorLooper"

const SearchIcon = () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
            d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
        />
    </svg>
)

const VisuallyHiddenPlayground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="VisuallyHidden"
            docsLink="/docs/components/visually-hidden"
            description="Hide text visually while keeping it available to screen readers."
        >
            <div className='flex flex-wrap items-center gap-4'>
                <Button>
                    <VisuallyHidden>Search documentation</VisuallyHidden>
                    <span aria-hidden="true">
                        <SearchIcon />
                    </span>
                </Button>
                <p className="text-sm text-gray-700">
                    Icon-only controls can still expose a complete label to assistive technology.
                </p>
            </div>
        </ColorLooper>
    </div>
)

export default VisuallyHiddenPlayground
