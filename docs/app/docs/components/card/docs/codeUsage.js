const code = {
    javascript: {
        code: `import Card from "@radui/ui/Card"
        
const CardExample = () => (
    <Card>
        <Avatar fallback="PP" />
          <div>
            <span className="font-medium">Peter Parker</span>
            <span>Biochemist</span>
          </div>
    </Card>
)`
    },
    scss: {
        code: `.rad-ui-card{
    border: 1px solid var(--rad-ui-color-gray-400);
    padding: 12px;
    border-radius: 4px;
    box-shadow: 1px 1px 4px 1px var(--rad-ui-color-gray-200);
}`
    },
}

export default code;