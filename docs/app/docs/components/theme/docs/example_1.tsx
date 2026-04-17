"use client"

import Theme from "@radui/ui/Theme"
import Button from "@radui/ui/Button"
import Badge from "@radui/ui/Badge"

const ThemeExample = () => {
    return (
        <div className="flex flex-col gap-6">
            <Theme appearance="light" accentColor="blue">
                <div className="flex items-center gap-3 p-4 rounded-lg border">
                    <Badge color="blue">Light / Blue</Badge>
                    <Button color="blue">Button</Button>
                </div>
            </Theme>
            <Theme appearance="light" accentColor="green">
                <div className="flex items-center gap-3 p-4 rounded-lg border">
                    <Badge color="green">Light / Green</Badge>
                    <Button color="green">Button</Button>
                </div>
            </Theme>
        </div>
    )
}

export default ThemeExample
