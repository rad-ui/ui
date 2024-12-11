
import ColorLooper from "../helpers/ColorLooper"

import Link from "@radui/ui/Link"
import Text from "@radui/ui/Text"

const Playground = () => (
    <div >

        <div className='mt-4 space-y-2'>
            <ColorLooper loop={true} title="Link">
                <div >
                    <Text>Linkin Park returned to the recording studios in 2006 to work on new material. To produce the album, the band chose producer <Link>Rick Rubin</Link>. Despite initially stating the album would debut sometime in 2006, the album was delayed until 2007.</Text>

                </div>
            </ColorLooper>
        </div>
    </div>
);

export default Playground;