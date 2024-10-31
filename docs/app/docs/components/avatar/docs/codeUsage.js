const code = {
    javascript: {
        code: `import Avatar from "@radui/ui/Avatar"

const AvatarExample = () => (
    <div style={{ display: 'flex', gap: 20 }}>
        <Avatar src="https://i.pravatar.cc/1000" />
        <Avatar fallback="RU" />
        <Avatar fallback="AA" />
    </div>
)`
    },
    scss: {
        code: `.rad-ui-avatar-root{
    position: relative;
    display: inline-flex;
    width:32px;
    height:32px;
    border-radius: 8px;
    overflow: hidden;

    .rad-ui-avatar{
        display: flex;
        flex-grow: 1;
        position: relative;
        z-index: 1;
        width: 100%;
        height:100%;
    }

    .rad-ui-avatar-fallback{
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--rad-ui-color-accent-900);
        background-color: var(--rad-ui-color-accent-500);
        position: absolute;
        top:0px;
        left:0px;
        width: 100%;
        height:100%;
    }
}`
    },
}

export default code;