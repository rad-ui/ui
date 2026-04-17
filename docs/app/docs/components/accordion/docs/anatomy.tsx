import Accordion from "@radui/ui/Accordion";

export default () => {
    return (
        <Accordion.Root>
            <Accordion.Item>
                <Accordion.Header>
                    <Accordion.Trigger />
                </Accordion.Header>
                <Accordion.Content />
            </Accordion.Item>
        </Accordion.Root>
    )
}