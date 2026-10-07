import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

export const sourceFiles = [
    { path: 'aurora-backdrop.tsx', code: await getSourceCodeFromPath('docs/registry/fx/aurora-backdrop/aurora-backdrop.tsx') },
    { path: 'aurora-backdrop.css', code: await getSourceCodeFromPath('docs/registry/fx/aurora-backdrop/aurora-backdrop.css') }
];

export const usage = {
    javascript: {
        code: `import AuroraBackdrop from "@/components/fx/aurora-backdrop"

export default function Hero() {
    return (
        <AuroraBackdrop className="rounded-2xl px-8 py-24">
            <h1>Build something bright</h1>
        </AuroraBackdrop>
    )
}`
    }
};

export const pauseUsage = {
    javascript: {
        code: `const [paused, setPaused] = useState(false)

<AuroraBackdrop paused={paused}>
    <button aria-pressed={paused} onClick={() => setPaused(p => !p)}>
        {paused ? "Play background" : "Pause background"}
    </button>
</AuroraBackdrop>`
    }
};

export const AuroraBackdropTable = {
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
        { name: 'Description', id: 'description' }
    ],
    data: [
        { id: 'colors', prop: 'colors', type: 'string[]', default: 'cyan, violet, green, pink', description: 'Up to four CSS colors for the glow.' },
        { id: 'speed', prop: 'speed', type: 'number', default: '20', description: 'Seconds per drift cycle. Higher is calmer.' },
        { id: 'blur', prop: 'blur', type: 'number', default: '64', description: 'Blur radius of the glow, in px.' },
        { id: 'intensity', prop: 'intensity', type: 'number', default: '0.55', description: 'Opacity of the glow layer, 0–1.' },
        { id: 'paused', prop: 'paused', type: 'boolean', default: 'false', description: 'Stop the drift. Wire to a visible pause control.' },
        { id: 'rest', prop: '...props', type: "ComponentProps<'div'>", default: '—', description: 'Passed to the root div.' }
    ]
};
