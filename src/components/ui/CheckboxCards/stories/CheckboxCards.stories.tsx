import React, { useState } from 'react';
import CheckboxCards from '../CheckboxCards';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

const CheckboxCardsExample = (args:any) => {
    const options = [
        {
            id: 'kubernetes',
            value: 'kubernetes',
            title: 'Kubernetes',
            description: 'Run GPU workloads on a K8s configured cluster. This is the default.'
        },
        {
            id: 'vm',
            value: 'vm',
            title: 'Virtual Machine',
            description: 'Access a VM configured cluster to run workloads. (Coming soon)'
        }
    ];
    const [checked, setChecked] = useState(['kubernetes']);

    const handleChange = (value: string[]) => {
        setChecked(value);
    };

    return (
        <SandboxEditor>
            <div className="w-full max-w-2xl space-y-4">
                <div>
                    <h2 className="text-xl font-semibold mb-1">Compute Environment</h2>
                    <p className="text-sm text-gray-700">
                        Select the compute environment for your cluster.
                    </p>
                </div>
                <CheckboxCards.Root
                    name="compute-environment"
                    value={checked}
                    onValueChange={handleChange}
                    {...args}
                >
                    {options.map((option) => (
                        <CheckboxCards.Item key={option.id} value={option.value}>
                            <div className="flex-1">
                                <h3 className="font-semibold mb-1">{option.title}</h3>
                                <p className="text-sm text-gray-700">{option.description}</p>
                            </div>
                            <CheckboxCards.Content>
                                <CheckboxCards.Indicator />
                            </CheckboxCards.Content>
                        </CheckboxCards.Item>
                    ))}
                </CheckboxCards.Root>
            </div>
        </SandboxEditor>
    );
};

export default {
    title: 'WIP/CheckboxCards',
    component: CheckboxCards,
    render: (args:any) => <CheckboxCardsExample {...args} />
};

export const Basic = {};
