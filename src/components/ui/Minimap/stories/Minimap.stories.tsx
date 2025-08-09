import Minimap from '../Minimap';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import React from 'react';
import Text from '~/components/ui/Text/Text';
import Steps from '../../Steps/Steps';

const steps = [
    {
        title: 'Account Setup',
        description: 'Create your account and verify your email address'
    },
    {
        title: 'Profile Configuration',
        description: 'Add your personal information and preferences'
    },
    {
        title: 'Payment Method',
        description: 'Set up your billing information and payment details'
    },
    {
        title: 'Confirmation',
        description: 'Review your setup and complete the registration'
    }
];

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'WIP/Minimap',
    component: Minimap,
    render: () => <SandboxEditor>
        <div className='mt-5'>
            <Minimap.Provider>
                <Minimap.Root>
                    {steps.map((step, index) => (
                        <Minimap.Item key={index} value={index}>
                            <Minimap.Track>
                                <Minimap.Bubble>{index + 1}</Minimap.Bubble>
                                <Minimap.Line />
                            </Minimap.Track>
                            <Minimap.Content>
                                <>{step.description}</>
                            </Minimap.Content>
                        </Minimap.Item>
                    ))}
                </Minimap.Root>

            </Minimap.Provider>

        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {};

const minimapItems = [
    {
        value: '1',
        title: 'Step 1',
        description: 'Step 1 description with extensive details about the initial setup process. This foundational step is absolutely critical for establishing the base configuration of your account and ensuring all fundamental information is properly documented and verified. During this phase, users will be required to provide essential personal details, create secure authentication credentials, and establish their primary contact information. The system will perform comprehensive validation checks to ensure data integrity and compliance with security standards. This step serves as the cornerstone for all subsequent operations and must be completed with careful attention to detail to prevent any issues in later stages of the setup process.'
    },
    {
        value: '2',
        title: 'Step 2',
        description: 'Step 2 description with comprehensive information about the advanced configuration and customization process. This sophisticated step focuses on tailoring your preferences, settings, and workflow parameters to perfectly align with your specific business requirements and operational needs. Users will have the opportunity to configure detailed system preferences, establish workflow automation rules, set up notification preferences, and customize the user interface to match their organizational branding and operational procedures. The configuration options include advanced security settings, data retention policies, integration preferences, and performance optimization parameters. This step is designed to provide maximum flexibility and control over the system behavior.'
    },
    {
        value: '3',
        title: 'Step 3',
        description: 'Step 3 description with detailed information about the integration and connectivity setup process. This complex step involves establishing connections with external systems, configuring API endpoints, setting up data synchronization protocols, and implementing automated workflows that span multiple platforms and services. Users will configure database connections, establish secure communication channels, set up webhook endpoints, and configure real-time data streaming capabilities. The integration process includes comprehensive testing procedures to ensure all connections are stable, secure, and performing optimally. This step is essential for creating a seamless ecosystem where all your tools and services work together harmoniously.'
    },
    {
        value: '4',
        title: 'Step 4',
        description: 'Step 4 description with thorough information about the final validation and deployment process. This concluding step involves comprehensive system testing, performance optimization, security auditing, and final deployment preparation. Users will review all configurations, validate system performance under various load conditions, conduct security penetration testing, and ensure compliance with all regulatory requirements. The deployment process includes creating backup systems, establishing monitoring and alerting mechanisms, and implementing disaster recovery procedures. This step ensures that your system is production-ready, secure, scalable, and fully optimized for your specific use case and operational requirements.'
    }
];

const MinimapProvider = () => {
    return <SandboxEditor>
        <Minimap.Provider>
            <div className='flex gap-5 relative w-full overflow-y-auto justify-between h-[800px]'>
                <div className='max-w-[400px] w-auto'>
                    <Text className='mb-5'>Main Content</Text>
                    <Steps.Root>
                        {minimapItems.map((item) => (
                            <Minimap.Waypoint key={item.value} value={item.value} >
                                <Steps.Item value={item.value} >
                                    <Steps.Track>
                                        <Steps.Bubble>{item.value}</Steps.Bubble>
                                        <Steps.Line />
                                    </Steps.Track>
                                    <Steps.Content className="!pb-[40px]">
                                        <Text>{item.description}</Text>
                                    </Steps.Content>
                                </Steps.Item>
                            </Minimap.Waypoint>
                        ))}
                    </Steps.Root>
                </div>
                <div className='w-[300px] flex-none sticky top-[10px]'>
                    <Text className='mb-5'>Minimap</Text>
                    <Minimap.Root>
                        {minimapItems.map((item) => (
                            <Minimap.Item value={item.value}>
                                <Minimap.Track>
                                    <Minimap.Bubble>{item.value}</Minimap.Bubble>
                                    <Minimap.Line />
                                </Minimap.Track>
                                <Minimap.Content>
                                    <Text>{item.title}</Text>
                                </Minimap.Content>
                            </Minimap.Item>
                        ))}
                    </Minimap.Root>

                </div>
            </div>
        </Minimap.Provider>
    </SandboxEditor>;
};

export const Provider = {
    render: () => <MinimapProvider />
};
