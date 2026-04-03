import React from 'react';
import ToggleGroup from '../ToggleGroup';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'WIP/ToggleGroup',
    component: ToggleGroup
} as any;

const BoldIcon = () => {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M8 5H13C15.7614 5 18 7.23858 18 10C18 12.7614 15.7614 15 13 15H8V5Z" stroke="currentColor" strokeWidth="2" />
            <path d="M8 15H14C16.7614 15 19 17.2386 19 20C19 22.7614 16.7614 25 14 25H8V15Z" stroke="currentColor" strokeWidth="2" transform="translate(0 -6)" />
        </svg>
    );
};

const ItalicIcon = () => {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M10 4H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 20H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M14 4L10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
};

const UnderlineIcon = () => {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M8 4V11C8 13.7614 10.2386 16 13 16C15.7614 16 18 13.7614 18 11V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
};

export const Basic = {
    render: () => {
        return (
            <SandboxEditor>
                <div className="flex justify-center py-16">
                    <ToggleGroup.Root type="multiple" defaultValue={['bold']}>
                        <ToggleGroup.Item value="bold" aria-label="Bold">
                            <BoldIcon />
                        </ToggleGroup.Item>
                        <ToggleGroup.Item value="italic" aria-label="Italic">
                            <ItalicIcon />
                        </ToggleGroup.Item>
                        <ToggleGroup.Item value="underline" aria-label="Underline">
                            <UnderlineIcon />
                        </ToggleGroup.Item>
                    </ToggleGroup.Root>
                </div>
            </SandboxEditor>
        );
    }
};
