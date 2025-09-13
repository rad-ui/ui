import FullHeightScroll from '@/components/layout/ScrollContainers/FullHeightScroll'
import { 
  SponsorsHeader, 
  SponsorGrid, 
  BecomeSponsorCTA, 
  SponsorsFooter 
} from './components'
import { sponsors } from './data/sponsors'

export default function Sponsors() {
  return (
    <FullHeightScroll>
      <div className='lg:p-10 relative'>
        <div className="max-w-4xl mx-auto space-y-8">
          <SponsorsHeader />
          <SponsorGrid sponsors={sponsors} />
          <BecomeSponsorCTA />
          <SponsorsFooter />
        </div>
      </div>
    </FullHeightScroll>
  )
}