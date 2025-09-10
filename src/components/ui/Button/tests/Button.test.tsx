import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../Button';

describe('Button', () => {
    test('renders button', () => {
        render(<Button>button</Button>);
        expect(screen.getByText('button')).toBeInTheDocument();
    });

    test('renders button with the given type', () => {
        render(<Button type='submit'>button</Button>);
        const button = screen.getByText('button');
        expect(button).toHaveAttribute('type', 'submit');
    });

    test('renders button with the given color', () => {
        render(<Button color='white'>button</Button>);
        const button = screen.getByText('button');
        expect(button).toHaveAttribute('data-rad-ui-accent-color', 'white');
    });

    test('renders button with the given variant', () => {
        render(<Button variant='outline'>button</Button>);
        const button = screen.getByText('button');
        expect(button).toHaveClass('rad-ui-button');
    });

    test('renders button with the given size', () => {
        render(<Button size='small'>button</Button>);
        const button = screen.getByText('button');
        expect(button).toHaveAttribute('data-button-size', 'small');
    });

    test('calls the onClick handler when the button is clicked', async() => {
        const onClick = jest.fn();
        render(<Button onClick={onClick}>button</Button>);
        const button = screen.getByText('button');
        // click the button
        await userEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('disabled button suppresses clicks and sets data-disabled', async () => {
        const onClick = jest.fn();
        render(
            <Button disabled onClick={onClick}>
                button
            </Button>
        );
        const button = screen.getByRole('button');
        await userEvent.click(button);
        expect(onClick).not.toHaveBeenCalled();
        expect(button).toHaveAttribute('data-disabled', '');
    });

    test('forwards ref to the underlying button element', () => {
        const ref = React.createRef<HTMLButtonElement>();
        render(<Button ref={ref}>button</Button>);
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    test('passes accessibility attributes to the button', () => {
        render(<Button label='Label' description='Description'>button</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label', 'Label');
        expect(button).toHaveAttribute('aria-description', 'Description');
    });

    test('renders without warnings', () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        render(<Button>button</Button>);
        expect(errorSpy).not.toHaveBeenCalled();
        expect(warnSpy).not.toHaveBeenCalled();
        errorSpy.mockRestore();
        warnSpy.mockRestore();
    });
});
