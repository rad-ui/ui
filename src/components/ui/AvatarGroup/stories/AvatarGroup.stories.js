import AvatarGroup from '../AvatarGroup';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import avatarImage1 from '/assets/images/avatar-11.jpg';
import avatarImage2 from '/assets/images/avatar-3.jpg';
import avatarImage3 from '/assets/images/avatar-4.jpg';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/AvatarGroup',
    component: AvatarGroup,
    render: (args) => <SandboxEditor>
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
            { src: '', fallback: 'RU'},
            { src: '', fallback: 'PK'},
            { src: '', fallback: 'RU' }
        ]
    }
};

export const withColor = {
    args: {
        avatars: [
            { src: '', fallback: 'RU'},
            { src: '', fallback: 'PK'},
            { src: '', fallback: 'RU' }
        ],
        color: 'blue' 
    }
}
