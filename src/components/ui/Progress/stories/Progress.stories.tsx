import React, { useEffect, useState } from 'react';
import Progress from '../Progress';
import Button from '~/components/ui/Button/Button';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Progress',
    component: Progress,
    parameters: {
        docs: {
            description: {
                component: `
## Progress Component

A progress component with support for:
- **Data Attributes**: \`data-state\`, \`data-value\`, \`data-max\`, \`data-min\`
- **State Management**: loading, complete, indeterminate states
- **Custom Labels**: \`getValueLabel\` prop for custom accessibility labels
- **Accessibility**: Full ARIA support with proper roles and attributes

### Data Attributes
- \`data-state\`: "loading" | "complete" | "indeterminate"
- \`data-value\`: Current progress value
- \`data-max\`: Maximum value
- \`data-min\`: Minimum value

### States
- **Loading**: Value is between min and max
- **Complete**: Value equals maxValue
- **Indeterminate**: Value is null
                `
            }
        }
    },
    render: (args: React.JSX.IntrinsicAttributes) => {
        const [value, setValue] = useState(10);
        return (<SandboxEditor>
            <div className='my-10 space-y-4'>
                <Progress.Root value={value} maxValue={100} minValue={0} {...args}>
                    <Progress.Indicator/>
                </Progress.Root>
                <Button
                    {...args}
                    onClick={() => {
                        // randomize value
                        setValue(Math.floor(Math.random() * 100));
                    }}>Animate!</Button>

                <Button
                    onClick={() => {
                        setValue(null as any);
                    }}>
                    Indeterminate
                </Button>
                <Button
                    onClick={() => {
                        setValue(100);
                    }}>
                    Complete
                </Button>
            </div>
        </SandboxEditor>);
    }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        label: 'progress label'
    }
};

export const Color = {
    args: {
        color: 'green'
    }
};

