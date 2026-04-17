import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"

interface SponsorsHeaderProps {
  className?: string
}

export default function SponsorsHeader({ className = "" }: SponsorsHeaderProps) {
  return (
    <div className={`text-center space-y-4 ${className}`}>
      <Heading as="h1" className="text-gray-1000 text-4xl font-bold">
        Our Sponsors
      </Heading>
      <Text className="text-gray-950 text-lg max-w-2xl mx-auto">
        We're grateful to our sponsors who help make Rad UI possible. Their support enables us to continue building and maintaining this open-source UI library.
      </Text>
    </div>
  )
}
