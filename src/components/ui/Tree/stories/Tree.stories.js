import Tree from '../Tree';

import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'WIP/Tree',
    component: Tree,
    render: (args) => <SandboxEditor>
        <div >
            <Tree
                items={[
                    {
                        label: 'hello',
                        expanded: true,
                        items: [
                            {
                                label: 'hello child 1',
                                expanded: false
                            }
                        ]
                    },
                    {
                        label: 'world',
                        expanded: false
                    }
                ]}>
                hello
            </Tree>
        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ''
    }
};
