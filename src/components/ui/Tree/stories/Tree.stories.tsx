import Tree from '../Tree';
import React from 'react';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Card from '~/components/ui/Card/Card';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

const items = [
    {
        label: 'hello',
        expanded: true,
        items: [
            {
                label: 'hello child 1',
                items: [
                    {
                        label: 'hello child 1.1',
                        expanded: false,
                        items: [
                            {
                                label: 'hello child 1.1.1',
                                expanded: false,
                                items: [
                                    {
                                        label: 'hello child 1.1.1.1',
                                        expanded: false,
                                        items: [
                                            {
                                                label: 'hello child 1.1.1.1.1',
                                                expanded: false
                                            },
                                            {
                                                label: 'hello child 1.1.1.1.2',
                                                expanded: false
                                            },
                                            {
                                                label: 'hello child 1.1.1.1.3',
                                                expanded: false
                                            },
                                            {
                                                label: 'hello child 1.1.1.1.4',
                                                expanded: false
                                            },
                                            {
                                                label: 'hello child 1.1.1.1.5',
                                                expanded: false
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ],
                expanded: false
            }
        ]
    },
    {
        label: 'world',
        expanded: false,
        items: [
            {
                label: 'world child 1',
                expanded: false
            }
        ]
    }
];

const cardAnatomyItems = [
    {
        label: 'Card',
        expanded: true,
        items: [
            {
                label: 'CardHeader',
                expanded: true,
                items: [
                    {
                        label: 'CardTitle',
                        expanded: false
                    },
                    {
                        label: 'CardDescription',
                        expanded: false
                    },
                    {
                        label: 'CardAction',
                        expanded: false
                    }
                ]
            },
            {
                label: 'CardContent',
                expanded: false
            },
            {
                label: 'CardFooter',
                expanded: false
            }
        ]
    }
];

export default {
    title: 'Components/Tree',
    component: Tree,
    render: () => <SandboxEditor>
        <div >
            <Tree.Root>
                {items.map((item) => (
                    <Tree.Item key={item.label} item={item}>
                        {item.label}
                    </Tree.Item>
                ))}
            </Tree.Root>
        </div>
    </SandboxEditor>
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const All = {
    args: {
        className: ''
    }
};

// Demonstrates centralized selection state management using Tree.Item props
const TreeExampleWithSelection = () => {
    const [selectedLabels, setSelectedLabels] = React.useState<Set<string>>(new Set());

    const toggleSelect = (id: string, item: any) => {
        setSelectedLabels((prev) => {
            const next = new Set(prev);
            if (next.has(item.label)) {
                next.delete(item.label);
            } else {
                next.add(item.label);
            }
            return next;
        });
    };

    const getIsSelected = (itm: any) => selectedLabels.has(itm.label);

    return (
        <SandboxEditor>
            <div>
                <Tree.Root>
                    {items.map((item) => (
                        <Tree.Item
                            key={item.label}
                            item={item}
                            isSelected={getIsSelected(item)}
                            onToggleSelect={toggleSelect}
                            getIsSelected={getIsSelected}
                        >
                            {item.label}
                        </Tree.Item>
                    ))}
                </Tree.Root>
            </div>
        </SandboxEditor>
    );
};

export const WithSelection = {
    render: () => <TreeExampleWithSelection />
};

const CardAnatomyTree = () => (
    <SandboxEditor>
        <div className="flex w-full items-center justify-center p-8 md:p-14">
            <Card
                variant="soft"
                className="w-full max-w-[50rem] border-none bg-[var(--rad-ui-surface-subtle)] px-5 py-10 shadow-none md:px-7 md:py-12"
            >
                <Tree.Root
                    aria-label="Card anatomy"
                    className="
                        w-fit gap-[0.18rem]
                        [--tree-line:var(--rad-ui-text-primary)]
                        [--tree-branch-gap:0.62rem]
                        [&_.rad-ui-tree-item]:!min-h-0
                        [&_.rad-ui-tree-item]:!justify-start
                        [&_.rad-ui-tree-item]:!gap-[0.7rem]
                        [&_.rad-ui-tree-item]:!border-none
                        [&_.rad-ui-tree-item]:!px-0
                        [&_.rad-ui-tree-item]:!py-[0.14rem]
                        [&_.rad-ui-tree-branch]:!m-0
                        [&_.rad-ui-tree-branch]:!ms-0
                        [&_.rad-ui-tree-branch]:!gap-[0.18rem]
                        [&_.rad-ui-tree-branch]:!border-s-[1.5px]
                        [&_.rad-ui-tree-branch]:!border-[var(--rad-ui-text-primary)]
                        [&_.rad-ui-tree-branch]:!ps-[0.62rem]
                        [&_.rad-ui-tree-branch_.rad-ui-tree-item]:before:!start-[-0.62rem]
                        [&_.rad-ui-tree-branch_.rad-ui-tree-item]:before:!top-1/2
                        [&_.rad-ui-tree-branch_.rad-ui-tree-item]:before:!block
                        [&_.rad-ui-tree-branch_.rad-ui-tree-item]:before:!h-[1.5px]
                        [&_.rad-ui-tree-branch_.rad-ui-tree-item]:before:!w-[0.5rem]
                        [&_.rad-ui-tree-branch_.rad-ui-tree-item]:before:!-translate-y-1/2
                        [&_.rad-ui-tree-branch_.rad-ui-tree-item]:before:!bg-[var(--rad-ui-text-primary)]
                        [&_.rad-ui-tree-item-chevron]:order-last
                        [&_.rad-ui-tree-item-chevron]:ms-[0.28rem]
                        [&_.rad-ui-tree-item-chevron]:inline-flex
                        [&_.rad-ui-tree-item-chevron]:w-[0.9rem]
                        [&_.rad-ui-tree-item-chevron]:min-w-[0.9rem]
                        [&_.rad-ui-tree-item-chevron]:items-center
                        [&_.rad-ui-tree-item-chevron]:justify-center
                        [&_.rad-ui-tree-item-chevron]:text-[var(--rad-ui-text-secondary)]
                        [&_.rad-ui-tree-item-label]:!flex-none
                    "
                >
                    {cardAnatomyItems.map((item) => (
                        <Tree.Item
                            key={item.label}
                            item={item}
                            className="
                                bg-transparent font-mono text-[0.98rem] font-normal leading-[1.4] text-[var(--rad-ui-text-primary)] shadow-none
                                hover:bg-transparent
                                data-[selected=true]:border-transparent data-[selected=true]:bg-transparent
                                data-[toggled=true]:bg-transparent
                                focus:!bg-[var(--rad-ui-surface-subtle)]
                                focus:!outline-none
                                focus:!shadow-[var(--rad-ui-focus-ring-shadow-inset),var(--rad-ui-focus-ring-shadow-sm)]
                                focus-visible:!bg-[var(--rad-ui-surface-subtle)]
                                focus-visible:!outline-none
                                focus-visible:!shadow-[var(--rad-ui-focus-ring-shadow-inset),var(--rad-ui-focus-ring-shadow-sm)]
                                [tabindex='0']:relative [tabindex='0']:z-[1]
                                [tabindex='0']:rounded-[0.35rem]
                                [tabindex='0']:!bg-[var(--rad-ui-surface-subtle)]
                                [tabindex='0']:!shadow-[var(--rad-ui-focus-ring-shadow-inset),var(--rad-ui-focus-ring-shadow-sm)]
                            "
                        >
                            {item.label}
                        </Tree.Item>
                    ))}
                </Tree.Root>
            </Card>
        </div>
    </SandboxEditor>
);

export const CardAnatomy = {
    render: () => <CardAnatomyTree />
};
