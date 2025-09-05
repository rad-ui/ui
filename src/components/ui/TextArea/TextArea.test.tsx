import React from 'react';
import { render, screen } from '@testing-library/react';
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
        render(<TextArea>hidden</TextArea>);
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
});
