'use client'
import { useState } from 'react'
import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"
import Button from "@radui/ui/Button"
import Badge from "@radui/ui/Badge"
import Image from 'next/image'
import Card from "@radui/ui/Card"

const SponsorsSection = () => {
  const [hoveredSponsor, setHoveredSponsor] = useState(null)

  const sponsors = [
    {
      name: "CodeRabbit",
      logoSrc: "/sponsorship/code_rabbit_light.png",
      alt: "CodeRabbit",
      description: "AI-powered code review assistant",
      website: "https://coderabbit.ai/"
    },
    {
      name: "BrowserStack",
      logoSrc: "/sponsorship/browserstack_light.png", 
      alt: "BrowserStack",
      description: "Cross-browser testing platform",
      website: "https://www.browserstack.com/"
    }
  ]

  const handleSponsorClick = (website) => {
    window.open(website, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-green-100 rounded-2xl p-8 border border-gray-200 space-y-6 mb-12">
      <div className="text-center space-y-4">
        <Badge color="green" className="mb-4">Community</Badge>
        <Heading as="h2" className="text-gray-1000">Our Sponsors</Heading>
        <Text className="text-gray-950 max-w-2xl mx-auto">
          We're grateful to our sponsors who help make Rad UI possible. Their support enables us to continue building and maintaining this open-source UI library.
        </Text>
      </div>
      
      <div className="flex justify-center items-center gap-12 flex-wrap">
        {sponsors.map((sponsor) => (
          <Card 
            key={sponsor.name}
            className={`p-6 cursor-pointer`}
            onMouseEnter={() => setHoveredSponsor(sponsor.name)}
            onMouseLeave={() => setHoveredSponsor(null)}
            onClick={() => handleSponsorClick(sponsor.website)}
          >
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Image
                  src={sponsor.logoSrc}
                  alt={sponsor.alt}
                  width={140}
                  height={56}
                  className="object-contain"
                />
              </div>
              <div>
                <Text className="font-semibold text-gray-1000">{sponsor.name}</Text>
                <Text className="text-sm text-gray-950">{sponsor.description}</Text>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button 
          variant="outline" 
          color="green"
          onClick={() => window.location.href = '/sponsors'}
          className=""
        >
          View all sponsors
        </Button>
      </div>
    </div>
  )
}

export default SponsorsSection
