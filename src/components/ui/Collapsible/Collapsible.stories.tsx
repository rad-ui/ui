import React from 'react';
import {Meta} from '@storybook/react';
import Collapsible from './Collapsible';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const placeholderText= ['“One of the penalties for refusing to participate in politics is that you end up being governed by your inferiors.“ – Plato',
    '“The superior man understands what is right; the inferior man understands what will sell.” – Confucius',
    '“There are no secrets on the internet.” – Paul Babicki'];


const meta: Meta<typeof Collapsible> = {
    component: Collapsible,
    title: 'UI/Data Display/Collapsible',
};

export default meta;

export const Default = () => {
    return (<section>
        <SandboxEditor className=''>
            <Collapsible>
                <div className='grid gap-4 border-2 border-zinc-200 p-2'>
                    {placeholderText.map((text) =>
                        <p key={text}> {text} </p>,
                    )}
                </div>
            </Collapsible>
        </SandboxEditor>
    </section>
    );
};
