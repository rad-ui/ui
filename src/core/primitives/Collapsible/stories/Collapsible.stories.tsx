import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CollapsiblePrimitive from '../';

const meta: Meta<typeof CollapsiblePrimitive> = {
    title: 'Primitives/Collapsible',
    component: CollapsiblePrimitive,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof CollapsiblePrimitive>;

export const Default: Story = {
    render: () => {
        return (
            <div style={{ width: '300px', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}>
                <CollapsiblePrimitive.Root defaultOpen={false}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
                        <span>Click me to toggle content</span>
                        <CollapsiblePrimitive.Trigger
                            style={{
                                background: 'none',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                padding: '4px 8px',
                                cursor: 'pointer'
                            }}
                        >
                            Toggle
                        </CollapsiblePrimitive.Trigger>
                    </div>
                    <CollapsiblePrimitive.Content
                        open={false}
                        data-radui-collapsible-content
                    >
                        <div style={{ padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px', marginTop: '8px' }}>
                            <p>This is collapsible content that can be toggled open and closed.</p>
                        </div>
                    </CollapsiblePrimitive.Content>
                </CollapsiblePrimitive.Root>
            </div>
        );
    }
};

export const Controlled: Story = {
    render: () => {
    // Use React state for controlled component
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div style={{ width: '300px', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}>
                <CollapsiblePrimitive.Root
                    open={isOpen}
                    onOpenChange={(open) => setIsOpen(open)}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
                        <span>Controlled Collapsible</span>
                        <CollapsiblePrimitive.Trigger
                            onClick={() => setIsOpen(!isOpen)}
                            style={{
                                background: 'none',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                padding: '4px 8px',
                                cursor: 'pointer'
                            }}
                        >
                            {isOpen ? 'Close' : 'Open'}
                        </CollapsiblePrimitive.Trigger>
                    </div>
                    <CollapsiblePrimitive.Content open={isOpen}>
                        <div style={{ padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px', marginTop: '8px' }}>
                            <p>This is controlled collapsible content using React state.</p>
                            <p>Current state: {isOpen ? 'Open' : 'Closed'}</p>
                        </div>
                    </CollapsiblePrimitive.Content>
                </CollapsiblePrimitive.Root>
            </div>
        );
    }
};

export const MultipleCollapsibles: Story = {
    render: () => {
        const [openItems, setOpenItems] = useState<Record<string, boolean>>({
            item1: false,
            item2: false,
            item3: false
        });

        const toggleItem = (id: string) => {
            setOpenItems(prev => ({
                ...prev,
                [id]: !prev[id]
            }));
        };

        return (
            <div style={{ width: '300px', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}>
                {Object.entries(openItems).map(([id, isOpen]) => (
                    <CollapsiblePrimitive.Root
                        key={id}
                        open={isOpen}
                        onOpenChange={() => toggleItem(id)}
                        style={{ marginBottom: '8px' }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '8px',
                                backgroundColor: '#eee',
                                borderRadius: '4px'
                            }}
                        >
                            <span>Item {id.replace('item', '')}</span>
                            <CollapsiblePrimitive.Trigger
                                onClick={() => toggleItem(id)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0'
                                }}
                            >
                                {isOpen ? '▲' : '▼'}
                            </CollapsiblePrimitive.Trigger>
                        </div>
                        <CollapsiblePrimitive.Content open={isOpen}>
                            <div style={{ padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px', marginTop: '4px' }}>
                                <p>Content for {id}</p>
                            </div>
                        </CollapsiblePrimitive.Content>
                    </CollapsiblePrimitive.Root>
                ))}
            </div>
        );
    }
};

export const AnimationDisabled: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div style={{ width: '300px', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}>
                <CollapsiblePrimitive.Root
                    open={isOpen}
                    onOpenChange={(open) => setIsOpen(open)}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
                        <span>No Animation</span>
                        <CollapsiblePrimitive.Trigger
                            onClick={() => setIsOpen(!isOpen)}
                            style={{
                                background: 'none',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                padding: '4px 8px',
                                cursor: 'pointer'
                            }}
                        >
                            {isOpen ? 'Close' : 'Open'}
                        </CollapsiblePrimitive.Trigger>
                    </div>
                    <CollapsiblePrimitive.Content
                        open={isOpen}
                        transitionDuration={0}
                        style={{
                            display: isOpen ? 'block' : 'none',
                            height: 'auto'
                        }}
                    >
                        <div style={{ padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px', marginTop: '8px' }}>
                            <p>This content toggles instantly without animation.</p>
                        </div>
                    </CollapsiblePrimitive.Content>
                </CollapsiblePrimitive.Root>
            </div>
        );
    }
};

export const CustomAnimation: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div style={{ width: '300px', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}>
                <CollapsiblePrimitive.Root
                    open={isOpen}
                    onOpenChange={(open) => setIsOpen(open)}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
                        <span>Custom Animation</span>
                        <CollapsiblePrimitive.Trigger
                            onClick={() => setIsOpen(!isOpen)}
                            style={{
                                background: 'none',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                padding: '4px 8px',
                                cursor: 'pointer'
                            }}
                        >
                            {isOpen ? 'Close' : 'Open'}
                        </CollapsiblePrimitive.Trigger>
                    </div>
                    <CollapsiblePrimitive.Content
                        open={isOpen}
                        transitionDuration={800}
                        transitionTimingFunction="cubic-bezier(0.34, 1.56, 0.64, 1)" // Spring-like bounce effect
                    >
                        <div style={{ padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '4px', marginTop: '8px' }}>
                            <p>This content uses a custom animation with a spring effect that takes 800ms to complete.</p>
                            <p>The animation is controlled through props instead of inline styles, making the component truly headless.</p>
                        </div>
                    </CollapsiblePrimitive.Content>
                </CollapsiblePrimitive.Root>
            </div>
        );
    }
};
