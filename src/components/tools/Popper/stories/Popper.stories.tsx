import React from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Popper from '../Popper';

// eslint-disable-next-line no-unused-vars
import type { Meta, StoryObj } from '@storybook/react';

type Story = StoryObj<typeof Popper>;

const meta: Meta<typeof Popper> = {
    component: Popper,
    title: 'tools/popper'
};

export default meta;

export const Default: Story = {
    render: ({ }) => {
        return (
            <SandboxEditor>
                <Popper.Root
                    placement={'right'}
                >
                    <Popper.Trigger
                        className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl"
                    > See Quote </Popper.Trigger>

                    <Popper.Content showArrow={true} className='bg-indigo-600 rounded max-w-[30ch] p-4'>
                        <blockquote cite="https://www.imdb.com/title/tt0373732/characters/nm0936762/">
                            <p> You can’t change the world, but you gotta at least try to change your part in it. - Robert Freeman, Boondocks </p>
                        </blockquote>
                        <p className='mt-3'>{'—Robert \'Granddad\' Freeman, '}<cite>The Boondocks</cite></p>

                    </Popper.Content>
                </Popper.Root>
            </SandboxEditor>
        );
    }
};
