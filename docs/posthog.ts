import { PostHog } from "posthog-node"

const postHogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim()

// NOTE: This is a Node.js client, so you can use it for sending events from the server side to PostHog.
export default function PostHogClient() {
  if (!postHogKey || postHogKey === "your_posthog_api_key_here") {
    return null
  }

  const posthogClient = new PostHog(postHogKey, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.posthog.com",
    flushAt: 1,
    flushInterval: 0,
  })
  return posthogClient
}
