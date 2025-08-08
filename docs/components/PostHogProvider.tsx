"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { useEffect } from "react"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {

    // Only initialize PostHog if the API key is available
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      console.warn('PostHog API key not found. PostHog will not be initialized.')
      return
    }

    console.log('Initializing PostHog...')
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
      ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
      defaults: '2025-05-24',
      capture_exceptions: true, // This enables capturing exceptions using Error Tracking
      debug: process.env.NODE_ENV === "development",
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") {
          console.log('PostHog loaded successfully')
          posthog.capture('my event', { property: 'value' })
        }
      },
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}