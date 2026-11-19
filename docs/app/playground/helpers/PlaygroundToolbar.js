'use client'

import React from "react"
import Theme from "@radui/ui/Theme"
import ToggleGroup from "@radui/ui/ToggleGroup"
import { ACCENT_COLORS } from "./PlaygroundContext"

export const SYSTEMS = { clarity: "Clarity", baremetal: "Baremetal" }

/** Radius presets as the Clarity radius tokens they override. */
export const RADII = {
    none: { label: "None", sm: "0px", md: "0px", lg: "0px", xl: "0px" },
    small: { label: "S", sm: "0.125rem", md: "0.25rem", lg: "0.375rem", xl: "0.5rem" },
    medium: { label: "M", sm: null, md: null, lg: null, xl: null },
    large: { label: "L", sm: "0.625rem", md: "0.875rem", lg: "1.125rem", xl: "1.5rem" }
}

const swatchClass = {
    gray: "bg-gray-900",
    blue: "bg-blue-900",
    green: "bg-green-900",
    red: "bg-red-900",
    plum: "bg-plum-900",
    gold: "bg-gold-900"
}

/** ToggleGroup reports arrays in some modes and strings in others. */
function firstValue(value) {
    if (Array.isArray(value)) return value[0]
    return typeof value === "string" && value ? value : undefined
}

function Group({ label, children }) {
    return (
        <div className="flex shrink-0 items-center gap-2">
            <span className="text-xs font-medium text-gray-950">{label}</span>
            {children}
        </div>
    )
}

const segment = "cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium text-gray-1000 outline-none hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-gray-1000 data-[state=on]:bg-gray-1000 data-[state=on]:text-gray-50"

function Segmented({ label, value, options, onChange }) {
    return (
        <ToggleGroup.Root
            type="single"
            value={[value]}
            onValueChange={(next) => {
                const v = firstValue(next)
                if (v) onChange(v)
            }}
            aria-label={label}
            className="flex items-center gap-0.5 rounded-lg border border-gray-300 bg-gray-100 p-0.5"
        >
            {Object.entries(options).map(([key, text]) => (
                <ToggleGroup.Item key={key} value={key} aria-label={`${label}: ${text}`} className={segment}>
                    {text}
                </ToggleGroup.Item>
            ))}
        </ToggleGroup.Root>
    )
}

/**
 * The floating bar of live controls: design system, light or dark, accent, radius and styles on or off. Every
 * change restyles the whole playground at once, open popovers and dialogs included.
 */
export default function PlaygroundToolbar({ system, setSystem, appearance, setAppearance, accent, setAccent, radius, setRadius, unstyled, setUnstyled }) {
    // The bar sits in a Theme with no class namespace, so neither Clarity nor Baremetal restyles the
    // controls that switch between them; Tailwind alone draws it.
    return (
        <Theme appearance={appearance} className="contents">
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-3">
            <div
                role="toolbar"
                aria-label="Playground theme"
                className="pointer-events-auto flex max-w-full items-center gap-x-5 gap-y-2 overflow-x-auto rounded-2xl border border-gray-400 bg-gray-50/95 px-4 py-2.5 shadow-[0_20px_60px_-25px_color-mix(in_oklab,var(--rad-ui-color-gray-1000)_55%,transparent)] backdrop-blur"
            >
                <Group label="Theme">
                    <Segmented label="Design system" value={system} options={SYSTEMS} onChange={setSystem} />
                </Group>
                <Group label="Mode">
                    <Segmented label="Appearance" value={appearance} options={{ light: "Light", dark: "Dark" }} onChange={setAppearance} />
                </Group>
                <Group label="Accent">
                    <ToggleGroup.Root
                        type="single"
                        value={[accent]}
                        onValueChange={(next) => {
                            const v = firstValue(next)
                            if (v) setAccent(v)
                        }}
                        aria-label="Accent color"
                        className="flex items-center gap-1"
                    >
                        {ACCENT_COLORS.map((color) => (
                            <ToggleGroup.Item
                                key={color}
                                value={color}
                                aria-label={color}
                                title={color}
                                className="grid size-6 cursor-pointer place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-gray-1000 data-[state=on]:ring-2 data-[state=on]:ring-gray-1000"
                            >
                                <span aria-hidden className={`size-[18px] rounded-full ${swatchClass[color]}`} />
                            </ToggleGroup.Item>
                        ))}
                    </ToggleGroup.Root>
                </Group>
                <Group label="Radius">
                    <Segmented
                        label="Radius"
                        value={radius}
                        options={Object.fromEntries(Object.entries(RADII).map(([k, r]) => [k, r.label]))}
                        onChange={setRadius}
                    />
                </Group>
                <Group label="Styles">
                    <Segmented label="Styles" value={unstyled ? "off" : "on"} options={{ on: "On", off: "Off" }} onChange={(v) => setUnstyled(v === "off")} />
                </Group>
            </div>
        </div>
        </Theme>
    )
}