export const DataAttributes = {
    render: () => {
        const [value, setValue] = useState(25);
        const [maxValue, setMaxValue] = useState(100);

        return (
            <SandboxEditor>
                <div className='my-10 space-y-6'>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Data Attributes Demo</h3>
                        <p className="text-sm text-gray-600">
                            Inspect the elements to see the data attributes: data-state, data-value, data-max, data-min
                        </p>
                    </div>

                    <Progress.Root value={value} maxValue={maxValue} minValue={0}>
                        <Progress.Indicator/>
                    </Progress.Root>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Value: {value}</label>
                            <input
                                type="range"
                                min="0"
                                max={maxValue}
                                value={value}
                                onChange={(e) => setValue(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Max Value: {maxValue}</label>
                            <input
                                type="range"
                                min="50"
                                max="200"
                                value={maxValue}
                                onChange={(e) => setMaxValue(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Button onClick={() => setValue(null as any)}>Set Indeterminate</Button>
                        <Button onClick={() => setValue(maxValue)}>Set Complete</Button>
                        <Button onClick={() => setValue(Math.floor(maxValue / 2))}>Set Halfway</Button>
                    </div>
                </div>
            </SandboxEditor>
        );
    }
};

export const StateTransitions = {
    render: () => {
        const [value, setValue] = useState(0);
        const [isAnimating, setIsAnimating] = useState(false);

        useEffect(() => {
            if (isAnimating) {
                const interval = setInterval(() => {
                    setValue(prev => {
                        if (prev >= 100) {
                            setIsAnimating(false);
                            return 100;
                        }
                        return prev + 10;
                    });
                }, 500);
                return () => clearInterval(interval);
            }
        }, [isAnimating]);

        return (
            <SandboxEditor>
                <div className='my-10 space-y-6'>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">State Transitions</h3>
                        <p className="text-sm text-gray-600">
                            Watch the data-state change from "loading" → "complete" → "indeterminate"
                        </p>
                    </div>

                    <Progress.Root value={value} maxValue={100} minValue={0}>
                        <Progress.Indicator/>
                    </Progress.Root>

                    <div className="space-y-2">
                        <Button
                            onClick={() => {
                                setValue(0);
                                setIsAnimating(true);
                            }}
                            disabled={isAnimating}
                        >
                            Start Animation
                        </Button>
                        <Button onClick={() => setValue(null as any)}>Set Indeterminate</Button>
                        <Button onClick={() => setValue(100)}>Set Complete</Button>
                        <Button onClick={() => setValue(50)}>Set Loading</Button>
                    </div>

                    <div className="text-sm text-gray-600">
                        Current state: {value === null ? 'indeterminate' : value === 100 ? 'complete' : 'loading'}
                    </div>
                </div>
            </SandboxEditor>
        );
    }
};

export const CustomLabels = {
    render: () => {
        const [value, setValue] = useState(75);

        const getValueLabel = (value: number, minValue: number, maxValue: number) => {
            const percentage = Math.round(((value - minValue) / (maxValue - minValue)) * 100);
            return `Upload progress: ${value} of ${maxValue} files (${percentage}%)`;
        };

        const getPercentageLabel = (value: number, minValue: number, maxValue: number) => {
            const percentage = Math.round(((value - minValue) / (maxValue - minValue)) * 100);
            return `${percentage}% complete`;
        };

        const getCustomLabel = (value: number, minValue: number, maxValue: number) => {
            if (value === null || value === 0) return 'Starting...';
            if (value === maxValue) return 'Finished!';
            return `Processing... ${value}/${maxValue}`;
        };

        return (
            <SandboxEditor>
                <div className='my-10 space-y-8'>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Custom Labels with getValueLabel</h3>
                        <p className="text-sm text-gray-600">
                            Custom accessibility labels for different use cases
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium mb-2">File Upload Progress</h4>
                            <Progress.Root value={value} maxValue={100} minValue={0} getValueLabel={getValueLabel}>
                                <Progress.Indicator/>
                            </Progress.Root>
                        </div>

                        <div>
                            <h4 className="font-medium mb-2">Percentage Display</h4>
                            <Progress.Root value={value} maxValue={100} minValue={0} getValueLabel={getPercentageLabel}>
                                <Progress.Indicator/>
                            </Progress.Root>
                        </div>

                        <div>
                            <h4 className="font-medium mb-2">Custom Status</h4>
                            <Progress.Root value={value} maxValue={100} minValue={0} getValueLabel={getCustomLabel}>
                                <Progress.Indicator/>
                            </Progress.Root>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Value: {value}</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={value}
                                onChange={(e) => setValue(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <Button onClick={() => setValue(0)}>Reset</Button>
                            <Button onClick={() => setValue(100)}>Complete</Button>
                            <Button onClick={() => setValue(null as any)}>Indeterminate</Button>
                        </div>
                    </div>
                </div>
            </SandboxEditor>
        );
    }
};

export const CustomRanges = {
    render: () => {
        const [value, setValue] = useState(5);
        const [minValue, setMinValue] = useState(0);
        const [maxValue, setMaxValue] = useState(10);

        const getValueLabel = (value: number, minValue: number, maxValue: number) => {
            return `Step ${value} of ${maxValue}`;
        };

        return (
            <SandboxEditor>
                <div className='my-10 space-y-6'>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Custom Min/Max Ranges</h3>
                        <p className="text-sm text-gray-600">
                            Progress with custom minimum and maximum values
                        </p>
                    </div>

                    <Progress.Root value={value} maxValue={maxValue} minValue={minValue} getValueLabel={getValueLabel}>
                        <Progress.Indicator/>
                    </Progress.Root>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Min: {minValue}</label>
                            <input
                                type="range"
                                min="0"
                                max="5"
                                value={minValue}
                                onChange={(e) => setMinValue(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Value: {value}</label>
                            <input
                                type="range"
                                min={minValue}
                                max={maxValue}
                                value={value}
                                onChange={(e) => setValue(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Max: {maxValue}</label>
                            <input
                                type="range"
                                min="5"
                                max="20"
                                value={maxValue}
                                onChange={(e) => setMaxValue(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </SandboxEditor>
        );
    }
};
