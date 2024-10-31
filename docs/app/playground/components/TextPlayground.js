
import ColorLooper from "../helpers/ColorLooper"

import Text from "@radui/ui/Text"
import Em from "@radui/ui/Em"

const Playground = () => (
    <div >

        <div className='mt-4 space-y-2'>
            <ColorLooper loop={false} title="Text">
                <div className='flex space-x-2'>
                    <Text className="text-gray-1000">And the time's come to realize there will be Promises I can't Keep </Text>
                </div>
            </ColorLooper>
        </div>
    </div>
);

export default Playground;