'use client'

import Switch from "@radui/ui/Switch"
import ColorLooper from "../helpers/ColorLooper"

const SwitchPlayground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="Switch"
            docsLink="/docs/components/switch"
            description="Binary settings control with thumb and track subcomponents."
        >
            <div className='flex flex-col gap-4'>
                <label className="inline-flex items-center gap-3 text-sm font-medium text-gray-900">
                    <Switch.Root defaultChecked aria-label="Automatic updates">
                        <Switch.Thumb />
                    </Switch.Root>
                    <span>Automatic updates</span>
                </label>
                <label className="inline-flex items-center gap-3 text-sm font-medium text-gray-900">
                    <Switch.Root aria-label="Preview mode">
                        <Switch.Thumb />
                    </Switch.Root>
                    <span>Preview mode</span>
                </label>
            </div>
        </ColorLooper>
    </div>
)

export default SwitchPlayground
