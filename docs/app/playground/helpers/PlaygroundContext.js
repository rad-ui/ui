'use client'

import React from "react"

export const ACCENT_COLORS = ["gray", "blue", "green", "red", "plum", "gold"]

export const PlaygroundContext = React.createContext({
    accent: "gray",
    showAllColors: false
})

export const usePlayground = () => React.useContext(PlaygroundContext)

export const toSectionId = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
