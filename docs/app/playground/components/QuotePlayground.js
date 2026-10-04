
import PlaygroundSection from "../helpers/PlaygroundSection"

import Quote from "@radui/ui/Quote"

const Playground = () => (
    <div >

        <div>
            <PlaygroundSection title="Quote">
                <div className='flex space-x-2'>
                    <Quote className="text-gray-1000">And the time's come to realize there will be Promises I can't Keep</Quote>
                </div>
            </PlaygroundSection>
        </div>
    </div>
);

export default Playground;