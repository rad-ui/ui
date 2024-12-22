import Tooltip from '../Tooltip';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import ScrollPlayground from '~/components/tools/ScrollPlayground/ScrollPlayground';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Tooltip',
    component: Tooltip,
    render: (args) => <SandboxEditor>
        <ScrollPlayground>
            <Tooltip className="text-gray-1000" label="This is a tooltip" placement='left' {...args}>
                    Hello, hover me!
            </Tooltip>
        </ScrollPlayground>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ''
    }
};

const PlacementTemplate = (args) => {
    return (
        <div className='h-[800px] w-[500px] flex items-center justify-center mx-auto border border-gray-200 rounded-md'>
            <Tooltip className="text-gray-1000" label="This is a tooltip" placement='left' {...args}>
                    Hello, hover me!
            </Tooltip>
        </div>
    );
};

// Basic placements
export const PlacementTop = PlacementTemplate.bind({});
PlacementTop.args = {
    placement: 'top'
};

export const PlacementBottom = PlacementTemplate.bind({});
PlacementBottom.args = {
    placement: 'bottom'
};

export const PlacementLeft = PlacementTemplate.bind({});
PlacementLeft.args = {
    placement: 'left'
};

export const PlacementRight = PlacementTemplate.bind({});
PlacementRight.args = {
    placement: 'right'
};

// Top variations
export const PlacementTopStart = PlacementTemplate.bind({});
PlacementTopStart.args = {
    placement: 'top-start'
};

export const PlacementTopEnd = PlacementTemplate.bind({});
PlacementTopEnd.args = {
    placement: 'top-end'
};

// Bottom variations
export const PlacementBottomStart = PlacementTemplate.bind({});
PlacementBottomStart.args = {
    placement: 'bottom-start'
};

export const PlacementBottomEnd = PlacementTemplate.bind({});
PlacementBottomEnd.args = {
    placement: 'bottom-end'
};

// Left variations
export const PlacementLeftStart = PlacementTemplate.bind({});
PlacementLeftStart.args = {
    placement: 'left-start'
};

export const PlacementLeftEnd = PlacementTemplate.bind({});
PlacementLeftEnd.args = {
    placement: 'left-end'
};

// Right variations
export const PlacementRightStart = PlacementTemplate.bind({});
PlacementRightStart.args = {
    placement: 'right-start'
};

export const PlacementRightEnd = PlacementTemplate.bind({});
PlacementRightEnd.args = {
    placement: 'right-end'
};
