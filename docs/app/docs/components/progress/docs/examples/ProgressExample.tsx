"use client"
import Progress from "@radui/ui/Progress"
import Card from "@radui/ui/Card"

export default function ProgressExample() {
    return (
        <Card style={{width: "90%"}}>
            <Progress.Root value={30} maxValue={100} minValue={0}>
                <Progress.Indicator />
            </Progress.Root>
        </Card>
    )
}

