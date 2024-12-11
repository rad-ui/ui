import AvatarGroup from '../AvatarGroup';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

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
            { src: 'https://i.pravatar.cc/64', fallback: 'RU' },
            { src: 'https://i.pravatar.cc/65', fallback: 'PK' },
            { src: 'https://i.pravatar.cc/66', fallback: 'RU' }
        ]
    }
};
