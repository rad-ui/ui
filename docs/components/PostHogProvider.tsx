"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { useEffect } from "react"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  // Early return if no API key - prevents any PostHog code from running
  const hasPostHogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY && 
                        process.env.NEXT_PUBLIC_POSTHOG_KEY.trim() !== '' &&
                        process.env.NEXT_PUBLIC_POSTHOG_KEY !== 'your_posthog_api_key_here'

  useEffect(() => {
    // Double check before initializing
    if (!hasPostHogKey) {
      return
    }

    try {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
        ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
        defaults: '2025-05-24',
        capture_exceptions: true,
        debug: process.env.NODE_ENV === "development",
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") {
            console.log('PostHog loaded successfully')
            posthog.capture('my event', { property: 'value' })
          }
        },
        on_xhr_error: (failedRequest) => {
          if (process.env.NODE_ENV === "development") {
            console.warn('PostHog request failed:', failedRequest)
          }
        }
      })
    } catch (error) {
      console.error('PostHog initialization failed:', error)
    }
  }, [hasPostHogKey])

  // If no valid API key, return children without PostHog provider
  if (!hasPostHogKey) {
    return <>{children}</>
  }

  return <PHProvider client={posthog}>{children}</PHProvider>
}