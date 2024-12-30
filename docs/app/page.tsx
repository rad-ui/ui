// 'use client'

export const metadata = {
  title: "Rad UI",
  description: "Rad UI is a component library for React and Next.js",
}

import HeroSection from './landingComponents/HeroSection'
import LandingBgPattern from '@/components/Backgrounds/LandingBgPattern'

import MusicAppPlayerDemo from './landingComponents/MusicAppPlayerDemo'
import ToolbarDemo from './landingComponents/ToolbarDemo'
import AddToCartDemo from './landingComponents/AddToCartDemo'
import YourTeamDemo from './landingComponents/YourTeamDemo'
import TrafficAnalyticsDemo from './landingComponents/TrafficAnalyticsDemo'




export default function Home() {
  return (
    <div className='h-screen'>
      <LandingBgPattern />
      <div className='lg:p-10 flex flex-col overflow-scroll'>
        <HeroSection />
        {/*  */}
        <div className='text-gray-1000 p-10 mt-10 flex space-x-4 w-full overflow-x-auto relative z-10'>
          <div>
            <MusicAppPlayerDemo />
          </div>
          <div className='flex-1 space-y-4'>
            {/* Wide stuff here */}
            <ToolbarDemo />
            <div>
              <AddToCartDemo />
            </div>
            <div className='flex w-full space-x-4'>
              <div className='flex-1'>
                <YourTeamDemo />
              </div>
              <div className='flex-1'>
                <TrafficAnalyticsDemo />
              </div>
            </div>
          </div>

        </div>
        {/*  */}
      </div>
    </div>
  )
}
