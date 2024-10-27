import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Collapsible from '~/components/ui/Collapsible/Collapsible';
import Button from '~/components/ui/Button/Button';

const placeholderText = ['“One of the penalties for refusing to participate in politics is that you end up being governed by your inferiors.“ – Plato',
    '“The superior man understands what is right; the inferior man understands what will sell.” – Confucius',
    '“There are no secrets on the internet.” – Paul Babicki'];

const meta: Meta<typeof Collapsible> = {
    component: Collapsible,
    title: 'Components/Collapsible'
};

export default meta;

export const Default = () => {
    return (<section>
        <SandboxEditor className=''>
            <Collapsible>
                <div className='grid gap-4 border-2 border-zinc-200 p-2'>
                    {placeholderText.map((text) =>
                        <p key={text}> {text} </p>
                    )}
                </div>
            </Collapsible>
        </SandboxEditor>
    </section>
    );
};

export const WithTitle = () => {
    return (<section>
        <SandboxEditor className=''>
            <Collapsible title='Hello World'>
                <div className='grid gap-4 border-2 border-zinc-200'>
                    {placeholderText.map((text) =>
                        <p key={text}> {text} </p>
                    )}
                </div>
            </Collapsible>
        </SandboxEditor>
    </section>
    );
};

export const ExternalTrigger = () => {
    const [open, setOpen] = useState(true);

    const toggleHidden = () => setOpen((p) => !p);

    return (<section>
        <SandboxEditor className=''>
            <Collapsible
                title='Quotes'
                open={open}
                trigger={<Button onClick={toggleHidden}>{open ? 'OPEN' : 'CLOSE'}</Button>}
            >

                <div className='grid gap-4 border-2 border-zinc-200'>
                    {placeholderText.map((text) =>
                        <p key={text}> {text} </p>
                    )}
                </div>

            </Collapsible>
        </SandboxEditor>
    </section>
    );
};
