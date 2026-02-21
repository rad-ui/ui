import React from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Slider from '../Slider';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Slider',
    component: Slider,
    render: () => {
        return <SandboxEditor>
            <div className="w-full p-10 bg-gray-200">
                <Slider.Root defaultValue={50} min={0} max={100} >
                    <Slider.Track>
                        <Slider.Range>
                            <Slider.Thumb>
                                <div />
                            </Slider.Thumb>
                        </Slider.Range>
                    </Slider.Track>
                </Slider.Root>
            </div>
        </SandboxEditor>;
    }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ''
    }
};

export const SimpleSlider = {
    render: () => {
        return <SandboxEditor>
            <div className="w-full p-10 bg-gray-200">
                <Slider defaultValue={50} min={0} max={100} aria-label="Simple slider" />
            </div>
        </SandboxEditor>;
    }
};

export const WithStepMarks = {
    render: () => {
        return <SandboxEditor>
            <div className="w-full p-10 bg-gray-200">
                <Slider defaultValue={50} min={0} max={100} step={25} showStepMarks={true} aria-label="Slider with step marks" />
            </div>
        </SandboxEditor>;
    }
};

export const VerticalSlider = {
    render: () => {
        return <SandboxEditor>
            <div className="w-full p-10 bg-gray-200 h-64 flex items-center">
                <Slider defaultValue={75} min={0} max={100} step={5} orientation="vertical" aria-label="Vertical slider" />
            </div>
        </SandboxEditor>;
    }
};

export const DisabledSlider = {
    render: () => {
        return <SandboxEditor>
            <div className="w-full p-10 bg-gray-200">
                <Slider defaultValue={30} min={0} max={100} disabled={true} aria-label="Disabled slider" />
            </div>
        </SandboxEditor>;
    }
};

export const WithValueFormatting = {
    render: () => {
        return <SandboxEditor>
            <div className="w-full p-10 bg-gray-200">
                <Slider
                    defaultValue={75}
                    min={0}
                    max={100}
                    step={5}
                    formatValue={(value) => `${value}%`}
                    aria-label="Percentage slider"
                />
            </div>
        </SandboxEditor>;
    }
};

export const RangeSlider = {
    render: () => {
        return <SandboxEditor>
            <div className="w-full p-10 bg-gray-200">
                <Slider.Root defaultValue={50} min={0} max={100} step={5}>
                    <Slider.Track>
                        <Slider.RangeSlider aria-label="Price range" defaultValue={[25, 75] as any} />
                    </Slider.Track>
                </Slider.Root>
            </div>
        </SandboxEditor>;
    }
};

export const CustomMarks = {
    render: () => {
        return <SandboxEditor>
            <div className="w-full p-10 bg-gray-200">
                <Slider.Root defaultValue={50} min={0} max={100} step={25}>
                    <Slider.Track>
                        <Slider.Range>
                            <Slider.Thumb aria-label="Custom marks control" />
                        </Slider.Range>
                        <Slider.Marks
                            customMarks={[
                                { value: 0, label: 'Low' },
                                { value: 25, label: 'Medium' },
                                { value: 50, label: 'High' },
                                { value: 75, label: 'Very High' },
                                { value: 100, label: 'Max' }
                            ]}
                        />
                    </Slider.Track>
                </Slider.Root>
            </div>
        </SandboxEditor>;
    }
};

export const TemperatureSlider = {
    render: () => {
        return <SandboxEditor>
            <div className="w-full p-10 bg-gray-200">
                <Slider.Root defaultValue={20} min={-10} max={40} step={1}>
                    <Slider.Track>
                        <Slider.Range>
                            <Slider.Thumb aria-label="Temperature control" />
                        </Slider.Range>
                        <Slider.Marks
                            customMarks={[
                                { value: -10, label: 'Cold' },
                                { value: 0, label: 'Freezing' },
                                { value: 20, label: 'Room' },
                                { value: 30, label: 'Warm' },
                                { value: 40, label: 'Hot' }
                            ]}
                        />
                    </Slider.Track>
                </Slider.Root>
            </div>
        </SandboxEditor>;
    }
};

export const PriceRangeSlider = {
    render: () => {
        return <SandboxEditor>
            <div className="w-full p-10 bg-gray-200">
                <Slider.Root defaultValue={500} min={0} max={1000} step={50}>
                    <Slider.Track>
                        <Slider.RangeSlider aria-label="Range slider" defaultValue={[25, 75] as any} />
                        <Slider.Marks
                            customMarks={[
                                { value: 0, label: '$0' },
                                { value: 250, label: '$250' },
                                { value: 500, label: '$500' },
                                { value: 750, label: '$750' },
                                { value: 1000, label: '$1000' }
                            ]}
                        />
                    </Slider.Track>
                </Slider.Root>
            </div>
        </SandboxEditor>;
    }
};

export const ControlledSlider = {
    render: () => {
        const [value, setValue] = React.useState(60);

        return <SandboxEditor>
            <div className="w-full p-10 bg-gray-200">
                <div className="mb-4 text-lg font-bold">
                    Current Value: {value}
                </div>
                <Slider
                    value={value}
                    onValueChange={setValue}
                    min={0}
                    max={100}
                    step={5}
                    formatValue={(value) => `${value}%`}
                    aria-label="Controlled percentage slider"
                />
                <div className="mt-4 flex gap-2">
                    <button
                        onClick={() => setValue(0)}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                    >
                        Set to 0%
                    </button>
                    <button
                        onClick={() => setValue(50)}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                    >
                        Set to 50%
                    </button>
                    <button
                        onClick={() => setValue(100)}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                    >
                        Set to 100%
                    </button>
                </div>
            </div>
        </SandboxEditor>;
    }
};

export const AllVariants = {
    render: () => {
        return <SandboxEditor>
            <div className="w-full p-10 bg-gray-200 space-y-8">
                <div>
                    <h3 className="text-lg font-bold mb-4">Simple Slider</h3>
                    <Slider defaultValue={50} aria-label="Simple slider" />
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-4">Slider with Step Marks</h3>
                    <Slider defaultValue={50} step={25} showStepMarks={true} aria-label="Slider with marks" />
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-4">Range Slider</h3>
                    <Slider.Root defaultValue={50}>
                        <Slider.Track>
                            <Slider.RangeSlider aria-label="Range slider" defaultValue={[25, 75] as any} />
                        </Slider.Track>
                    </Slider.Root>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-4">Custom Marks</h3>
                    <Slider.Root defaultValue={50} step={25}>
                        <Slider.Track>
                            <Slider.Range>
                                <Slider.Thumb aria-label="Custom marks slider" />
                            </Slider.Range>
                            <Slider.Marks
                                customMarks={[
                                    { value: 0, label: 'Low' },
                                    { value: 25, label: 'Medium' },
                                    { value: 50, label: 'High' },
                                    { value: 75, label: 'Very High' },
                                    { value: 100, label: 'Max' }
                                ]}
                            />
                        </Slider.Track>
                    </Slider.Root>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-4">Vertical Slider</h3>
                    <div className="h-48 flex items-center">
                        <Slider defaultValue={75} orientation="vertical" aria-label="Vertical slider" />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold mb-4">Disabled Slider</h3>
                    <Slider defaultValue={30} disabled={true} aria-label="Disabled slider" />
                </div>
            </div>
        </SandboxEditor>;
    }
};
