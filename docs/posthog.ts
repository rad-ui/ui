import { PostHog } from "posthog-node"

// NOTE: This is a Node.js client, so you can use it for sending events from the server side to PostHog.
export default function PostHogClient() {
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    console.warn('PostHog API key not found. PostHog client will not be created.')
    return null
  }

  const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
    flushAt: 1,
    flushInterval: 0,
  })
  return posthogClient
}