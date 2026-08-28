"use client"

import Meter from "@radui/ui/Meter"

export default function MeterExample() {
    return (
        <div style={{ width: "280px" }}>
            <Meter.Root
                value={72}
                minValue={0}
                maxValue={100}
                lowValue={30}
                highValue={85}
                getValueLabel={(value) => `${value}% capacity used`}
            >
                <Meter.Indicator />
            </Meter.Root>
        </div>
    )
}
