import Text from "@radui/ui/Text"

interface SponsorsFooterProps {
  className?: string
}

export default function SponsorsFooter({ className = "" }: SponsorsFooterProps) {
  return (
    <div className={`text-center pt-8 ${className}`}>
      <Text className="text-gray-950">
        Thank you to all our sponsors for supporting Rad UI and the open-source community.
      </Text>
    </div>
  )
}
