
import ColorLooper from "../helpers/ColorLooper"

import Code from "@radui/ui/Code"

const Playground = () => (
    <div >

        <div className='mt-4 space-y-2'>
            <ColorLooper title="Code">
                <div className='flex space-x-2'>
                    <Code>getServerProperties()</Code>
                </div>
            </ColorLooper>
        </div>
    </div>
);

export default Playground;