"use client";
import * as React from "react";
import Head from "next/head";
import { generateBreadcrumbStructuredData, generatePageBreadcrumbs } from "@/utils/seo/generateBreadcrumbData";

type TitleAndMetaTagsProps = {
	title?: string;
	description?: string;
	image?: string | null;
	url?: string;
	pathname?: string;
	keywords?: string[];
	canonicalUrl?: string;
	structuredData?: any;
};

export function PageDetails({
	title = "Rad UI",
	description = "Everything you need to build a design system, website or web app.",
	image,
	url = "https://rad-ui.com",
	pathname,
	keywords = [],
	canonicalUrl,
	structuredData
}: TitleAndMetaTagsProps) {

	const imageUrl = image
		? image.startsWith("http")
			? image
			: `${url}/social/${image}`
		: null;

	// Generate breadcrumb structured data if pathname is provided
	const breadcrumbData = pathname ? generateBreadcrumbStructuredData(
		generatePageBreadcrumbs(pathname, title)
	) : null;

	// Combine structured data
	const allStructuredData = [structuredData, breadcrumbData].filter(Boolean);

	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			
			{/* Keywords */}
			{keywords.length > 0 && (
				<meta name="keywords" content={keywords.join(', ')} />
			)}

			{/* Canonical URL */}
			{canonicalUrl && (
				<link rel="canonical" href={canonicalUrl} />
			)}

			{/* Open Graph */}
			<meta property="og:url" content={canonicalUrl || `${url}${pathname || ''}`} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			{imageUrl && <meta property="og:image" content={imageUrl} />}
			<meta property="og:type" content="article" />
			<meta property="og:site_name" content="Rad UI" />
			<meta property="og:locale" content="en_US" />

			{/* Twitter */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			{imageUrl && <meta name="twitter:image" content={imageUrl} />}
			<meta name="twitter:site" content="@rad_ui" />
			<meta name="twitter:creator" content="@rad_ui" />

			{/* Additional meta tags */}
			<meta name="author" content="Rad UI Team" />
			<meta name="robots" content="index, follow" />
			<meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
			<meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

			{/* Structured Data */}
			{allStructuredData.map((data, index) => (
				<script
					key={index}
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(data)
					}}
				/>
			))}

			{/* Article structured data for documentation pages */}
			{pathname && pathname.includes('/docs/') && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Article",
							"headline": title,
							"description": description,
							"url": canonicalUrl || `${url}${pathname}`,
							"author": {
								"@type": "Organization",
								"name": "Rad UI Team"
							},
							"publisher": {
								"@type": "Organization",
								"name": "Rad UI",
								"logo": {
									"@type": "ImageObject",
									"url": "https://www.rad-ui.com/logo.png"
								}
							},
							"mainEntityOfPage": {
								"@type": "WebPage",
								"@id": canonicalUrl || `${url}${pathname}`
							},
							"datePublished": new Date().toISOString(),
							"dateModified": new Date().toISOString(),
							"keywords": keywords.join(', '),
							"articleSection": "Documentation"
						})
					}}
				/>
			)}
		</Head>
	);
}

export default PageDetails;