const code = {
    javascript: {
        code: `<Callout color="red">
    <div className="flex items-start">
        <Arrow/>
        <div className="ml-2">
            <Text className="font-bold">Error</Text>
            <Text>Something went wrong. Please try again later.</Text>
        </div>
    </div>
</Callout>
`},
    scss: {
        code: `.rad-ui-callout {
    padding:16px;
    border-radius:8px;
     background-color: var(--rad-ui-color-accent-200);
     color: var(--rad-ui-color-accent-950);
     display: flex;
     align-items: center;
     font-weight: 300;
     font-size: 14px;
     gap:8px;
 }`
    },
}

export default code;