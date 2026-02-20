
"use client";
import Callout from "@radui/ui/Callout";
import { AlertCircle as BookmarkIcon } from 'lucide-react';

const CalloutExample = () => (
    <Callout.Root color="red">
        <Callout.Icon>
            <BookmarkIcon className="w-full h-full" />
        </Callout.Icon>
        <Callout.Text>
            Seems like there's been an error. Please try again.
        </Callout.Text>
    </Callout.Root>
)

export default CalloutExample;