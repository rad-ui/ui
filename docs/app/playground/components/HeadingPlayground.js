
import ColorLooper from "../helpers/ColorLooper"

import Heading from "@radui/ui/Heading"

const Playground = () => (
    <div >

        <div className='mt-4 space-y-2'>
            <ColorLooper loop={false} title="Heading">
                <div className='space-y-2 mb-8'>
                    <Heading className="text-gray-1000">Excuse me while I kiss the sky</Heading>
                    <Heading className="text-gray-950" as="h2">Sing a song of sixpence, pocket full of lies</Heading>
                    <Heading className="text-gray-1000" as="h3">Thinking I'm okay, but they're saying otherwise</Heading>
                    <Heading className="text-gray-950" as="h4">Tell me how I look but can't look me in the eyes</Heading>
                    <Heading className="text-gray-950" as="h5">Watching as I say this and then I do that</Heading>
                    <Heading className="text-gray-950" as="h6">Telling them the old words but in a new rap</Heading>
                </div>
            </ColorLooper>
        </div>
    </div>
);

export default Playground;