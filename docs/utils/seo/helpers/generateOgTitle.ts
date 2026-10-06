const generateOgTitleUrl = (title: string, description: string, kicker?: string) => {
    const params = new URLSearchParams({ title, description })
    if (kicker) params.set("kicker", kicker)
    // www is canonical; some crawlers (WhatsApp, LinkedIn) drop images behind a redirect.
    return `https://www.rad-ui.com/og?${params.toString()}`
}

export default generateOgTitleUrl
