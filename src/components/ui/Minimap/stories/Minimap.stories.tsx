import Minimap from '../Minimap';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';
import Text from '~/components/ui/Text/Text';
import Steps from '../../Steps/Steps';

const steps = [
    {
        title: 'Account Setup',
        description: 'Create your account and verify your email address'
    },
    {
        title: 'Profile Configuration',
        description: 'Add your personal information and preferences'
    },
    {
        title: 'Payment Method',
        description: 'Set up your billing information and payment details'
    },
    {
        title: 'Confirmation',
        description: 'Review your setup and complete the registration'
    }
];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'WIP/Minimap',
    component: Minimap,
    render: () => <SandboxEditor>
        <div className='mt-5'>
            <Minimap.Provider>
                <Minimap.Root>
                    {steps.map((step, index) => (
                        <Minimap.Item key={index} value={index}>
                            <Minimap.Track>
                                <Minimap.Bubble>{index + 1}</Minimap.Bubble>
                                <Minimap.Line />
                            </Minimap.Track>
                            <Minimap.Content>
                                <>{step.description}</>
                            </Minimap.Content>
                        </Minimap.Item>
                    ))}
                </Minimap.Root>

            </Minimap.Provider>

        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {};

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const minimapItems = [
    {
        value: '1',
        title: 'Step 1',
        description: LOREM_IPSUM
    },
    {
        value: '2',
        title: 'Step 2',
        description: LOREM_IPSUM
    },
    {
        value: '3',
        title: 'Step 3',
        description: LOREM_IPSUM
    },
    {
        value: '4',
        title: 'Step 4',
        description: LOREM_IPSUM
    }
];

const MinimapProvider = () => {
    return <SandboxEditor>
        <Minimap.Provider
            scrollable
            className='overflow-y-auto flex gap-5 relative w-full justify-between'
            style={{ height: '800px' }}
        >
            <div className='max-w-[400px] w-auto'>
                <Text className='mb-5'>Main Content</Text>
                <Steps.Root>
                    {minimapItems.map((item) => (
                        <Minimap.Waypoint key={item.value} value={item.value} >
                            <Steps.Item value={item.value} >
                                <Steps.Track>
                                    <Steps.Bubble>{item.value}</Steps.Bubble>
                                    <Steps.Line />
                                </Steps.Track>
                                <Steps.Content className="!pb-[40px]">
                                    <Text>{item.description}</Text>
                                </Steps.Content>
                            </Steps.Item>
                        </Minimap.Waypoint>
                    ))}
                </Steps.Root>
            </div>
            <div className='w-[300px] flex-none sticky top-[10px]'>
                <Text className='mb-5'>Minimap</Text>
                <Minimap.Root>
                    {minimapItems.map((item) => (
                        <Minimap.Item key={item.value} value={item.value}>
                            <Minimap.Track>
                                <Minimap.Bubble>{item.value}</Minimap.Bubble>
                                <Minimap.Line />
                            </Minimap.Track>
                            <Minimap.Content>
                                <Text>{item.title}</Text>
                            </Minimap.Content>
                        </Minimap.Item>
                    ))}
                </Minimap.Root>

            </div>
        </Minimap.Provider>
    </SandboxEditor>;
};

export const Provider = {
    render: () => <MinimapProvider />
};
