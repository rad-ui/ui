import Meter from "@radui/ui/Meter"

export default () => (
    <Meter.Root value={72} minValue={0} maxValue={100} lowValue={30} highValue={85}>
        <Meter.Indicator />
    </Meter.Root>
)
