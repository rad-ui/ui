import Skeleton from './Skeleton';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

import React, { useEffect } from 'react';
import Button from '~/components/ui/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'UI/Data Display/Skeleton',
    component: Skeleton,
    render: (args) => {
        const [loading, setLoading] = React.useState(true);

        const timeOutLoading = () => {
            const timeout = setTimeout(() => {
                setLoading(false);
            }, 3000);

            return () => clearTimeout(timeout);
        };
        useEffect(() => {
            timeOutLoading();
        }, []);

        return <SandboxEditor>
            <div className='mt-5'>
                <div>
                    <Button
                        onClick={
                            () => {
                                setLoading(true);
                                timeOutLoading();
                            }

                        }>
                        Trigger loading
                    </Button>
                </div>
                <div>
                    <Skeleton loading={loading}>
                Hello, how you doing?
                    </Skeleton>
                </div>

                <div>
                    <Skeleton loading={loading}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </Skeleton>
                </div>

                <div>
                    <Skeleton loading={loading}>
                        <Button>Click me</Button>
                    </Skeleton>
                </div>
            </div>
        </SandboxEditor>;
    }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ''
    }
};
