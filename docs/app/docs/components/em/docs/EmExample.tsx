import Em from "@radui/ui/Em"
import Text from "@radui/ui/Text"
import Card from "@radui/ui/Card"

const EmExample = () => {
    return (
        <Card className="text-gray-900 bg-gray-50">
            <Text>I have a dream of a scene between the green <Em className="text-gray-900">hills</Em>.</Text>
            <Text>Clouds pull away and the sunlight's <Em className="text-gray-900">revealed</Em>.</Text>
            <Text>People don't talk about keeping it <Em className="text-gray-900">real</Em>.</Text>
            <Text>It's understood that they actually <Em className="text-gray-900">will</Em>.</Text>
        </Card>
    )
}

export default EmExample;
