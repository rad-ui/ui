import registry from '@/registry/registry.json'

// Renders the accessibility contract straight from the registry item, so the
// docs page, the installed item and what agents read can never drift apart.
const FxA11yContract = ({ name }: { name: string }) => {
    const item = registry.items.find((entry) => entry.name === name)
    const rules = item?.meta?.accessibility ?? []

    return <ul className="list-disc space-y-2 pl-5 text-[0.98rem] leading-7 text-gray-950">
        {rules.map((rule) => <li key={rule}>{rule}</li>)}
    </ul>
}

export default FxA11yContract
