"use client"

import TextArea from "@radui/ui/TextArea"

const TextAreaExample = () => {
    return (
        <div className="flex flex-col gap-4 w-[320px]">
            <TextArea placeholder="Write your message..." />
            <TextArea placeholder="Disabled textarea" disabled />
        </div>
    )
}

export default TextAreaExample
