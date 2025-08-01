import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Collapsible from '~/components/ui/Collapsible/Collapsible';

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

const RightArrowIcon = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
    return <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

export const Default = () => {
    return (
        <section>
            <SandboxEditor className="">
                <Collapsible.Root transitionDuration={100} className="group">
                    <Collapsible.Trigger className="flex items-center gap-2">
                        <div>
                            Trigger
                        </div>
                        <RightArrowIcon className='transition-transform duration-200 group-data-[state=open]:rotate-90'/>
                    </Collapsible.Trigger>

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
