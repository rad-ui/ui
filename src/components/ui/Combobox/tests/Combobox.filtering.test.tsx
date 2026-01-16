import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Combobox from '../Combobox';

describe('Combobox Filtering and Grouping', () => {
    it('filters items correctly and hides empty groups', async () => {
        render(
            <Combobox.Root>
                <Combobox.Trigger data-testid="trigger" />
                <Combobox.Content>
                    <Combobox.Search data-testid="search" />
                    <Combobox.Group data-testid="group-fruits">
                        <Combobox.Item value="Apple">Apple</Combobox.Item>
                        <Combobox.Item value="Banana">Banana</Combobox.Item>
                    </Combobox.Group>
                    <Combobox.Group data-testid="group-vegetables">
                        <Combobox.Item value="Carrot">Carrot</Combobox.Item>
                    </Combobox.Group>
                </Combobox.Content>
            </Combobox.Root>
        );

        const trigger = screen.getByTestId('trigger');
        fireEvent.click(trigger);

        const search = screen.getByTestId('search');
        
        // Initial state
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Banana')).toBeInTheDocument();
        expect(screen.getByText('Carrot')).toBeInTheDocument();

        // Search for "App"
        fireEvent.change(search, { target: { value: 'App' } });
        
        expect(screen.getByText('Apple')).toBeVisible();
        expect(screen.queryByText('Banana')).not.toBeVisible();
        expect(screen.queryByText('Carrot')).not.toBeVisible();
        
        // Vegetables group should be hidden
        expect(screen.getByTestId('group-vegetables')).not.toBeVisible();
        expect(screen.getByTestId('group-fruits')).toBeVisible();
    });
});
