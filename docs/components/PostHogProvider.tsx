"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { useEffect, useState } from "react"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [postHogEnabled, setPostHogEnabled] = useState(true)
  
  // Early return if no API key - prevents any PostHog code from running
  const hasPostHogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY && 
                        process.env.NEXT_PUBLIC_POSTHOG_KEY.trim() !== '' &&
                        process.env.NEXT_PUBLIC_POSTHOG_KEY !== 'your_posthog_api_key_here'

  useEffect(() => {
    // Double check before initializing
    if (!hasPostHogKey) {
      return
    }

    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return
    }

    let requestCount = 0
    const maxFailedRequests = 3

    try {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
        ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
        defaults: '2025-05-24',
        capture_exceptions: false, // Disable to prevent error loops
        debug: false, // Disable debug mode to reduce noise
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") {
            console.log('PostHog loaded successfully')
          }
        },
        on_request_error: (failedRequest) => {
          requestCount++
          
          // If too many failed requests, disable PostHog completely
          if (requestCount >= maxFailedRequests) {
            setPostHogEnabled(false)
            if (process.env.NODE_ENV === "development") {
              console.warn('PostHog disabled due to repeated network failures')
            }
            return
          }
          
          // Silently handle network errors to prevent console spam
          if (process.env.NODE_ENV === "development") {
            console.warn('PostHog request failed (this is normal if API key is invalid):', 'Network error')
          }
        },
        // Disable automatic pageview capture to prevent errors
        capture_pageview: false,
        // Disable automatic session recording
        disable_session_recording: true
      })
    } catch (error) {
      console.error('PostHog initialization failed:', error)
      setPostHogEnabled(false)
    }
  }, [hasPostHogKey])

  // If no valid API key or PostHog is disabled, return children without PostHog provider
  if (!hasPostHogKey || !postHogEnabled) {
    return <>{children}</>
  }

  return <PHProvider client={posthog}>{children}</PHProvider>
}