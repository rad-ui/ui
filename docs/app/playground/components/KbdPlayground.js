'use client'

import Kbd from "@radui/ui/Kbd"
import Text from "@radui/ui/Text"
import ColorLooper from "../helpers/ColorLooper"

const KbdPlayground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="Kbd"
            docsLink="/docs/components/kbd"
            description="Keyboard hint styling for shortcuts and command palettes."
        >
            <div className='space-y-3'>
                <Text className="text-gray-800">
                    Open search with <Kbd>Cmd</Kbd> + <Kbd>K</Kbd> and close dialogs with <Kbd>Esc</Kbd>.
                </Text>
                <div className='flex flex-wrap items-center gap-2'>
                    <Kbd>Shift</Kbd>
                    <Kbd>Tab</Kbd>
                    <Kbd>Enter</Kbd>
                    <Kbd>/</Kbd>
                </div>
            </div>
        </ColorLooper>
    </div>
)

export default KbdPlayground
