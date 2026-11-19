'use client'

import React from "react"
import Switch from "@radui/ui/Switch"
import { NavBarContext } from "@/components/Main/NavBar/NavBarContext"
import { THEME_PREVIEW_EVENT } from "@/components/Main/Main"
import { PlaygroundContext, toSectionId } from "./PlaygroundContext"
import PlaygroundToolbar, { RADII } from "./PlaygroundToolbar"

// Baremetal styles apply under body[data-rad-ui-design-system="baremetal"]; the root layout sets
// "clarity" on the body, so loading this sheet changes nothing until the toolbar switches.
import "@radui/ui/themes/baremetal.css"

const RADIUS_VARS = ["sm", "md", "lg", "xl"]

const previewAppearance = (value) => window.dispatchEvent(new CustomEvent(THEME_PREVIEW_EVENT, { detail: value }))

const PlaygroundShell = ({ sections, children }) => {
    const { darkMode } = React.useContext(NavBarContext)
    const [accent, setAccent] = React.useState("gray")
    const [showAllColors, setShowAllColors] = React.useState(false)
    const [system, setSystem] = React.useState("clarity")
    const [pinnedAppearance, setPinnedAppearance] = React.useState(null)
    const [radius, setRadius] = React.useState("medium")
    const [unstyled, setUnstyled] = React.useState(false)
    const appearance = pinnedAppearance ?? (darkMode ? "dark" : "light")
    const contextValue = React.useMemo(() => ({ accent, showAllColors, unstyled, appearance }), [accent, showAllColors, unstyled, appearance])

    // The design system lives on <body> so portalled popovers and dialogs follow it too.
    React.useEffect(() => {
        document.body.setAttribute("data-rad-ui-design-system", system)
        return () => document.body.setAttribute("data-rad-ui-design-system", "clarity")
    }, [system])

    // Light or dark previews the whole site without changing the visitor's saved choice.
    React.useEffect(() => {
        if (!pinnedAppearance) return
        previewAppearance(pinnedAppearance)
        return () => previewAppearance(null)
    }, [pinnedAppearance])

    // Radius tokens on <body>, for the same reason as the design system.
    React.useEffect(() => {
        const r = RADII[radius]
        for (const k of RADIUS_VARS) {
            if (r[k]) document.body.style.setProperty(`--rad-ui-radius-${k}`, r[k])
            else document.body.style.removeProperty(`--rad-ui-radius-${k}`)
        }
        return () => RADIUS_VARS.forEach((k) => document.body.style.removeProperty(`--rad-ui-radius-${k}`))
    }, [radius])

    return (
        <PlaygroundContext.Provider value={contextValue}>
            <div className="min-h-full bg-gray-50 text-gray-1000">
                <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
                    <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-gray-300 pb-6">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-semibold tracking-tight">Playground</h1>
                            <p className="text-sm text-gray-950">
                                Every component with its variants, sizes, colors, and states side by side. {sections.length} components. Restyle them all from the bar at the bottom.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-5">
                            <label className="flex items-center gap-2 text-xs font-medium text-gray-950">
                                <Switch.Root checked={showAllColors} onCheckedChange={setShowAllColors} aria-label="Show all colors">
                                    <Switch.Thumb />
                                </Switch.Root>
                                All colors
                            </label>
                        </div>
                    </header>

                    <div className="grid gap-8 pb-24 lg:grid-cols-[11rem_minmax(0,1fr)]">
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
            <PlaygroundToolbar
                system={system}
                setSystem={setSystem}
                appearance={appearance}
                setAppearance={setPinnedAppearance}
                accent={accent}
                setAccent={setAccent}
                radius={radius}
                setRadius={setRadius}
                unstyled={unstyled}
                setUnstyled={setUnstyled}
            />
        </PlaygroundContext.Provider>
    )
}

export default PlaygroundShell
