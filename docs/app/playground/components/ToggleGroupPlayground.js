'use client'

import { Bold, Italic, Underline } from "lucide-react"
import ToggleGroup from "@radui/ui/ToggleGroup"
import ColorLooper from "../helpers/ColorLooper"

const ToggleGroupPlayground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="ToggleGroup"
            docsLink="/docs/components/toggle-group"
            description="Related toggle controls grouped for multi-select or single-select formatting patterns."
        >
            <ToggleGroup.Root type="multiple" defaultValue={["bold"]}>
                <ToggleGroup.Item value="bold" aria-label="Bold" iconOnly>
                    <Bold size={16} />
                </ToggleGroup.Item>
                <ToggleGroup.Item value="italic" aria-label="Italic" iconOnly>
                    <Italic size={16} />
                </ToggleGroup.Item>
                <ToggleGroup.Item value="underline" aria-label="Underline" iconOnly>
                    <Underline size={16} />
                </ToggleGroup.Item>
            </ToggleGroup.Root>
        </ColorLooper>
    </div>
)

export default ToggleGroupPlayground
