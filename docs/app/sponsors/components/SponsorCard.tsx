import Card from "@radui/ui/Card"
import Text from "@radui/ui/Text"
import Link from "@radui/ui/Link"
import Image from 'next/image'

interface SponsorCardProps {
  name: string
  logo: string
  description: string
  websiteUrl: string
  logoAlt?: string
  logoWidth?: number
  logoHeight?: number
}

export default function SponsorCard({
  name,
  logo,
  description,
  websiteUrl,
  logoAlt,
  logoWidth = 200,
  logoHeight = 80
}: SponsorCardProps) {
  return (
    <Card className="text-center !bg-white">
      <div className="p-10 space-y-4">
      <div className="flex justify-center space-y-4">
        <Image
          src={logo}
          alt={logoAlt || name}
          width={logoWidth}
          height={logoHeight}
          className="object-contain"
        />
      </div>
      <div className="space-y-3">
        <Text className="text-gray-950">
          {description}
        </Text>
        <div className="pt-2">
          <Link 
            href={websiteUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Visit {name} →
          </Link>
        </div>
      </div>
      </div>
    </Card>
  )
}
