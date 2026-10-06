"use client"

import Slider from "@radui/ui/Slider"

const SliderExample = () => {
    return (
        <div className="flex flex-col gap-6 w-[280px]">
            <Slider aria-label="Volume" defaultValue={40} min={0} max={100} />
            <Slider aria-label="Brightness" defaultValue={70} min={0} max={100} />
            <Slider aria-label="Contrast" defaultValue={20} min={0} max={100} disabled />
        </div>
    )
}

export default SliderExample
