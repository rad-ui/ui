
import ColorLooper from "../helpers/ColorLooper"

import Text from "@radui/ui/Text"
import Em from "@radui/ui/Em"

const Playground = () => (
    <div >

        <div className='mt-4 space-y-2'>
            <ColorLooper loop={false} title="Em">
                <div className='flex space-x-2'>
                    <Text className="text-gray-1000">And the time's come to realize there will be <Em className="text-gray-900">Promises I can't Keep</Em> </Text>
                </div>
            </ColorLooper>
        </div>
    </div>
);

export default Playground;