"use client";
import * as React from "react";
import Head from "next/head";


type TitleAndMetaTagsProps = {
	title?: string;
	description?: string;
	image?: string | null;
	url?: string;
	pathname?: string;
};

export function PageDetails({
	title = "Radix UI",
	description = "Everything you need to build a design system, website or web app.",
	image,
	url = "https://radix-ui.com",
	pathname,
}: TitleAndMetaTagsProps) {


	const imageUrl = image
		? image.startsWith("http")
			? image
			: `${url}/social/${image}`
		: null;
	// const path = pathname || router.pathname;

	return (
		<Head>
			<title>{title}</title>

			<meta name="description" content={description} />

			{/* <meta property="og:url" content={`${url}${path}`} /> */}
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			{imageUrl && <meta property="og:image" content={imageUrl} />}

			<meta name="twitter:site" content="@radix_ui" />
			<meta name="twitter:card" content="summary_large_image" />
		</Head>
	);
}


export default PageDetails;