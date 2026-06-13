import Disclosure from "@radui/ui/Disclosure"

export default () => {
    return (
        <Disclosure.Root>
            <Disclosure.Item value={0}>
                <Disclosure.Trigger />
                <Disclosure.Content />
            </Disclosure.Item>
        </Disclosure.Root>
    )
}
