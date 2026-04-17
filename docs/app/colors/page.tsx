import ColorTemplate from "@/components/ColorTemplate"

import FullHeightScroll from '@/components/layout/ScrollContainers/FullHeightScroll'

export default function Home() {
  return (
   <FullHeightScroll>
      <div className='w-full' >
         <ColorTemplate/>
      </div>
   </FullHeightScroll>
  )
}
