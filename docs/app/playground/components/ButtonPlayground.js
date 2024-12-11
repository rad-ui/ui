
import ColorLooper from "../helpers/ColorLooper"

import Button from "@radui/ui/Button"

const Playground = () => (
    <div >

        <div className='mt-4 space-y-2'>
            <ColorLooper title="Buttons">
                <div className='flex space-x-2'>
                    <Button variant="solid">Button</Button>
                    <Button variant="outline">Button</Button>
                    <Button variant="soft">Button</Button>
                    <Button variant="ghost">Button</Button>
                </div>
            </ColorLooper>

        </div>
    </div>
);

export default Playground;