'use client'

import Fieldset from "@radui/ui/Fieldset"
import TextField from "@radui/ui/TextField"
import PlaygroundSection from "../helpers/PlaygroundSection"

const Label = ({ children, htmlFor }) => (
    <label htmlFor={htmlFor} className="text-sm font-medium text-gray-950">
        {children}
    </label>
)

const FieldsetPlayground = () => (
    <div>
        <PlaygroundSection
            title="Fieldset"
            docsLink="/docs/components/fieldset"
            description="Groups related form controls under a shared legend and message."
        >
            <Fieldset.Root className="grid max-w-md gap-3">
                <Fieldset.Legend>Profile</Fieldset.Legend>
                <Fieldset.Description>Common input states in one form block.</Fieldset.Description>
                <div className="grid gap-2">
                    <Label htmlFor="fieldset-first-name">First name</Label>
                    <TextField id="fieldset-first-name" placeholder="Ada" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="fieldset-last-name">Last name</Label>
                    <TextField id="fieldset-last-name" placeholder="Lovelace" />
                </div>
                <Fieldset.Message>Form message slot</Fieldset.Message>
            </Fieldset.Root>
        </PlaygroundSection>
    </div>
)

export default FieldsetPlayground
