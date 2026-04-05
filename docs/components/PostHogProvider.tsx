"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { useEffect } from "react"

const postHogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim()
const hasPostHogKey =
  typeof postHogKey === "string" &&
  postHogKey.length > 0 &&
  postHogKey !== "your_posthog_api_key_here"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!hasPostHogKey) {
      return
    }

    posthog.init(postHogKey, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
      ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
      defaults: "2025-05-24",
      autocapture: false,
      capture_exceptions: true,
      debug: false,
    })
  }, [])

  if (!hasPostHogKey) {
    return <>{children}</>
  }

  return <PHProvider client={posthog}>{children}</PHProvider>
}
