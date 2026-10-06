import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TextArea from './TextArea';

describe('TextArea', () => {
    it('forwards ref to the root element', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<TextArea ref={ref}>content</TextArea>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('forwards ref to the input element', () => {
        const ref = React.createRef<HTMLTextAreaElement>();
        render(<TextArea.Input ref={ref} placeholder="test" />);
        expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    });

    it('forwards ref to the root subcomponent', () => {
        const ref = React.createRef<HTMLDivElement>();
        render(<TextArea.Root ref={ref}>child</TextArea.Root>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('is accessible via placeholder', () => {
        render(<TextArea placeholder="enter text">hidden</TextArea>);
        expect(screen.getByPlaceholderText('enter text')).toBeInTheDocument();
    });

    it('renders without console warnings', () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const error = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(<TextArea>content</TextArea>);
        expect(warn).not.toHaveBeenCalled();
        expect(error).not.toHaveBeenCalled();
        warn.mockRestore();
        error.mockRestore();
    });

    it('matches snapshot', () => {
        const { container } = render(<TextArea>content</TextArea>);
        expect(container.firstChild).toMatchSnapshot();
    });
    it('renders string children once, as the initial value', () => {
        const { container } = render(<TextArea>content</TextArea>);
        expect(screen.getByRole('textbox')).toHaveValue('content');
        expect(container.textContent).toBe('content');
    });

    it('forwards field attributes to the textarea so labels and controlled usage work', () => {
        const handleChange = jest.fn();
        render(
            <>
                <label htmlFor="bio">Bio</label>
                <TextArea id="bio" name="bio" rows={3} value="" onChange={handleChange} required />
            </>
        );

        const textarea = screen.getByLabelText('Bio');
        expect(textarea.tagName).toBe('TEXTAREA');
        expect(textarea).toHaveAttribute('name', 'bio');
        expect(textarea).toHaveAttribute('rows', '3');
        expect(textarea).toBeRequired();

        fireEvent.change(textarea, { target: { value: 'Hello' } });
        expect(handleChange).toHaveBeenCalled();
    });

    it('keeps styling props and data attributes on the root', () => {
        const { container } = render(<TextArea variant="soft" size="large" data-testid="area" aria-label="Notes" disabled />);
        const root = container.firstChild as HTMLElement;

        expect(root).toHaveAttribute('data-variant', 'soft');
        expect(root).toHaveAttribute('data-size', 'large');
        expect(root).toHaveAttribute('data-testid', 'area');
        expect(root).toHaveAttribute('data-disabled');
        expect(screen.getByRole('textbox', { name: 'Notes' })).toBeDisabled();
    });

    test('controlled value with string children does not warn about value + defaultValue', () => {
        const error = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(<TextArea aria-label="ctrl" value="controlled" onChange={() => {}}>legacy</TextArea>);
        expect(screen.getByLabelText('ctrl')).toHaveValue('controlled');
        expect(error).not.toHaveBeenCalled();
        error.mockRestore();
    });
});
