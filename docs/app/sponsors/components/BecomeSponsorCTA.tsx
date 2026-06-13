import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"
import Link from "@radui/ui/Link"

interface BecomeSponsorCTAProps {
  className?: string
}

export default function BecomeSponsorCTA({ className = "" }: BecomeSponsorCTAProps) {
  return (
    <div className={`bg-gradient-to-b from-gray-50 to-green-200 rounded-lg p-8 border border-gray-700 text-center mt-12 ${className}`}>
      <Heading as="h2" className="text-gray-1000 mb-4">
        Become a Sponsor
      </Heading>
      <Text className="text-gray-950 mb-6 max-w-2xl mx-auto">
        Interested in supporting Rad UI? We're always looking for sponsors who share our vision 
        of building accessible, high-quality React components for the developer community.
      </Text>
      <div className="space-x-4">
        <Link 
          href="https://github.com/sponsors/rad-ui" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Sponsor on GitHub
        </Link>
        <Link 
          href="mailto:sponsors@rad-ui.com"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}
