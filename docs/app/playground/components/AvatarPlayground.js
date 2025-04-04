
import ColorLooper from "../helpers/ColorLooper"
import Avatar from "@radui/ui/Avatar"

const Playground = () => (
    <div >

        <div className='mt-4 space-y-2'>
            <ColorLooper title="Avatar">
                <div className='flex space-x-2'>
                    <Avatar fallback="RU" />
                    <Avatar src="https://i.pravatar.cc/64" fallback="AN" />
                    <Avatar fallback="AB" />
                    <Avatar fallback="MS" />
                    <Avatar fallback="CB" />
                </div>
            </ColorLooper>
        </div>
    </div>
);

export default Playground;