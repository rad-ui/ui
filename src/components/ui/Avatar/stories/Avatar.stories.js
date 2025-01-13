import Avatar from '../Avatar';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import avatarImage1 from '/assets/images/avatar-1.jpg';
import avatarImage2 from '/assets/images/avatar-11.jpg';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Avatar',
    component: Avatar,
    render: (args) => <SandboxEditor>
        <Avatar {...args} />
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const withSrc = {
    args: {
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
