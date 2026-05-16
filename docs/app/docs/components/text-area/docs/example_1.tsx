"use client"

import TextArea from "@radui/ui/TextArea"

const TextAreaExample = () => {
    return (
        <div className="w-full max-w-[400px] space-y-4">
            <TextArea
                id="message-textarea"
                placeholder="Type your message here."
            />
            <TextArea
                placeholder="Disabled textarea"
                disabled
            />
        </div>
    )
}

export default TextAreaExample
