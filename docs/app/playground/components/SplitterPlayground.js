'use client'

import Splitter from "@radui/ui/Splitter"
import PlaygroundSection from "../helpers/PlaygroundSection"

const SplitterPlayground = () => (
    <div>
        <PlaygroundSection
            title="Splitter"
            docsLink="/docs/components/splitter"
            description="Resizable panels separated by a draggable, keyboard-accessible handle."
        >
            <div className="h-44 min-w-0">
                <Splitter.Root defaultSizes={[35, 65]}>
                    <Splitter.Panel index={0}><div className="h-full bg-gray-100 p-3">List</div></Splitter.Panel>
                    <Splitter.Handle index={0} />
                    <Splitter.Panel index={1}><div className="h-full bg-gray-50 p-3">Preview</div></Splitter.Panel>
                </Splitter.Root>
            </div>
        </PlaygroundSection>
    </div>
)

export default SplitterPlayground
