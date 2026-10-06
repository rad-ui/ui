"use client"

import Fieldset from "@radui/ui/Fieldset"

export default function FieldsetExample() {
    return (
        <Fieldset.Root className="flex w-full max-w-[360px] flex-col gap-3" invalid>
            <Fieldset.Legend>Delivery window</Fieldset.Legend>
            <Fieldset.Description id="delivery-description">
                Select when someone will be available to receive the package.
            </Fieldset.Description>
            <label className="flex items-center gap-2">
                <input type="radio" name="delivery-window" value="morning" aria-describedby="delivery-description" />
                Morning
            </label>
            <label className="flex items-center gap-2">
                <input type="radio" name="delivery-window" value="afternoon" aria-describedby="delivery-description" />
                Afternoon
            </label>
            <Fieldset.Message invalid>Select one delivery window.</Fieldset.Message>
        </Fieldset.Root>
    )
}
