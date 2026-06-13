import React from 'react';
import { ExternalLink, Link2 } from 'lucide-react';
import Link, { LinkProps } from '../Link';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const LINK_SIZES = ['small', 'medium', 'large', 'x-large'] as const;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Link',
    component: Link,
    render: (args: React.JSX.IntrinsicAttributes & LinkProps) => <SandboxEditor>
        <div className='text-gray-950'>
            <Link {...args}>Hello</Link>
        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: '',
        href: 'https://www.google.com',
        target: '_blank'
    }
};

export const Sizes = () => {
    return <SandboxEditor>
        <div className='mt-4 mb-2'>
            <p className='text-gray-950'>Link Sizes</p>
        </div>
        <div>
            <div className='flex flex-col'>
                {LINK_SIZES.map((size, index) => {
                    return <Link key={index} href= 'https://www.google.com' size={size}>Hello</Link>;
                })}
            </div>

        </div>
    </SandboxEditor>;
};

/** Icon left, icon right, or icon-only (`inline-flex`). Toolbar links use the same markup. */
export const WithIcon = {
    render: () => (
        <SandboxEditor>
            <div className="flex flex-col items-start gap-4 text-gray-950">
                <Link
                    href="https://example.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5"
                >
                    <Link2 size={16} aria-hidden className="shrink-0" />
                    <span>Reference</span>
                </Link>
                <Link
                    href="https://example.com/docs"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5"
                >
                    <ExternalLink size={16} aria-hidden className="shrink-0" />
                    <span>Open documentation</span>
                </Link>
                <Link
                    href="https://example.com/changelog"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5"
                >
                    <span>Changelog</span>
                    <ExternalLink size={16} aria-hidden className="shrink-0" />
                </Link>
                <Link
                    href="https://example.com/help"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5"
                >
                    <span>Help center</span>
                    <Link2 size={16} aria-hidden className="shrink-0" />
                </Link>
                <Link
                    href="https://example.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open external page"
                    className="inline-flex items-center justify-center"
                >
                    <ExternalLink size={16} aria-hidden className="shrink-0" />
                </Link>
            </div>
        </SandboxEditor>
    )
};
