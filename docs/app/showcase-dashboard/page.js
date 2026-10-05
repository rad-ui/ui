import { permanentRedirect } from "next/navigation"

// Legacy route. The dashboard demo now lives inside the showcase shell,
// alongside the other demos, at /showcase/dashboard.
const ShowcaseDashboardPage = () => {
    permanentRedirect("/showcase/dashboard")
}

export default ShowcaseDashboardPage
