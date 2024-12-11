
import ColorLooper from "../helpers/ColorLooper"

import Badge from "@radui/ui/Badge"

const Playground = () => (
    <div >

        <div className='mt-4 space-y-2'>
            <ColorLooper title="Badge" inline={true}>
                <div className='flex space-x-2'>
                    <Badge>Passing</Badge>
                </div>
            </ColorLooper>
        </div>
    </div>
);

export default Playground;