"use client"

import Checkbox from "@radui/ui/Checkbox"

const CheckboxExample = () => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
                <Checkbox.Root id="terms">
                    <Checkbox.Indicator />
                </Checkbox.Root>
                <label htmlFor="terms">Accept terms and conditions</label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox.Root id="newsletter">
                    <Checkbox.Indicator />
                </Checkbox.Root>
                <label htmlFor="newsletter">Subscribe to newsletter</label>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox.Root id="disabled" disabled>
                    <Checkbox.Indicator />
                </Checkbox.Root>
                <label htmlFor="disabled">Disabled option</label>
            </div>
        </div>
    )
}

export default CheckboxExample
