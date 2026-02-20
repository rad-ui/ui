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

    // Suppress PostHog script loading errors
    const originalError = typeof window !== 'undefined' ? window.console.error : console.error
    const errorHandler = (...args: any[]) => {
      const errorMessage = args[0]?.toString() || ''
      if (errorMessage.includes('[PostHog.js]') && errorMessage.includes('failed to load script')) {
        // Silently ignore PostHog script loading errors
        return
      }
      originalError.apply(console, args)
    }
    
    if (typeof window !== 'undefined') {
      window.console.error = errorHandler
    }

    try {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
        ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
        defaults: '2025-05-24',
        autocapture: false,
        capture_exceptions: true,
        debug: process.env.NODE_ENV === "development",
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") {
            console.log('PostHog loaded successfully')
            posthog.capture('my event', { property: 'value' })
          }
        },
        on_request_error: (failedRequest) => {
          if (process.env.NODE_ENV === "development") {
            console.warn('PostHog request failed:', failedRequest)
          }
        }
      })
    } catch (error) {
      console.error('PostHog initialization failed:', error)
    }
    
    return () => {
      // Restore original console.error on cleanup
      if (typeof window !== 'undefined') {
        window.console.error = originalError
      }
    }
  }, [hasPostHogKey])

  // If no valid API key, return children without PostHog provider
  if (!hasPostHogKey) {
    return <>{children}</>
  }

  return <PHProvider client={posthog}>{children}</PHProvider>
}