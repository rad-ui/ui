
import { Inter } from 'next/font/google'
import Main from "../components/Main/Main"

import { cookies } from 'next/headers'
import { Analytics } from '@vercel/analytics/react';
import GoogleAnalytics from '../components/Analytics/GoogleAnalytics'
import { SpeedInsights } from "@vercel/speed-insights/next"

/** Don't change the order or all hell breaks loose */
import './globals.scss';
import "@radui/ui/themes/default.css";

export const metadata = {
  title: 'Rad UI | Modern React UI Library for accessible and fast web applications',
  description: 'Rad UI is a modern React UI Library for accessible and fast web applications',
}

export default function RootLayout({ children, ...props }) {

  const cookieStore = cookies()
  const darkModeSsrValue = cookieStore.get('darkMode')?.value || false

  return (
    <html lang="en">
      <body>
        <Main darkModeSsrValue={darkModeSsrValue}>
          {children}
        </Main>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
