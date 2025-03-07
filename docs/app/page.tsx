// 'use client'

export const metadata = {
  title: "Rad UI",
  description: "Rad UI is a component library for React and Next.js",
}

import HeroSection from './landingComponents/HeroSection'


import FullHeightScroll from '@/components/layout/ScrollContainers/FullHeightScroll'



import YourTeamDemo from './landingComponents/YourTeamDemo'
import TrafficAnalyticsDemo from './landingComponents/TrafficAnalyticsDemo'




export default function Home() {
  return (
      <FullHeightScroll >
      <div className='lg:p-10 relative'>
        <HeroSection />
      </div>
    </FullHeightScroll>
  )
}
