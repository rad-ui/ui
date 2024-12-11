
import ColorLooper from "../helpers/ColorLooper"

import BlockQuote from "@radui/ui/BlockQuote"
import Em from "@radui/ui/Em"

const Playground = () => (
    <div >

        <div className='mt-4 space-y-2'>
            <ColorLooper title="BlockQuote">
                <div className='flex space-x-2'>
                    <BlockQuote className="text-gray-1000">Hey, at least in my mind
                        I'm feeling like I'm the hero that saves me
                        There I hold my head high
                        Get everything right, delusional maybe
                        If I'm pretending, <Em>why not write happy endings? </Em>
                        Where I'm better than we both know I could be, oh
                        Still, at least in my mind
                        I'm feeling like I'm the hero that saves me</BlockQuote>
                </div>
            </ColorLooper>
        </div>
    </div>
);

export default Playground;