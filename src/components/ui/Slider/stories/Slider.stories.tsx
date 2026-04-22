import React from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Slider from '../Slider';

export default {
    title: 'Components/Slider',
    component: Slider
} as any;

export const Basic = {
    render: () => {
        return <SandboxEditor>
            <div className="flex justify-center py-16">
                <Slider defaultValue={45} min={0} max={100} aria-label="Slider" />
            </div>
        </SandboxEditor>;
    }
};

export const VerticalWithMarks = {
    render: () => {
        return <SandboxEditor>
            <div className="flex h-[24rem] justify-center py-8">
                <Slider
                    aria-label="Vertical slider with marks"
                    orientation="vertical"
                    defaultValue={40}
                    min={0}
                    max={100}
                    // marks={[0, 25, 50, 75, 100]}
                />
            </div>
        </SandboxEditor>;
    }
};

export const AllProps = {
    render: () => {
        const [controlled, setControlled] = React.useState(30);
        const [range, setRange] = React.useState<number[]>([20, 70]);
        const [commitLog, setCommitLog] = React.useState<string[]>([]);

        const log = (label: string, val: number | number[]) =>
            setCommitLog(prev => [`${label}: ${JSON.stringify(val)}`, ...prev].slice(0, 5));

        return (
            <SandboxEditor>
                <div className="flex flex-col gap-10 px-8 py-10 max-w-lg mx-auto">

                    {/* defaultValue */}
                    <div>
                        <p className="text-sm mb-3">defaultValue={45}</p>
                        <Slider aria-label="Default value" defaultValue={45} />
                    </div>

                    {/* controlled value + onValueChange */}
                    <div>
                        <p className="text-sm mb-3">value (controlled) = {controlled} — onValueChange</p>
                        <Slider
                            aria-label="Controlled slider"
                            value={controlled}
                            onValueChange={v => setControlled(v as number)}
                        />
                    </div>

                    {/* onValueCommit */}
                    <div>
                        <p className="text-sm mb-3">onValueCommit (last 5 commits shown below)</p>
                        <Slider
                            aria-label="Commit slider"
                            defaultValue={50}
                            onValueCommit={v => log('committed', v)}
                        />
                        <ul className="mt-2 text-xs text-[var(--rad-ui-text-secondary)] list-disc pl-4">
                            {commitLog.map((entry, i) => <li key={i}>{entry}</li>)}
                        </ul>
                    </div>

                    {/* min / max / step */}
                    <div>
                        <p className="text-sm mb-3">min=0 max=50 step=5</p>
                        <Slider aria-label="Step slider" defaultValue={25} min={0} max={50} step={5} />
                    </div>

                    {/* showStepMarks */}
                    <div>
                        <p className="text-sm mb-3">showStepMarks step=10</p>
                        <Slider aria-label="Step marks slider" defaultValue={40} step={10} showStepMarks />
                    </div>

                    {/* formatValue */}
                    <div>
                        <p className="text-sm mb-3">formatValue — currency</p>
                        <Slider
                            aria-label="Formatted value slider"
                            defaultValue={250}
                            min={0}
                            max={1000}
                            step={10}
                            formatValue={v => `$${v}`}
                        />
                    </div>

                    {/* range (number[]) */}
                    <div>
                        <p className="text-sm mb-3">Range slider — value={JSON.stringify(range)}</p>
                        <Slider
                            aria-label="Range slider"
                            value={range}
                            onValueChange={v => setRange(v as number[])}
                        />
                    </div>

                    {/* disabled */}
                    <div>
                        <p className="text-sm mb-3">disabled</p>
                        <Slider aria-label="Disabled slider" defaultValue={60} disabled />
                    </div>

                    {/* name (hidden input for forms) */}
                    <div>
                        <p className="text-sm mb-3">name="volume" (hidden input)</p>
                        <Slider aria-label="Named slider" defaultValue={70} name="volume" />
                    </div>

                    {/* orientation vertical */}
                    <div>
                        <p className="text-sm mb-3">orientation="vertical"</p>
                        <div className="flex h-48 justify-center">
                            <Slider aria-label="Vertical slider" orientation="vertical" defaultValue={40} />
                        </div>
                    </div>

                    {/* pageStepMultiplier */}
                    <div>
                        <p className="text-sm mb-3">pageStepMultiplier=20 (PageUp/PageDown jumps by 20)</p>
                        <Slider aria-label="Page step slider" defaultValue={50} pageStepMultiplier={20} />
                    </div>

                </div>
            </SandboxEditor>
        );
    }
};
