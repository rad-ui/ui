import { redirect } from "next/navigation"

import showcaseDemos from "./showcaseDemos"

// `/showcase` has no gallery of its own; send visitors to the first demo.
const ShowcaseIndexPage = () => {
    redirect(showcaseDemos[0].href)
}

export default ShowcaseIndexPage
