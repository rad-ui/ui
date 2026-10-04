"use client"

import { useMemo, useRef } from "react"
// `~` is a webpack alias to ../src (next.config.mjs), so this is the same context instance
// the source-aliased components read. Kept in .js so tsc doesn't pull src types into docs.
import ThemeContext from "~/components/ui/Theme/ThemeContext"

/**
 * Components aliased to library source in next.config.mjs (Toast, TextField, Fieldset, …)
 * read the source ThemeContext, not the published package's, so the docs <Theme> is invisible
 * to them. Bridge the two: provide the same `rad-ui` class namespace, and a portal root that
 * lives inside the Theme container so portaled content (toasts) inherits light/dark tokens.
 * Render this inside the docs <Theme>.
 */
export function SourceClassNamespaceProvider({ children }) {
  const containerRef = useRef(null)
  const portalRootRef = useRef(null)
  const value = useMemo(() => ({ containerRef, portalRootRef, classNamespace: "rad-ui" }), [])

  return (
    <ThemeContext.Provider value={value}>
      {children}
      <div ref={portalRootRef} data-rad-ui-portal-root="" />
    </ThemeContext.Provider>
  )
}
