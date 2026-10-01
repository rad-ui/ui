import React from 'react';
import TextField from '../TextField';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import { Search, X } from 'lucide-react';

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
    <label htmlFor={htmlFor} className='text-sm font-medium text-[var(--rad-ui-text-primary)]'>
        {children}
    </label>
);

const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div className='flex flex-col gap-2'>
        {children}
    </div>
);

export default {
    title: 'Components/TextField',
    component: TextField,
    render: () => <SandboxEditor>
        <div className='flex flex-col gap-8'>
            <Wrapper>
                <Label htmlFor='tf-basic'>Basic</Label>
                <TextField id='tf-basic' placeholder='Type here...' />
            </Wrapper>

            <Wrapper>
                <Label htmlFor='tf-start-slot'>With start slot</Label>
                <TextField
                    id='tf-start-slot'
                    placeholder='Search...'
                    startSlot={<Search size={16} aria-hidden='true' />}
                />
            </Wrapper>

            <Wrapper>
                <Label htmlFor='tf-end-slot'>With end slot</Label>
                <TextField
                    id='tf-end-slot'
                    placeholder='Filter results'
                    endSlot={<X size={16} aria-hidden='true' />}
                />
            </Wrapper>

            <Wrapper>
                <Label htmlFor='tf-both-slots'>With both slots</Label>
                <TextField
                    id='tf-both-slots'
                    placeholder='Search the docs'
                    startSlot={<Search size={16} aria-hidden='true' />}
                    endSlot={<X size={16} aria-hidden='true' />}
                />
            </Wrapper>

            <Wrapper>
                <Label htmlFor='tf-email'>Email type</Label>
                <TextField id='tf-email' type='email' placeholder='you@example.com' />
            </Wrapper>

            <Wrapper>
                <Label htmlFor='tf-disabled'>Disabled</Label>
                <TextField id='tf-disabled' placeholder='Cannot focus' disabled />
            </Wrapper>
        </div>
    </SandboxEditor>
};

export const Basic = {
    render: () => <SandboxEditor>
        <div className='flex flex-col gap-2'>
            <Label htmlFor='tf-story-basic'>Basic</Label>
            <TextField id='tf-story-basic' placeholder='Type here...' />
        </div>
    </SandboxEditor>
};

export const WithSlots = {
    render: () => <SandboxEditor>
        <div className='flex flex-col gap-2'>
            <Label htmlFor='tf-story-slots'>With start slot</Label>
            <TextField
                id='tf-story-slots'
                placeholder='Search...'
                startSlot={<Search size={16} aria-hidden='true' />}
            />
        </div>
    </SandboxEditor>
};
