const code = {
    javascript: {
        code: `import Heading from "@radui/ui/Heading"

const HeadingExamples = () => (
    <div>
        <Heading>Heading 1</Heading>
        <Heading as="h2">Heading 2</Heading>
        <Heading as="h3">Heading 3</Heading>
        <Heading as="h4">Heading 4</Heading>
        <Heading as="h5">Heading 5</Heading>
        <Heading as="h6">Heading 6</Heading>
    </div>
)`
    },
    css: {
        code: `.rad-ui-h1{
    font-weight: bold;
    font-size: 60px;
    letter-spacing: -3.5px;
    line-height:72px;
}

.rad-ui-h2{
    font-weight: bold;
    font-size: 54px;
    letter-spacing: -3px;
    line-height:62px;
}

.rad-ui-h3{
    font-weight: bold;
    font-size: 48px;
    letter-spacing: -2px;
    line-height:54px;
}

.rad-ui-h4{
    font-weight: bold;
    font-size: 42px;
    letter-spacing: -1px;
    line-height:48px;
}

.rad-ui-h5{
    font-weight: bold;
    font-size: 36px;
    letter-spacing: -0.5px;
    line-height:42px;
}

.rad-ui-h6{
    font-weight: bold;
    font-size: 32px;
    line-height:36px;
}`
    },
}

export default code;