const code = {
    javascript: {
        code: `import Badge from "@radui/ui/Badge"

const BadgeExample = () => (
    <div>
        <Badge>Badge</Badge>
    </div>
)`
    },
    scss: {
        code: `/** Badge */
.rad-ui-badge {
    background-color: var(--rad-ui-color-accent-300);
    color: var(--rad-ui-color-accent-950);
    padding:4px 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    border-radius: 4px;
}`
    },
}

export default code;