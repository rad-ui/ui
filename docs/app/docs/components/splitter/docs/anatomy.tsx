import Splitter from "@radui/ui/Splitter"

export default () => {
    return (
        <Splitter.Root orientation="horizontal">
            <Splitter.Panel index={0} />
            <Splitter.Handle index={0} />
            <Splitter.Panel index={1} />
        </Splitter.Root>
    )
}
