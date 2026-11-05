import React from 'react';
import { render, screen } from '@testing-library/react';
import Select from '../Select';

// Positioning props work on Select.Content, as they do on Popover.Content and Tooltip.Content, and
// never reach the DOM (rad-ui/ui#2335).
describe('Select.Content positioning props', () => {
    const renderSelect = (rootProps: Record<string, unknown>, contentProps: Record<string, unknown>) => {
        const error = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(
            <Select.Root defaultOpen defaultValue="a" {...rootProps}>
                <Select.Trigger aria-label="Fruit"><Select.Value /></Select.Trigger>
                <Select.Portal>
                    <Select.Content data-testid="content" {...contentProps}>
                        <Select.Item value="a">Apple</Select.Item>
                        <Select.Item value="b">Banana</Select.Item>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        );
        const unknownProp = error.mock.calls.some((call) => String(call[0]).includes('React does not recognize'));
        error.mockRestore();
        return { unknownProp };
    };

    test('side and align on Content place the list', async() => {
        const { unknownProp } = renderSelect({}, { side: 'top', align: 'end', sideOffset: 6, alignOffset: 2 });
        const content = await screen.findByTestId('content');
        expect(content).toHaveAttribute('data-side', 'top');
        expect(content).toHaveAttribute('data-align', 'end');
        expect(unknownProp).toBe(false);
        for (const attr of ['side', 'align', 'sideoffset', 'alignoffset']) {
            expect(content).not.toHaveAttribute(attr);
        }
    });

    test('Content wins over the Root', async() => {
        renderSelect({ side: 'bottom', align: 'start' }, { side: 'top' });
        expect(await screen.findByTestId('content')).toHaveAttribute('data-side', 'top');
    });

    test('without Content props the Root still decides', async() => {
        renderSelect({ side: 'top', align: 'center' }, {});
        const content = await screen.findByTestId('content');
        expect(content).toHaveAttribute('data-side', 'top');
        expect(content).toHaveAttribute('data-align', 'center');
    });
});
