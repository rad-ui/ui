import Skeleton from '../Skeleton';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Card from '~/components/ui/Card/Card';
import Accordion from '~/components/ui/Accordion/Accordion';
import Tabs from '~/components/ui/Tabs/Tabs';
import React, { useEffect } from 'react';
import Button from '~/components/ui/Button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Skeleton',
    component: Skeleton,
    render: () => {
        const [loading, setLoading] = React.useState(true);

        const items = [
            {
                title: 'The Matrix (1999)',
                content: <div>
                    <ul>
                        <li>Summary: A hacker discovers the true nature of reality and his role in the war against its controllers.</li>
                        <li>Key Characters: Neo, Morpheus, Trinity, Agent Smith</li>
                        <li>Memorable Quote: "There is no spoon."</li>
                    </ul>
                </div>
            },
            {
                title: 'The Dark Knight (2008)',
                content: <div>
                    <ul>
                        <li>Summary: Batman faces his greatest challenge yet as the Joker wreaks havoc on Gotham City.</li>
                        <li>Key Characters: Batman, Joker, Harvey Dent, Alfred</li>
                        <li>Memorable Quote: "Why so serious?"</li>
                    </ul>
                </div>
            },
            {
                title: 'Inception (2010)',
                content: <div>
                    <ul>
                        <li>Summary: A thief who enters people's dreams to steal their secrets must plant an idea in someone's mind.</li>
                        <li>Key Characters: Cobb, Ariadne, Mal, Saito</li>
                        <li>Memorable Quote: "You mustn't be afraid to dream a little bigger, darling."</li>
                    </ul>
                </div>
            },
            {
                title: 'The Shawshank Redemption (1994)',
                content: <div>
                    <ul>
                        <li>Summary: A banker is wrongly convicted</li>
                        <li>Key Characters: Andy Dufresne, Red, Warden Norton, Tommy</li>
                        <li>Memorable Quote: "Get busy living or get busy dying."</li>
                    </ul>
                </div>
            }
        ];

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
                    <Skeleton loading={loading} height="20px" width="600px">
                Hello, how you doing?
                    </Skeleton>
                </div>

                <div>
                    <Skeleton loading={loading} height="40px" width="600px">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </Skeleton>
                </div>

                <div>
                    <Skeleton loading={loading} height="40px" width="600px">
                        <Button>Click me</Button>
                    </Skeleton>
                </div>
                <div className='mt-5'>
                    <Skeleton loading={loading}height="40px" width="100%">
                        <Card>Click me</Card>
                    </Skeleton>
                </div>

                <div className='mt-5'>
                    <Skeleton loading={loading} height="200px" width="100%">
                        <Accordion.Root >
                                    {items.map((item, index) => (
                                        <Accordion.Item value={index} key={index}>
                                            <Accordion.Header>
                                                <Accordion.Trigger>
                                                    {item.title}
                                                </Accordion.Trigger>
                                            </Accordion.Header>
                                            <Accordion.Content index={index}>
                                                {item.content}
                                            </Accordion.Content>
                                        </Accordion.Item>
                                    ))}
                                </Accordion.Root>
                    </Skeleton>
                </div>  

                <div className='mt-5'>
                    <Skeleton loading={loading} height="130px" width="100%">
                        <Tabs.Root defaultValue="tab2">
                                            <Tabs.List>
                                                <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                                                <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                                                <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                                            </Tabs.List>
                        
                                            <Tabs.Content value="tab1">
                                                <div className="p-4 bg-gray-100 mt-2">
                                                    Content for Tab 1 (Uncontrolled)
                                                </div>
                                            </Tabs.Content>
                                            <Tabs.Content value="tab2">
                                                <div className="p-4 bg-gray-100 mt-2">
                                                    Content for Tab 2 (Uncontrolled) - This tab is selected by default
                                                </div>
                                            </Tabs.Content>
                                            <Tabs.Content value="tab3">
                                                <div className="p-4 bg-gray-100 mt-2">
                                                    Content for Tab 3 (Uncontrolled)
                                                </div>
                                            </Tabs.Content>
                                        </Tabs.Root>
                    </Skeleton>
                </div>  

                <div className='mt-5'>
                    <Skeleton loading={loading} height="100px" width="100%"> height 100px and width 100%</Skeleton></div>    

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

export const Shapes = () => {
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
  
    return (
      
      <SandboxEditor>
        <div className='flex flex-col space-y-4'>
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

                    
        <Skeleton height="100px" width="100px" radius="50%" loading={loading}>
          round
        </Skeleton>
        </div>
        <div>
        <Skeleton height="100px" width="100px" radius="10px" loading={loading}>
          Rounded corners
        </Skeleton>
        </div>
        <div>
        <Skeleton height="200px" width="150px" radius="50%" loading={loading}>
          Oval
        </Skeleton>
        </div>
        </div>
        </SandboxEditor >
    )

  };