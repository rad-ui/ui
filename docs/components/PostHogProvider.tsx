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

    // Suppress PostHog script loading errors and fetch errors
    const originalError = typeof window !== 'undefined' ? window.console.error : console.error
    const errorHandler = (...args: any[]) => {
      const errorMessage = args[0]?.toString() || ''
      const stackTrace = args.join(' ') || ''
      const fullMessage = (errorMessage + ' ' + stackTrace).toLowerCase()
      
      // Check if this is a PostHog-related fetch error
      // Be more lenient with pattern matching to catch all variations
      const isPostHogError = 
        (errorMessage.includes('[PostHog.js]') && errorMessage.includes('failed to load script')) ||
        (fullMessage.includes('failed to fetch') && (fullMessage.includes('posthog') || fullMessage.includes('posthog-js') || fullMessage.includes('posthog.com'))) ||
        (errorMessage.includes('TypeError') && errorMessage.includes('Failed to fetch') && (stackTrace.includes('posthog') || stackTrace.includes('posthog-js'))) ||
        // Catch fetch errors from PostHog module (webpack-internal path includes posthog-js)
        (errorMessage.includes('TypeError') && errorMessage.includes('Failed to fetch') && stackTrace.includes('webpack-internal') && stackTrace.includes('posthog-js')) ||
        // Catch any TypeError: Failed to fetch that occurs during PostHog initialization
        (errorMessage.includes('TypeError') && errorMessage.includes('Failed to fetch') && stackTrace.includes('PostHogProvider'))
      
      if (isPostHogError) {
        // Silently ignore PostHog script loading and fetch errors
        return
      }
      originalError.apply(console, args)
    }
    
    if (typeof window !== 'undefined') {
      window.console.error = errorHandler
    }

    // Suppress unhandled promise rejections from PostHog
    const unhandledRejectionHandler = (event: PromiseRejectionEvent) => {
      const reason = event.reason?.toString() || ''
      const stack = event.reason?.stack || ''
      const fullError = reason + ' ' + stack
      
      // Catch PostHog-related fetch errors in promise rejections
      const lowerError = fullError.toLowerCase()
      if (
        (lowerError.includes('failed to fetch') && (lowerError.includes('posthog') || lowerError.includes('posthog-js') || lowerError.includes('posthog.com'))) ||
        (lowerError.includes('posthog') || lowerError.includes('posthog-js')) ||
        // Catch fetch errors from PostHog module (webpack-internal path includes posthog-js)
        (lowerError.includes('typeerror') && lowerError.includes('failed to fetch') && lowerError.includes('webpack-internal') && lowerError.includes('posthog-js')) ||
        // Catch any fetch error during PostHog initialization
        (lowerError.includes('typeerror') && lowerError.includes('failed to fetch') && fullError.includes('PostHogProvider'))
      ) {
        event.preventDefault()
        return
      }
    }
    
    if (typeof window !== 'undefined') {
      window.addEventListener('unhandledrejection', unhandledRejectionHandler)
    }

    // Initialize PostHog with error handling
    // Use setTimeout to ensure error handlers are fully set up
    const initTimeout = setTimeout(() => {
      try {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
          ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
          defaults: '2025-05-24',
          autocapture: false,
          capture_exceptions: false, // Disable exception capture to prevent error loops
          debug: process.env.NODE_ENV === "development",
          // Completely disable feature flags to prevent fetch errors
          disable_feature_flags: true,
          loaded: (posthog) => {
            if (process.env.NODE_ENV === "development") {
              console.log('PostHog loaded successfully')
            }
          },
          on_request_error: (failedRequest) => {
            // Silently handle request errors to prevent console noise
            if (process.env.NODE_ENV === "development") {
              console.warn('PostHog request failed:', failedRequest)
            }
          },
          // Add fetch error handling
          request_batching: false,
        })
      } catch (error) {
        // Silently handle initialization errors
        if (process.env.NODE_ENV === "development") {
          console.error('PostHog initialization failed:', error)
        }
      }
    }, 0)
    
    return () => {
      clearTimeout(initTimeout)
      // Restore original handlers on cleanup
      if (typeof window !== 'undefined') {
        window.console.error = originalError
        window.removeEventListener('unhandledrejection', unhandledRejectionHandler)
      }
    }
  }, [hasPostHogKey])

  // If no valid API key, return children without PostHog provider
  if (!hasPostHogKey) {
    return <>{children}</>
  }

  // Always wrap with PHProvider - PostHog handles errors internally
  return <PHProvider client={posthog}>{children}</PHProvider>
}