const generateOgTitleUrl = (title: string, description: string) => {
    const encodedTitle = encodeURIComponent(title)
    const encodedDescription = encodeURIComponent(description)
    return `https://rad-ui.com/og?title=${encodedTitle}&description=${encodedDescription}`
}

export default generateOgTitleUrl

