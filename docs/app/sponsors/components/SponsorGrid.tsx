import SponsorCard from './SponsorCard'

interface Sponsor {
  name: string
  logo: string
  description: string
  websiteUrl: string
  logoAlt?: string
  logoWidth?: number
  logoHeight?: number
}

interface SponsorGridProps {
  sponsors: Sponsor[]
  className?: string
}

export default function SponsorGrid({ sponsors, className = "" }: SponsorGridProps) {
  return (
    <div className={`grid md:grid-cols-2 gap-8 mt-12 ${className}`}>
      {sponsors.map((sponsor, index) => (
        <SponsorCard
          key={`${sponsor.name}-${index}`}
          name={sponsor.name}
          logo={sponsor.logo}
          description={sponsor.description}
          websiteUrl={sponsor.websiteUrl}
          logoAlt={sponsor.logoAlt}
          logoWidth={sponsor.logoWidth}
          logoHeight={sponsor.logoHeight}
        />
      ))}
    </div>
  )
}
