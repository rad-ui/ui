
import ColorLooper from "../helpers/ColorLooper"

import Heading from "@radui/ui/Heading"
import Separator from "@radui/ui/Separator"
import Text from "@radui/ui/Text"
import Em from "@radui/ui/Em"

const Playground = () => (
    <div >

        <div className='mt-4 space-y-2'>
            <ColorLooper loop={false} title="Separator">
                <div className='space-y-2 mb-8 bg-gray-200 py-4 px-4 rounded-md  shadow'>
                    <Heading className="text-gray-1000 flex space-x-2" as="h6"><span>Linkin Park</span><Separator orientation="vertical" /> <Em className="text-gray-900 font-light">Meteora</Em></Heading>
                    <Separator />
                    <img width="320" src="https://cdn.mos.cms.futurecdn.net/3DwQ9MW53hnVgE2U6BJQJS.jpg" />
                    <Separator />
                    <div className='flex'>
                        <Text className="text-gray-1000">Nobody's Listening</Text>
                        <Separator orientation="vertical" />
                        <Text>Linkin Park</Text>
                        <Separator orientation="vertical" />
                        <Text><Em>2003</Em></Text>
                    </div>
                </div>
            </ColorLooper>
        </div>
    </div>
);

export default Playground;