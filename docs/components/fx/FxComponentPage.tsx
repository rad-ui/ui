import Documentation from '@/components/layout/Documentation/Documentation'
import FxPreview from '@/components/fx/FxPreview'
import FxInstall from '@/components/fx/FxInstall'
import FxA11yContract from '@/components/fx/FxA11yContract'
import { fxCatalog } from '@/app/fx/fxCatalog'
import { fxCategoryTitle, fxComponents } from '@/app/fx/fxNavigationSections'
import { getSourceCodeFromPath } from '@/utils/parseSourceCode'

// Every FX page has the same anatomy: live demo, install (CLI / agent / source),
// usage, extra demos, accessibility contract, props. Data comes from the
// registry (title, description, files, contract) and fxCatalog (demos, props).
const FxComponentPage = async ({ name }: { name: string }) => {
    const item = fxComponents.find((entry) => entry.name === name)
    const docs = fxCatalog[name]
    if (!item || !docs) return null

    const files = await Promise.all(item.files.map(async (file) => ({
        path: file.target.split('/').pop() as string,
        code: await getSourceCodeFromPath(`docs/${file.path}`)
    })))
    const [primary, ...extraDemos] = docs.demos

    return <Documentation eyebrow={`FX · ${fxCategoryTitle(item.categories?.[1] ?? '')}`} title={item.title} description={item.description}>
        <FxPreview replayable={primary.replayable} minHeight={primary.minHeight}>
            <primary.Demo />
        </FxPreview>

        <Documentation.Section title="Installation">
            <FxInstall name={item.name} files={files} />
        </Documentation.Section>

        <Documentation.Section title="Usage">
            <Documentation.CodeBlock language="tsx">{docs.usage}</Documentation.CodeBlock>
        </Documentation.Section>

        {extraDemos.map((demo) => (
            <Documentation.Section key={demo.title} title={demo.title}>
                <FxPreview replayable={demo.replayable} minHeight={demo.minHeight}>
                    <demo.Demo />
                </FxPreview>
                {demo.code ? <Documentation.CodeBlock language="tsx">{demo.code}</Documentation.CodeBlock> : null}
            </Documentation.Section>
        ))}

        <Documentation.Section title="Accessibility contract">
            <FxA11yContract name={item.name} />
        </Documentation.Section>

        <Documentation.Table
            columns={[
                { name: 'Prop', id: 'prop' },
                { name: 'Type', id: 'type' },
                { name: 'Default', id: 'default' },
                { name: 'Description', id: 'description' }
            ]}
            data={docs.props.map(([prop, type, defaultValue, description]) => ({ id: prop, prop, type, default: defaultValue, description }))}
        />
    </Documentation>
}

export default FxComponentPage
