import { Inter } from 'next/font/google'
import Main from "../components/Main/Main"

import { cookies } from 'next/headers'
import { Analytics } from '@vercel/analytics/react';
import GoogleAnalytics from '../components/Analytics/GoogleAnalytics'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { PostHogProvider } from "../components/PostHogProvider"

/** Don't change the order or all hell breaks loose */
import './globals.scss';
import "@radui/ui/themes/default.css";

const inter = Inter({ subsets: ['latin'] })

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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.rad-ui.com',
    siteName: 'Rad UI',
    title: 'Rad UI | Modern React UI Library for Accessible Web Applications',
    description: 'Rad UI is a modern React UI Library for accessible and fast web applications. Built with TypeScript, offering headless and unstyled components for maximum flexibility.',
    images: [
      {
        url: 'https://www.rad-ui.com/og?title=Rad%20UI&description=Modern%20React%20UI%20Library%20for%20Accessible%20Web%20Applications',
        width: 1200,
        height: 630,
        alt: 'Rad UI - Modern React UI Library',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rad UI | Modern React UI Library for Accessible Web Applications',
    description: 'Rad UI is a modern React UI Library for accessible and fast web applications. Built with TypeScript, offering headless and unstyled components for maximum flexibility.',
    images: ['https://www.rad-ui.com/og?title=Rad%20UI&description=Modern%20React%20UI%20Library%20for%20Accessible%20Web%20Applications'],
    creator: '@rad_ui',
    site: '@rad_ui',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  other: {
    'theme-color': '#000000',
    'color-scheme': 'dark light',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Rad UI',
    'application-name': 'Rad UI',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  }
}

export default async function RootLayout({ children, ...props }) {

  const cookieStore = await cookies()
  const darkModeSsrValue = cookieStore.get('darkMode')?.value || false

  return (
    <html lang="en" className={inter.className}>
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Rad UI",
              "description": "Modern React UI Library for Accessible Web Applications",
              "url": "https://www.rad-ui.com",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web",
              "programmingLanguage": "TypeScript",
              "author": {
                "@type": "Organization",
                "name": "Rad UI Team"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "license": "https://github.com/rad-ui/ui/blob/main/LICENSE",
              "codeRepository": "https://github.com/rad-ui/ui",
              "keywords": "React, UI Library, TypeScript, Accessibility, Design System"
            })
          }}
        />
      </head>
      <body className="h-screen overflow-hidden">
        <PostHogProvider>
          <Main darkModeSsrValue={darkModeSsrValue}>
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