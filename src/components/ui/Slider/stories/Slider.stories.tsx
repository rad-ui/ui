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
