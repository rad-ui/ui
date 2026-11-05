'use client'
import { createContext, useContext } from 'react'

export type DocsPageInfo = {
    /** Page title as written in the MDX, e.g. "Dialog". */
    title: string
    /** "Component" for component pages; anything else for guides. */
    eyebrow: string
}

const DocsPageContext = createContext<DocsPageInfo>({ title: '', eyebrow: '' })

export const DocsPageProvider = DocsPageContext.Provider
export const useDocsPage = () => useContext(DocsPageContext)
