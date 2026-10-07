import CodeBlock from '@/components/layout/Documentation/helpers/CodeBlock'
import CodeTabs from '@/components/layout/Documentation/helpers/ComponentHero/CodeTabs'
import { docsSurfaceClassName } from '@/components/layout/Documentation/shared'

const REGISTRY_URL = 'https://www.rad-ui.com/r'

// Three ways in: the shadcn CLI, a prompt for a coding agent, or copying the
// files by hand. All three install the same registry item.
const FxInstall = ({ name, files }: { name: string, files: { path: string, code: string, language?: string }[] }) => {
    const itemUrl = `${REGISTRY_URL}/${name}.json`
    const tabs = [
        {
            label: 'shadcn CLI',
            value: 'cli',
            content: <CodeBlock className="my-0" language="bash">{`npx shadcn@latest add ${itemUrl}`}</CodeBlock>
        },
        {
            label: 'Agent prompt',
            value: 'agent',
            content: <CodeBlock className="my-0" language="bash">{`Install the Rad UI FX "${name}" component from ${itemUrl} using the shadcn CLI. Follow the accessibility notes in its "meta.accessibility" field and keep the aria-hidden / visually hidden structure intact.`}</CodeBlock>
        },
        ...files.map((file) => ({
            label: file.path,
            value: file.path,
            content: <CodeBlock className="my-0" language={file.language ?? (file.path.endsWith('.css') ? 'scss' : 'tsx')}>{file.code}</CodeBlock>
        }))
    ]

    return <div className={`${docsSurfaceClassName} px-4 pb-4 pt-3 sm:px-5`}>
        <CodeTabs data={tabs} />
    </div>
}

export default FxInstall
