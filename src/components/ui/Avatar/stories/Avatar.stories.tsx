import Avatar, { AvatarProps } from '../Avatar';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React, { JSX } from 'react';
const avatarImage1 = require('/assets/images/avatar-1.jpg');
const avatarImage2 = require('/assets/images/avatar-11.jpg');

const AVATAR_SIZES = ['', 'sm', 'lg'] as const;
const AVATAR_VARIANTS = ['', 'square'] as const;

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Avatar',
    component: Avatar,
    render: (args: JSX.IntrinsicAttributes & AvatarProps.Root & AvatarProps.Image & { fallback: string }) => <SandboxEditor>
        <Avatar.Root color={args.color} size={args.size} variant={args.variant} customRootClass={args.customRootClass}>
            <Avatar.Image src={args.src} alt={args.alt} />
            <Avatar.Fallback>{args.fallback}</Avatar.Fallback>
        </Avatar.Root>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const withSrc = {
    args: {
        src: avatarImage1,
        fallback: 'PK',
        color: 'blue',
        size: 'sm',
        variant: 'square'
    }
};

export const withCustomRootClass = {
    args: {
        customRootClass: 'acme-corp',
        src: avatarImage1,
        fallback: 'PK'
    }
};

export const withFallback = {
    args: {
        fallback: 'RU'
    }
};

export const withBrokenSrc = {
    args: {
        src: 'https://i.pravatar.cc/abc/image-that-does-not-exist',
        fallback: 'PK'
    }
};

export const withAlt = {
    args: {
        src: avatarImage2,
        alt: 'alternative text',
        fallback: 'RU'
    }
};

export const withColor = {
    args: {
        fallback: 'RU',
        color: 'blue'
    }
};

export const Sizes = () => (
    <SandboxEditor>
        <div className='flex items-center gap-6'>
            {AVATAR_SIZES.map((size) => (
                <div key={size || 'default'} className='flex flex-col items-center gap-2'>
                    <p className='text-xs text-[var(--rad-ui-text-secondary)]'>{size || 'default'}</p>
                    <Avatar.Root size={size}>
                        <Avatar.Fallback>RU</Avatar.Fallback>
                    </Avatar.Root>
                </div>
            ))}
        </div>
    </SandboxEditor>
);

export const Variants = () => (
    <SandboxEditor>
        <div className='flex items-center gap-6'>
            {AVATAR_VARIANTS.map((variant) => (
                <div key={variant || 'default'} className='flex flex-col items-center gap-2'>
                    <p className='text-xs text-[var(--rad-ui-text-secondary)]'>{variant || 'default'}</p>
                    <Avatar.Root variant={variant}>
                        <Avatar.Fallback>RU</Avatar.Fallback>
                    </Avatar.Root>
                </div>
            ))}
        </div>
    </SandboxEditor>
);

const WithoutImgTemplate = () => {
    return <SandboxEditor>
        <Avatar.Root size='sm' variant='square'>
            <Avatar.Fallback>PK</Avatar.Fallback>
        </Avatar.Root>
    </SandboxEditor>;
};

export const withoutImg = {
    render: (args: JSX.IntrinsicAttributes & AvatarProps.Root & AvatarProps.Image) => <WithoutImgTemplate />
};
