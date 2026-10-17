import React, { useEffect, useRef, useState } from 'react';
import Theme from '../Theme';

// Checks the Tailwind preset's `black` and `white`: they must stay literal (#000 / #fff) in both
// appearances, while the Rad UI ramps (gray-50 and so on) follow the theme. Each sample reads the
// colour the browser actually paints and marks it pass or fail.

type Expect = { prop: 'color' | 'backgroundColor' | 'borderTopColor'; rgb: [number, number, number] | null };

/** The painted colour of any CSS colour string (rgb, oklch, color-mix...), as 0–255 RGB. */
function toRgb(css: string): [number, number, number] {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#123456';
    ctx.fillStyle = css;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return [r, g, b];
}

const close = (a: number[], b: number[]) => a.every((v, i) => Math.abs(v - b[i]) <= 2);

const Sample = ({ className, label, expect }: { className: string; label: string; expect: Expect }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [painted, setPainted] = useState<[number, number, number] | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        // Wait a frame so the theme's appearance class is applied.
        const id = requestAnimationFrame(() => setPainted(toRgb(getComputedStyle(el)[expect.prop])));
        return () => cancelAnimationFrame(id);
    });

    const ok = painted && expect.rgb ? close(painted, expect.rgb) : null;
    return (
        <div className="flex items-center gap-3">
            <div ref={ref} className={`w-40 rounded-md px-3 py-2 text-sm font-medium ${className}`}>
                {label}
            </div>
            <code className="text-xs text-[var(--rad-ui-text-secondary)]">
                {painted ? `rgb(${painted.join(', ')})` : '…'}
            </code>
            {ok === null
                ? (
                    <span className="text-xs text-[var(--rad-ui-text-secondary)]">follows the theme</span>
                )
                : (
                    <span className="text-xs font-semibold" style={{ color: ok ? '#16a34a' : '#dc2626' }}>
                        {ok ? 'PASS' : 'FAIL'}
                    </span>
                )}
        </div>
    );
};

const WHITE: [number, number, number] = [255, 255, 255];
const BLACK: [number, number, number] = [0, 0, 0];

const Panel = ({ appearance }: { appearance: 'light' | 'dark' }) => (
    <Theme appearance={appearance}>
        <div className="flex flex-col gap-3 rounded-lg bg-[var(--rad-ui-surface-canvas)] p-5">
            <h3 className="text-sm font-semibold text-[var(--rad-ui-text-primary)]">{appearance} appearance</h3>
            <Sample className="bg-gray-500 text-white" label="text-white" expect={{ prop: 'color', rgb: WHITE }} />
            <Sample className="bg-black text-gray-500" label="bg-black" expect={{ prop: 'backgroundColor', rgb: BLACK }} />
            <Sample className="bg-white text-gray-500" label="bg-white" expect={{ prop: 'backgroundColor', rgb: WHITE }} />
            <Sample className="bg-gray-500 text-black" label="text-black" expect={{ prop: 'color', rgb: BLACK }} />
            <Sample className="border-2 border-black bg-gray-500 text-white" label="border-black" expect={{ prop: 'borderTopColor', rgb: BLACK }} />
            <hr className="border-[var(--rad-ui-border)]" />
            <Sample className="bg-gray-50 text-gray-950" label="bg-gray-50 (ramp)" expect={{ prop: 'backgroundColor', rgb: null }} />
        </div>
    </Theme>
);

export default {
    title: 'Components/Theme/Tailwind black and white',
    render: () => (
        <div className="flex flex-wrap gap-6 p-6">
            <Panel appearance="light" />
            <Panel appearance="dark" />
        </div>
    )
};

export const BothAppearances = {};
