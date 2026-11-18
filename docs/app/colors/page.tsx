import ColorTemplate from "@/components/ColorTemplate"

import FullHeightScroll from '@/components/layout/ScrollContainers/FullHeightScroll'
import generateSeoMetadata from "@/utils/seo/generateSeoMetadata"

export const metadata = generateSeoMetadata({
  title: "Colors: 31 color palettes with hex codes",
  description: "31 color palettes with 12 shades each, in light and dark mode. Copy any hex code, use them as CSS variables or Tailwind classes, and keep text readable.",
  keywords: [
    "Rad UI colors",
    "rad colors",
    "color palette hex codes",
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
