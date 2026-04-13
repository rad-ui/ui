"use client"

import Radio from "@radui/ui/Radio"

const RadioExample = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
                <Radio name="plan" value="free" id="free" />
                <label htmlFor="free">Free</label>
            </div>
            <div className="flex items-center gap-2">
                <Radio name="plan" value="pro" id="pro" />
                <label htmlFor="pro">Pro</label>
            </div>
            <div className="flex items-center gap-2">
                <Radio name="plan" value="enterprise" id="enterprise" />
                <label htmlFor="enterprise">Enterprise</label>
            </div>
        </div>
    )
}

export default RadioExample
