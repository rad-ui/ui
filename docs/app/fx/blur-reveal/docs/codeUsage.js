import { getSourceCodeFromPath } from '@/utils/parseSourceCode';

export const sourceFiles = [
    { path: 'blur-reveal.tsx', code: await getSourceCodeFromPath('docs/registry/fx/blur-reveal/blur-reveal.tsx') },
    { path: 'blur-reveal.css', code: await getSourceCodeFromPath('docs/registry/fx/blur-reveal/blur-reveal.css') }
];

export const usage = {
    javascript: {
        code: `import BlurReveal from "@/components/fx/blur-reveal"

export default function Hero() {
    return <BlurReveal as="h1" text="Ship interfaces people remember" />
}`
    }
};

export const lettersUsage = {
    javascript: {
        code: `<BlurReveal by="letter" stagger={30} text="Motion, minus the vertigo." />`
    }
};

export const BlurRevealTable = {
    columns: [
        { name: 'Prop', id: 'prop' },
        { name: 'Type', id: 'type' },
        { name: 'Default', id: 'default' },
        { name: 'Description', id: 'description' }
    ],
    data: [
        { id: 'text', prop: 'text', type: 'string', default: '—', description: 'Text to reveal. Read once, whole, by screen readers.' },
        { id: 'as', prop: 'as', type: "'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote'", default: "'p'", description: 'Element to render, so headings keep their level.' },
        { id: 'by', prop: 'by', type: "'word' | 'letter'", default: "'word'", description: 'Animate per word or per letter. Letters never break across lines.' },
        { id: 'trigger', prop: 'trigger', type: "'inView' | 'mount'", default: "'inView'", description: 'Start when scrolled into view, or immediately.' },
        { id: 'stagger', prop: 'stagger', type: 'number', default: '60', description: 'Delay between pieces, in ms.' },
        { id: 'duration', prop: 'duration', type: 'number', default: '700', description: 'Duration of each piece, in ms.' },
        { id: 'delay', prop: 'delay', type: 'number', default: '0', description: 'Delay before the first piece, in ms.' }
    ]
};
