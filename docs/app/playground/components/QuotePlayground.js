
import ColorLooper from "../helpers/ColorLooper"

import Quote from "@radui/ui/Quote"

const Playground = () => (
    <div >

        <div className='mt-4 space-y-2'>
            <ColorLooper loop={false} title="Quote">
                <div className='flex space-x-2'>
                    <Quote className="text-gray-1000">And the time's come to realize there will be Promises I can't Keep</Quote>
                </div>
            </ColorLooper>
        </div>
    </div>
);

export default Playground;