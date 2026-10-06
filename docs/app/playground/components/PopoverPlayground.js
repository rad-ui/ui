'use client'

import { SlidersHorizontal, X } from "lucide-react"
import Button from "@radui/ui/Button"
import Popover from "@radui/ui/Popover"
import TextField from "@radui/ui/TextField"
import PlaygroundSection from "../helpers/PlaygroundSection"

const PopoverPlayground = () => (
    <div>
        <PlaygroundSection
            title="Popover"
            docsLink="/docs/components/popover"
            description="Click-triggered floating panel for small forms and settings."
        >
            <Popover.Root>
                <Popover.Trigger asChild>
                    <Button variant="soft"><SlidersHorizontal size={16} /> Settings</Button>
                </Popover.Trigger>
                <Popover.Content sideOffset={8}>
                    <div className="grid w-64 gap-3">
                        <Popover.Title>Dimensions</Popover.Title>
                        <TextField defaultValue="320px" />
                        <Popover.Close aria-label="Close"><X size={16} /></Popover.Close>
                    </div>
                    <Popover.Arrow />
                </Popover.Content>
            </Popover.Root>
        </PlaygroundSection>
    </div>
)

export default PopoverPlayground
