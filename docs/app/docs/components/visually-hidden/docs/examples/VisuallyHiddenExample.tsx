import Button from "@radui/ui/Button"
import Card from "@radui/ui/Card"
import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"
import VisuallyHidden from "@radui/ui/VisuallyHidden"

const iconStyle = {
    fontSize: "18px",
    lineHeight: 1
}

const VisuallyHiddenExample = () => {
    return (
        <Card className="w-full max-w-xl bg-gray-50 text-gray-1000">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <Heading as="h3" className="mb-1 text-base">
                        Icon-only actions
                    </Heading>
                    <Text className="text-sm text-gray-800">
                        Each control has a hidden text label for screen readers.
                    </Text>
                </div>

                <div className="flex items-center gap-2">
                    <Button>
                        <VisuallyHidden>Search documentation</VisuallyHidden>
                        <span aria-hidden="true" style={iconStyle}>⌕</span>
                    </Button>
                    <Button>
                        <VisuallyHidden>Share this page</VisuallyHidden>
                        <span aria-hidden="true" style={iconStyle}>↗</span>
                    </Button>
                    <Button>
                        <VisuallyHidden>Bookmark this page</VisuallyHidden>
                        <span aria-hidden="true" style={iconStyle}>★</span>
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default VisuallyHiddenExample
