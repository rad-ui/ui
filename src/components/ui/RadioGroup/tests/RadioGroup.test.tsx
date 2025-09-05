import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RadioGroup from '../RadioGroup';

// Helper for the story pattern
const options = [
    { id: 'html', value: 'html', label: 'HTML' },
    { id: 'css', value: 'css', label: 'CSS' },
    { id: 'javascript', value: 'javascript', label: 'JavaScript' }
];

// Explicitly type props to allow all RadioGroupRoot props, but make children optional
function StoryRadioGroup(props: Omit<React.ComponentProps<typeof RadioGroup.Root>, 'children'> & { children?: React.ReactNode }) {
    return (
        <RadioGroup.Root {...props}>
            {props.children ??
        options.map((option) => (
            <RadioGroup.Label key={option.id} data-testid={`label-${option.value}`}>
                <RadioGroup.Item value={option.value} data-testid={`item-${option.value}`}>
                    <RadioGroup.Indicator data-testid={`indicator-${option.value}`} />
                </RadioGroup.Item>
                {option.label}
            </RadioGroup.Label>
        ))}
        </RadioGroup.Root>
    );
}

describe('RadioGroup (fragments)', () => {
    it('renders without crashing (story pattern)', () => {
        render(<StoryRadioGroup />);
        options.forEach(opt => {
            expect(screen.getByText(opt.label)).toBeInTheDocument();
            expect(screen.getByTestId(`item-${opt.value}`)).toBeInTheDocument();
        });
    });

    it('selects the correct radio on click (uncontrolled)', () => {
        render(<StoryRadioGroup defaultValue="css" name="test-group" />);
        const itemHtml = screen.getByTestId('item-html');
        const itemCss = screen.getByTestId('item-css');
        const itemJs = screen.getByTestId('item-javascript');
        // Only CSS is selected initially
        expect(itemHtml).toHaveAttribute('aria-checked', 'false');
        expect(itemCss).toHaveAttribute('aria-checked', 'true');
        expect(itemJs).toHaveAttribute('aria-checked', 'false');
        // Click HTML
        fireEvent.click(itemHtml);
        expect(itemHtml).toHaveAttribute('aria-checked', 'true');
        expect(itemCss).toHaveAttribute('aria-checked', 'false');
        expect(itemJs).toHaveAttribute('aria-checked', 'false');
    });

    it('shows indicator only for selected item', () => {
        render(<StoryRadioGroup defaultValue="javascript" />);
        options.forEach(opt => {
            const indicator = screen.queryByTestId(`indicator-${opt.value}`);
            if (opt.value === 'javascript') {
                expect(indicator).toBeInTheDocument();
                // Optionally: expect(indicator).not.toBeEmptyDOMElement();
            } else {
                expect(indicator).not.toBeInTheDocument();
            }
        });
    });

    it('renders label text and associates with item', () => {
        render(<StoryRadioGroup />);
        options.forEach(opt => {
            const label = screen.getByTestId(`label-${opt.value}`);
            expect(label).toHaveTextContent(opt.label);
            // The item is a button inside the label
            const item = screen.getByTestId(`item-${opt.value}`);
            expect(label).toContainElement(item);
        });
    });

    it('passes custom className, variant, size, color to root', () => {
        render(
            <RadioGroup.Root className="custom-class" data-testid="radio-group" variant="filled" size="lg" color="primary">
                <RadioGroup.Item value="a">A</RadioGroup.Item>
            </RadioGroup.Root>
        );
        const group = screen.getByTestId('radio-group');
        // Data attributes for variant/size/color
        expect(group.getAttribute('data-radio-group-variant')).toBe('filled');
        expect(group.getAttribute('data-radio-group-size')).toBe('lg');
        expect(group.getAttribute('data-rad-ui-accent-color')).toBe('primary');
    });

    it('warns on direct usage of RadioGroup', () => {
        const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        render(<RadioGroup />);
        expect(spy).toHaveBeenCalledWith(
            'Direct usage of RadioGroup is not supported. Please use RadioGroup.Root and RadioGroup.Item instead.'
        );
        spy.mockRestore();
    });

    it('forwards refs to root, item, and indicator', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const itemRef = React.createRef<HTMLButtonElement>();
        const indicatorRef = React.createRef<HTMLSpanElement>();

        render(
            <RadioGroup.Root ref={rootRef} defaultValue="html">
                <RadioGroup.Item ref={itemRef} value="html">
                    <RadioGroup.Indicator ref={indicatorRef} />
                </RadioGroup.Item>
            </RadioGroup.Root>
        );

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(itemRef.current).toBeInstanceOf(HTMLButtonElement);
        expect(indicatorRef.current).toBeInstanceOf(HTMLSpanElement);
    });
});
