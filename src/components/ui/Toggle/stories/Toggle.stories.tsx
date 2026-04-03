import React from 'react';
import Toggle from '../Toggle';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'WIP/Toggle',
    component: Toggle
} as any;

const ItalicIcon = () => {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M10 4H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 20H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M14 4L10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
};

const BoldIcon = () => {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M8 5H13C15.7614 5 18 7.23858 18 10C18 12.7614 15.7614 15 13 15H8V5Z" stroke="currentColor" strokeWidth="2" />
            <path d="M8 15H14C16.7614 15 19 17.2386 19 20C19 22.7614 16.7614 25 14 25H8V15Z" stroke="currentColor" strokeWidth="2" transform="translate(0 -6)" />
        </svg>
    );
};

export const Basic = {
    render: () => {
        return (
            <SandboxEditor>
                <div className="flex justify-center gap-4 py-16">
                    <Toggle defaultPressed onPressedChange={() => {}}>
                        <ItalicIcon />
                        <span>Italic</span>
                    </Toggle>
                    <Toggle onPressedChange={() => {}}>
                        <BoldIcon />
                        <span>Bold</span>
                    </Toggle>
                </div>
            </SandboxEditor>
        );
    }
};
