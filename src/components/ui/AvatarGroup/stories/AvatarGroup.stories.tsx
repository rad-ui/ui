import AvatarGroup, { AvatarGroupProps } from '../AvatarGroup';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React, { JSX } from 'react';
const avatarImage1 = require('/assets/images/avatar-11.jpg');
const avatarImage2 = require('/assets/images/avatar-3.jpg');
const avatarImage3 = require('/assets/images/avatar-4.jpg');

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/AvatarGroup',
    component: AvatarGroup,
    render: (args: JSX.IntrinsicAttributes & AvatarGroupProps) => <SandboxEditor>
        <AvatarGroup.Root size='large' variant='circle' >
            <AvatarGroup.Item color='blue'>
                <AvatarGroup.Avatar src={args.avatars[0].src} alt={args.avatars[0].fallback} />
                <AvatarGroup.Fallback>{args.avatars[0].fallback}</AvatarGroup.Fallback>
            </AvatarGroup.Item>
            <AvatarGroup.Item color='red'>
                <AvatarGroup.Avatar src={args.avatars[1].src} alt={args.avatars[1].fallback} />
                <AvatarGroup.Fallback>{args.avatars[1].fallback}</AvatarGroup.Fallback>
            </AvatarGroup.Item>
            <AvatarGroup.Item color='green'>
                <AvatarGroup.Avatar src={args.avatars[2].src} alt={args.avatars[2].fallback} />
                <AvatarGroup.Fallback>{args.avatars[2].fallback}</AvatarGroup.Fallback>
            </AvatarGroup.Item>
        </AvatarGroup.Root>
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

export const withBrokenSrcFallback = {
    args: {
        avatars: [
            { src: '', fallback: 'RU' },
            { src: '', fallback: 'PK' },
            { src: '', fallback: 'RU' }
        ]
    }
};
