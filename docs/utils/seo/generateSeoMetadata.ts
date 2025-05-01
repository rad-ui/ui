import generateOgTitleUrl from "./helpers/generateOgTitle"

const generateSeoMetadata = ({title, description, keywords}: {title: string, description: string, keywords?: string[]}) => {
    const imageUrl = generateOgTitleUrl(title, description)

    return {
        title: title,
        description,
        keywords,
        openGraph: {
            title,
            description,
            images: [
                { url: imageUrl },
            ],
            siteName: "Rad UI",
            type: "website"
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
            creator: "rad-ui.com",
        },
    }
}

export default generateSeoMetadata
