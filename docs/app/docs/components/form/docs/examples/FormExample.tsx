"use client"

import { useState } from "react"
import Form from "@radui/ui/Form"
import Field from "@radui/ui/Field"
import TextField from "@radui/ui/TextField"
import Button from "@radui/ui/Button"

// Submitting checks every field; an email starting with "taken" comes back as a server error.
export default function FormExample() {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [status, setStatus] = useState("")

    return (
        <Form
            className="flex w-full max-w-[360px] flex-col gap-4"
            errors={errors}
            onFormSubmit={(values) => {
                if (String(values.email).startsWith("taken")) {
                    setErrors({ email: "That email already has an account." })
                    setStatus("")
                    return
                }
                setStatus(`Welcome, ${values.name}!`)
            }}
        >
            <Field.Root name="name" required>
                <Field.Label>Name</Field.Label>
                <Field.Control asChild>
                    <TextField />
                </Field.Control>
                <Field.Error match="valueMissing">Enter your name.</Field.Error>
            </Field.Root>
            <Field.Root name="email" required>
                <Field.Label>Email</Field.Label>
                <Field.Control asChild>
                    <TextField type="email" placeholder="ada@example.com" />
                </Field.Control>
                <Field.Error />
            </Field.Root>
            <Button type="submit">Sign up</Button>
            <p role="status">{status}</p>
        </Form>
    )
}
