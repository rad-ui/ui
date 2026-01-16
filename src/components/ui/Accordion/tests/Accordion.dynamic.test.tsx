import React, { useState, useEffect } from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Accordion from '../Accordion';

describe('Accordion Dynamic Content', () => {
    it('handles dynamic content height changes', async() => {
        const DynamicContent = () => {
            const [items, setItems] = useState(['Item 1']);
            useEffect(() => {
                const timer = setTimeout(() => {
                    setItems(['Item 1', 'Item 2', 'Item 3']);
                }, 50);
                return () => clearTimeout(timer);
            }, []);

            return (
                <Accordion.Root defaultValue={['item-1']} transitionDuration={300}>
                    <Accordion.Item value="item-1">
                        <Accordion.Header>
                            <Accordion.Trigger index={0}>Trigger 1</Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content index={0} data-testid="content">
                            {items.map(item => <div key={item}>{item}</div>)}
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion.Root>
            );
        };

        render(<DynamicContent />);

        const content = screen.getByTestId('content');

        // Initially open (from defaultValue)
        expect(content).toBeInTheDocument();

        // Wait for items to update
        await act(async() => {
            await new Promise(resolve => setTimeout(resolve, 100));
        });

        // The content height should have updated or at least not be broken.
        // Since we mocked ResizeObserver, we can't easily test the actual offsetHeight
        // in JSDOM, but we can verify that the component didn't crash and the new items are rendered.
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByText('Item 3')).toBeInTheDocument();
    });
});
