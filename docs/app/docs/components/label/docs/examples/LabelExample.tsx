'use client'

import Label from "@radui/ui/Label"

const LabelExample = () => (
    <div className="flex w-64 flex-col gap-2">
        <Label htmlFor="label-example-email">Email address</Label>
        <input
            id="label-example-email"
            type="email"
            placeholder="you@example.com"
            className="rounded-md border border-gray-400 bg-gray-50 px-3 py-2 text-sm text-gray-1000"
        />
    </div>
)

export default LabelExample
