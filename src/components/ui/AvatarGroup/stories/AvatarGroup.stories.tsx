import AvatarGroup , { AvatarGroupProps } from '../AvatarGroup';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
const avatarImage1 = require('/assets/images/avatar-11.jpg');
const avatarImage2 = require('/assets/images/avatar-3.jpg');
const avatarImage3 = require('/assets/images/avatar-4.jpg');
import { JSX } from 'react';
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/AvatarGroup',
    component: AvatarGroup,
    render: (args: JSX.IntrinsicAttributes & AvatarGroupProps) => <SandboxEditor>
        <AvatarGroup {...args} />
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
    args: {
        avatars: [
            { src: avatarImage1, fallback: 'RU' },
            { src: avatarImage2, fallback: 'PK' },
            { src: avatarImage3, fallback: 'RU' }
        ]
    }
};

export const withFallback = {
    args: {
        avatars: [
            { src: '', fallback: 'RU' },
            { src: '', fallback: 'PK' },
            { src: '', fallback: 'RU' }
        ]
    }
};

export const withColor = {
    args: {
        avatars: [
            { src: '', fallback: 'RU' },
            { src: '', fallback: 'PK' },
            { src: '', fallback: 'RU' }
        ],
        color: 'blue'
    }
};
