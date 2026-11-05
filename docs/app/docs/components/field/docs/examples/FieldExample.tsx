"use client"

import { useState } from "react"
import Field from "@radui/ui/Field"
import TextField from "@radui/ui/TextField"
import Button from "@radui/ui/Button"

// The server says which field failed; only that field turns invalid and shows its error.
export default function FieldExample() {
    const [error, setError] = useState<{ field: string; message: string } | null>(null)

    return (
        <form
            className="flex w-full max-w-[360px] flex-col gap-4"
            onSubmit={(event) => {
                event.preventDefault()
                const email = String(new FormData(event.currentTarget).get("email") ?? "")
                setError(email.endsWith("@example.com")
                    ? { field: "email", message: "That email already has an account." }
                    : null)
            }}
        >
            <Field.Root name="email" required invalid={error?.field === "email"}>
                <Field.Label>Email</Field.Label>
                <Field.Control asChild>
                    <TextField type="email" placeholder="ada@example.com" />
                </Field.Control>
                <Field.Description>We only use it to sign you in.</Field.Description>
                <Field.Error>{error?.message}</Field.Error>
            </Field.Root>
            <Button type="submit">Create account</Button>
        </form>
    )
}
