"use client"

import { useState } from "react"
import OTPField from "@radui/ui/OTPField"

export default function OTPFieldExample() {
    const [code, setCode] = useState("")

    return (
        <div className="flex flex-col items-center gap-3">
            <OTPField.Root aria-label="Verification code" value={code} onValueChange={setCode} name="code">
                {Array.from({ length: 6 }, (_, index) => <OTPField.Input key={index} />)}
            </OTPField.Root>
            <p className="text-sm">{code.length === 6 ? `Code ${code} is ready` : "Enter the 6-digit code"}</p>
        </div>
    )
}
