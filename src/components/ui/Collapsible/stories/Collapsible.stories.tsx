import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Collapsible from '~/components/ui/Collapsible/Collapsible';
import Button from '../../Button/Button';
import CollapsibleItem from '../fragments/CollapsibleItem';

const Items = [
    {
        content:
            '“One of the penalties for refusing to participate in politics is that you end up being governed by your inferiors.“ – Plato'
    },
    {
        content:
            '“The superior man understands what is right; the inferior man understands what will sell.” – Confucius'
    },
    {
        content: '“There are no secrets on the internet.” – Paul Babicki'
    }
];

const meta: Meta<typeof Collapsible> = {
    component: Collapsible,
    title: 'WIP/Collapsible'
};

export default meta;

export const Default = () => {
    return (
        <section>
            <SandboxEditor className="">
                <Collapsible.Root transitionDuration={100}>
                    <Collapsible.Trigger>
                        <div>
                            Trigger
                        </div>
                    </Collapsible.Trigger>

                    <div className="bg-gray-200 p-4 rounded-md mt-4">
                            I have a dream of a scene between the green hills
                            Clouds pull away and the sunlight's revealed
                            People don't talk about keeping it real
                            It's understood that they actually will
                            And intoxicated and stimulated MCs
                            Staring in the trees, paranoid, are gone in the breeze

                    </div>

                    <Collapsible.Content className="space-y-2">
                        <div>
                            I have a dream of a scene between the green hills
                            Clouds pull away and the sunlight's revealed
                            People don't talk about keeping it real
                            It's understood that they actually will
                            And intoxicated and stimulated MCs
                            Staring in the trees, paranoid, are gone in the breeze

                        </div>
                        <div>
                            Watch them flee, hip-hop heads
                            Take a walk with me and what you'll see
                            Is a land where the sand is made up of crushed up wax
                        </div>
                        <div>
                            And the sky beyond you is krylon blue
                            And everybody speaks in a dialect of rhyme
                            And MCs have left materialism behind them
                        </div>
                        <div>
                            Meanwhile, I just grip my mic
                            And hope me and my team make it through alright
                            Because say what you will and say what you might
                            But don't ignore who it's for at the end of the night
                        </div>
                    </Collapsible.Content>
                </Collapsible.Root>
            </SandboxEditor>
        </section>
    );
};
