import Slider from "@radui/ui/Slider"

export default () => {
    return (
        <Slider.Root>
            <Slider.Track>
                <Slider.Range>
                    <Slider.Thumb aria-label="Value" />
                </Slider.Range>
            </Slider.Track>
        </Slider.Root>
    )
}
