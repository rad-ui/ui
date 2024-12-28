import Accordion from "@radui/ui/Accordion";

export default ()=>{
    return (
        <Accordion.Root>
            <Accordion.Item>
                <Accordion.Header>
                    <Accordion.Trigger>
                        Trigger
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                    Content
                </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    )
}