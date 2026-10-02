"use client"

import { useState } from "react"
import Button from "@radui/ui/Button"
import Card from "@radui/ui/Card"
import Heading from "@radui/ui/Heading"
import LiveRegion from "@radui/ui/LiveRegion"
import Text from "@radui/ui/Text"

export default function LiveRegionExample() {
    const [message, setMessage] = useState("Ready to sync")

    return (
        <Card className="w-full max-w-xl bg-gray-50 text-gray-1000">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <Heading as="h3" className="mb-1 text-base">
                        Sync status
                    </Heading>
                    <Text className="text-sm text-gray-800">
                        {message}
                    </Text>
                </div>
                <Button onClick={() => setMessage("Settings synced")}>
                    Sync
                </Button>
                <LiveRegion>{message}</LiveRegion>
            </div>
        </Card>
    )
}
