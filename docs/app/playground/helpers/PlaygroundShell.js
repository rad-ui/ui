'use client'

import React from "react"
import Switch from "@radui/ui/Switch"
import { ACCENT_COLORS, PlaygroundContext, toSectionId } from "./PlaygroundContext"

const swatchClass = {
    gray: "bg-gray-900",
    blue: "bg-blue-900",
    green: "bg-green-900",
    red: "bg-red-900",
    plum: "bg-plum-900",
    gold: "bg-gold-900"
}

const PlaygroundShell = ({ sections, children }) => {
    const [accent, setAccent] = React.useState("gray")
    const [showAllColors, setShowAllColors] = React.useState(false)
    const contextValue = React.useMemo(() => ({ accent, showAllColors }), [accent, showAllColors])

    return (
        <PlaygroundContext.Provider value={contextValue}>
            <div className="min-h-full bg-gray-50 text-gray-1000">
                <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
                    <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-gray-300 pb-6">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-semibold tracking-tight">Playground</h1>
                            <p className="text-sm text-gray-950">
                                Every component with its variants, sizes, colors, and states side by side. {sections.length} components.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-5">
                            <div className="flex items-center gap-2" role="group" aria-label="Accent color">
                                <span className="text-xs font-medium text-gray-950">Accent</span>
                                {ACCENT_COLORS.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        title={color}
                                        aria-label={color}
                                        aria-pressed={accent === color}
                                        onClick={() => setAccent(color)}
                                        className={`size-6 rounded-full ${swatchClass[color]} outline-offset-2 aria-pressed:outline-2 aria-pressed:outline-gray-1000`}
                                    />
                                ))}
                            </div>
                            <label className="flex items-center gap-2 text-xs font-medium text-gray-950">
                                <Switch.Root checked={showAllColors} onCheckedChange={setShowAllColors} aria-label="Show all colors">
                                    <Switch.Thumb />
                                </Switch.Root>
                                All colors
                            </label>
                        </div>
                    </header>

                    <div className="grid gap-8 lg:grid-cols-[11rem_minmax(0,1fr)]">
                        <nav aria-label="Components" className="hidden lg:block">
                            <ul className="sticky top-6 grid max-h-[calc(100vh-8rem)] gap-0.5 overflow-y-auto text-sm">
                                {sections.map((title) => (
                                    <li key={title}>
                                        <a href={`#${toSectionId(title)}`} className="block rounded-md px-2 py-1 text-gray-950 hover:bg-gray-200 hover:text-gray-1000">
                                            {title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div className="grid min-w-0 gap-10">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </PlaygroundContext.Provider>
    )
}

export default PlaygroundShell
