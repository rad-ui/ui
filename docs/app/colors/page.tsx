import ColorTemplate from "@/components/ColorTemplate"

import FullHeightScroll from '@/components/layout/ScrollContainers/FullHeightScroll'
import generateSeoMetadata from "@/utils/seo/generateSeoMetadata"

export const metadata = generateSeoMetadata({
  title: "Colors - Rad UI",
  description: "Explore Rad UI color families, accessible token scales, and component specimens for React design systems.",
  keywords: [
    "Rad UI colors",
    "React color tokens",
    "accessible color scale",
    "design system colors",
    "UI color palette",
    "React theme colors",
  ],
  canonicalUrl: "https://www.rad-ui.com/colors",
  tags: ["Colors", "Design Tokens", "Theme", "React"],
})

export default function Home() {
  return (
   <FullHeightScroll fullWidth>
      <div className='w-full' >
         <ColorTemplate/>
      </div>
   </FullHeightScroll>
  )
}
