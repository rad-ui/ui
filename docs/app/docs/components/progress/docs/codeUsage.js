const code = {
    javascript: {
        code: `import Progress from "@radui/ui/Progress"

const ProgressExample = () => {
    return  <div style={{width:"200px"}}>
                        <Progress value={90}  />
                   </div>
}

<Kbd>Ctrl + C</Kbd>`
    },
    css: {
        code: `.rad-ui-progress {
    background:  var(--rad-ui-color-sand-600);
    overflow: hidden;
    height:32px;
    border-radius: 8px;
}

.rad-ui-progress-indicator {
    background: var(--rad-ui-color-accent-900);
    width: 100%;
    height: 100%;
    border-radius: 8px;
    transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);
}`
    },
}

export default code;