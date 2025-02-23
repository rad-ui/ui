import ColorTemplate from "@/components/ColorTemplate"

import FullHeightScroll from '@/components/layout/ScrollContainers/FullHeightScroll'
import Navigation from "@/components/navigation/Navigation"
export default function Home() {
  return (
   <FullHeightScroll>
      <Navigation hideOnDesktop={true} />
      <div className='w-full' >
         <ColorTemplate/>
      </div>
   </FullHeightScroll>
  )
}
