
"use client";
import Callout from "@radui/ui/Callout";
import { Bookmark } from "lucide-react";

export const BookmarkIcon = () => <Bookmark size={18} strokeWidth={2} />;

const CalloutExample = () => (
        <Callout.Root color="red">
            <Callout.Icon>
                <BookmarkIcon />
            </Callout.Icon>
        <Callout.Text>
            Seems like there's been an error. Please try again.
        </Callout.Text>
    </Callout.Root>
)

export default CalloutExample;
