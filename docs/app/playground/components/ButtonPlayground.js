'use client'

import { ArrowRight } from "lucide-react"
import ColorLooper from "../helpers/ColorLooper"
import Button from "@radui/ui/Button"

const Playground = () => (
    <div className='mt-4 space-y-2'>
        <ColorLooper
            title="Buttons"
            docsLink="/docs/components/button"
            description="Current button variants and sizes, including icon composition."
        >
            <div className='flex flex-wrap gap-2'>
                <Button variant="solid">
                    Create
                    <ArrowRight size={16} />
                </Button>
                <Button variant="outline">
                    Review
                    <ArrowRight size={16} />
                </Button>
                <Button variant="soft">
                    Continue
                    <ArrowRight size={16} />
                </Button>
                <Button variant="ghost">
                    Skip
                    <ArrowRight size={16} />
                </Button>
            </div>
            <div className='mt-4 flex flex-wrap items-center gap-2'>
                <Button size="small">Small</Button>
                <Button size="medium">Medium</Button>
                <Button size="large">Large</Button>
                <Button size="x-large">XL</Button>
            </div>
        </ColorLooper>
    </div>
)

export default Playground
