"use client";

import Card from "@radui/ui/Card";
import Popover from "@radui/ui/Popover";
import Text from "@radui/ui/Text";

const PopoverExample1 = () => {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Card className="bg-gray-50" style={{ display: 'inline-flex', gap: 20 }}>
                    <Text className="text-gray-950">Open Popover</Text>
                </Card>
            </Popover.Trigger>
            <Popover.Content>
                <Popover.Arrow />
                Hello from the popover!
            </Popover.Content>
        </Popover.Root>
    );
};

export default PopoverExample1;
