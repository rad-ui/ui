import React, { useState } from "react";
import Toolbar from "@radui/ui/Toolbar";
import { Bold, Italic, Underline } from "lucide-react";

const ToolbarExample = () => {
    const [textStyles, setTextStyles] = useState(["bold"])

    return (
        <Toolbar.Root aria-label="Formatting options">
            <Toolbar.ToggleGroup type="multiple" value={textStyles} onValueChange={setTextStyles}>
                <Toolbar.ToggleItem value="bold" aria-label="Bold">
                    <Bold size={16} />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem value="italic" aria-label="Italic">
                    <Italic size={16} />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem value="underline" aria-label="Underline">
                    <Underline size={16} />
                </Toolbar.ToggleItem>
            </Toolbar.ToggleGroup>
        </Toolbar.Root>
    )
}

export default ToolbarExample
