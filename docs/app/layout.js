import { Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import Main from "../components/Main/Main"
import { siteOpenGraph, siteTwitter } from "@/utils/seo/siteSocial"

import { Analytics } from '@vercel/analytics/react';
import GoogleAnalytics from '../components/Analytics/GoogleAnalytics'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { PostHogProvider } from "../components/PostHogProvider"

/** Don't change the order or all hell breaks loose */
import './globals.css';
import "@radui/ui/themes/default.css";
import "./dark-surfaces.css";

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.rad-ui.com/#organization",
      "name": "Rad UI",
      "url": "https://www.rad-ui.com",
      "sameAs": [
        "https://github.com/rad-ui/ui",
        "https://www.npmjs.com/package/@radui/ui"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.rad-ui.com/#website",
      "name": "Rad UI",
      "url": "https://www.rad-ui.com",
      "publisher": {
        "@id": "https://www.rad-ui.com/#organization"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.rad-ui.com/#software",
      "name": "Rad UI",
      "alternateName": "@radui/ui",
      "description": "Modern React UI Library for Accessible Web Applications",
      "url": "https://www.rad-ui.com",
      "applicationCategory": "DeveloperApplication",
      "applicationSubCategory": "Component Library",
      "operatingSystem": "Web",
      "programmingLanguage": "TypeScript",
      "author": {
        "@id": "https://www.rad-ui.com/#organization"
      },
      "publisher": {
        "@id": "https://www.rad-ui.com/#organization"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "license": "https://github.com/rad-ui/ui/blob/main/LICENSE",
      "codeRepository": "https://github.com/rad-ui/ui",
      "softwareRequirements": "React",
      "featureList": [
        "Headless, unstyled React components",
        "WCAG-compliant accessible primitives",
        "TypeScript-first API",
        "Composable and tree-shakeable",
        "Optional theme CSS and design-token scales"
      ],
      "keywords": "React, Headless UI, UI Library, TypeScript, Accessibility, Design System, Component Library"
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://github.com/rad-ui/ui#source",
      "name": "Rad UI source code",
      "codeRepository": "https://github.com/rad-ui/ui",
      "programmingLanguage": "TypeScript",
      "runtimePlatform": "React",
      "license": "https://github.com/rad-ui/ui/blob/main/LICENSE",
      "targetProduct": {
        "@id": "https://www.rad-ui.com/#software"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.rad-ui.com/docs/first-steps/introduction#docs",
      "name": "Rad UI Documentation",
      "url": "https://www.rad-ui.com/docs/first-steps/introduction",
      "isPartOf": {
        "@id": "https://www.rad-ui.com/#website"
      },
      "about": {
        "@id": "https://www.rad-ui.com/#software"
      }
    }
  ]
}

export const metadata = {
  metadataBase: new URL('https://www.rad-ui.com'),
  title: {
    default: 'Rad UI | Modern React UI Library for Accessible Web Applications',
    template: '%s | Rad UI'
  },
  description: 'Rad UI is a modern React UI Library for accessible and fast web applications. Built with TypeScript, offering headless and unstyled components for maximum flexibility.',
  keywords: [
    'React UI library',
    'headless UI components', 
    'accessible React components',
    'TypeScript UI library',
    'React design system',
    'web accessibility',
    'WCAG compliant components',
    'React component library',
    'frontend development',
    'UI framework'
  ],
  authors: [{ name: 'Rad UI Team' }],
  creator: 'Rad UI Team',
  publisher: 'Rad UI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.rad-ui.com',
  },
  openGraph: siteOpenGraph,
  twitter: siteTwitter,
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Rad UI',
    'application-name': 'Rad UI',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  }
}

export default async function RootLayout({ children, ...props }) {

  return (
    <html lang="en" className={`${instrumentSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </head>
      <body className="h-screen overflow-hidden" suppressHydrationWarning>
        <PostHogProvider>
          <Main>
            {children}
          </Main>
          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics />
        </PostHogProvider>
      </body>
    </html>
  )
}
