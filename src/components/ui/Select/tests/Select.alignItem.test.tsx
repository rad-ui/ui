import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Select from '../Select';

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
const ITEM_HEIGHT = 30;

const rect = (top: number, height: number, left = 100, width = 200) => ({
    top, height, left, width, bottom: top + height, right: left + width, x: left, y: top, toJSON: () => {}
}) as DOMRect;

describe('Select alignItemWithTrigger', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
        // Trigger at 300–340px; options stacked 30px apart from the list's top edge.
        spy = jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function(this: Element) {
            const slot = this.getAttribute('data-slot');
            if (slot === 'select-trigger') return rect(300, 40);
            if (this.getAttribute('role') === 'option') {
                const index = FRUITS.indexOf(this.textContent || '');
                return rect(index * ITEM_HEIGHT, ITEM_HEIGHT);
            }
            return rect(0, 0);
        });
    });
    // jsdom's viewport has no size, which would make every position collide.
    beforeAll(() => {
        Object.defineProperty(document.documentElement, 'clientHeight', { configurable: true, value: 1000 });
        Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 1000 });
    });
    afterAll(() => {
        delete (document.documentElement as any).clientHeight;
        delete (document.documentElement as any).clientWidth;
    });
    afterEach(() => { spy.mockRestore(); });

    const renderSelect = (props: Partial<React.ComponentProps<typeof Select.Root>>) => render(
        <Select.Root defaultOpen {...props}>
            <Select.Trigger>Fruit</Select.Trigger>
            <Select.Content data-testid="content">
                {FRUITS.map((fruit) => <Select.Item key={fruit} value={fruit}>{fruit}</Select.Item>)}
            </Select.Content>
        </Select.Root>
    );

    test('puts the selected option on the trigger', async() => {
        renderSelect({ alignItemWithTrigger: true, defaultValue: 'Date' });
        // Date's centre is 3 * 30 + 15 = 105px into the list; the trigger's centre is at 320px.
        await waitFor(() => expect(screen.getByTestId('content').style.transform).toMatch(/translate\(\d+px, 215px\)/));
    });

    test('falls back to opening below the trigger when nothing is selected', async() => {
        renderSelect({ alignItemWithTrigger: true, collisionPadding: 0 });
        await waitFor(() => expect(screen.getByTestId('content').style.transform).toMatch(/translate\(\d+px, 344px\)/));
    });

    test('is off by default', async() => {
        renderSelect({ defaultValue: 'Date', collisionPadding: 0 });
        await waitFor(() => expect(screen.getByTestId('content').style.transform).toMatch(/translate\(\d+px, 344px\)/));
    });
});
