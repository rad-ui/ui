import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as axe from 'axe-core';
import Primitive from '..';
import { ACCESSIBILITY_TEST_TAGS } from '~/setupTests';

// Helper custom component for asChild tests
const CustomLink = React.forwardRef<HTMLAnchorElement, React.ComponentProps<'a'>>(
    (props, ref) => <a ref={ref} {...props} />
);
CustomLink.displayName = 'CustomLink';

describe('Primitive asChild', () => {
    test('forwards props, className, data attributes, and ref to child', async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();
        const ref = React.createRef<HTMLButtonElement>();

        render(
            <Primitive.button
                asChild
                className="parent-class"
                data-test="passed"
                onClick={handleClick}
                ref={ref}
            >
                <button>Trigger</button>
            </Primitive.button>
        );

        const button = screen.getByRole('button');
        await user.click(button);

        expect(button).toHaveClass('parent-class');
        expect(button).toHaveAttribute('data-test', 'passed');
        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(ref.current).toBe(button);
    });

    test('supports custom child elements without warnings', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const ref = React.createRef<HTMLAnchorElement>();

        render(
            <Primitive.div asChild className="link-class" data-id="123" ref={ref}>
                <CustomLink href="#">Link</CustomLink>
            </Primitive.div>
        );

        const link = screen.getByText('Link');
        expect(link).toHaveClass('link-class');
        expect(link).toHaveAttribute('data-id', '123');
        expect(ref.current).toBe(link);
        expect(warnSpy).not.toHaveBeenCalled();
        warnSpy.mockRestore();
    });

    test('warns and renders host element when child is null', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const { container } = render(
            <Primitive.div asChild>{null}</Primitive.div>
        );
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(container.firstElementChild?.tagName).toBe('DIV');
        warnSpy.mockRestore();
    });

    test('warns and renders host element when multiple children provided', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const { container } = render(
            <Primitive.div asChild>
                <>
                    <span />
                    <span />
                </>
            </Primitive.div>
        );
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(container.firstElementChild?.tagName).toBe('DIV');
        warnSpy.mockRestore();
    });

    test('warns and renders host element when child is a top-level React.Fragment', () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const { container } = render(
            <Primitive.div asChild>
                <React.Fragment>
                    <span />
                </React.Fragment>
            </Primitive.div>
        );
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(container.firstElementChild?.tagName).toBe('DIV');
        warnSpy.mockRestore();
    });

    test('forwards controlled and uncontrolled value attributes', async () => {
        const user = userEvent.setup();

        const Controlled = () => {
            const [value, setValue] = React.useState('hello');
            return (
                <Primitive.input
                    asChild
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                    data-testid="controlled"
                >
                    <input />
                </Primitive.input>
            );
        };

        render(
            <>
                <Controlled />
                <Primitive.input asChild defaultValue="foo" data-testid="uncontrolled">
                    <input />
                </Primitive.input>
            </>
        );

        const controlled = screen.getByTestId('controlled') as HTMLInputElement;
        const uncontrolled = screen.getByTestId('uncontrolled') as HTMLInputElement;

        expect(controlled.value).toBe('hello');
        expect(uncontrolled.value).toBe('foo');

        await user.type(controlled, ' world');
        await user.type(uncontrolled, 'bar');

        expect(controlled.value).toBe('hello world');
        expect(uncontrolled.value).toBe('foobar');
    });

    test('axe: no violations for standard elements', async () => {
        const { container } = render(<Primitive.button>Accessible</Primitive.button>);
        const results = await axe.run(container, {
            runOnly: { type: 'tag', values: ACCESSIBILITY_TEST_TAGS }
        });
        expect(results.violations.length).toBe(0);
    });
});
