import React, { createRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import Menubar from '../Menubar';
import MenubarContext from '../contexts/MenubarContext';

describe('Menubar', () => {
    test('forwards refs to subcomponents', () => {
        const rootRef = createRef<HTMLDivElement>();
        const menuRef = createRef<HTMLDivElement>();
        const triggerRef = createRef<HTMLButtonElement>();
        const contentRef = createRef<HTMLDivElement>();
        const itemRef = createRef<HTMLButtonElement>();

        const { getByText } = render(
            <Menubar.Root ref={rootRef}>
                <Menubar.Menu ref={menuRef}>
                    <Menubar.Trigger ref={triggerRef}>File</Menubar.Trigger>
                    <Menubar.Content ref={contentRef}>
                        <Menubar.Item ref={itemRef}>New</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Menu>
            </Menubar.Root>
        );

        fireEvent.click(getByText('File'));

        expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
        expect(menuRef.current).toBeInstanceOf(HTMLDivElement);
        expect(triggerRef.current).toBeInstanceOf(HTMLButtonElement);
        expect(contentRef.current).toBeInstanceOf(HTMLDivElement);
        expect(itemRef.current).toBeInstanceOf(HTMLButtonElement);
    });

    test('hides content when closed and shows when open', () => {
        const { queryByText, getByText } = render(
            <Menubar.Root>
                <Menubar.Menu>
                    <Menubar.Trigger>File</Menubar.Trigger>
                    <Menubar.Content>
                        <Menubar.Item>New</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Menu>
            </Menubar.Root>
        );

        expect(queryByText('New')).toBeNull();
        fireEvent.click(getByText('File'));
        expect(queryByText('New')).toBeInTheDocument();
    });

    test('renders without warnings', () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const error = jest.spyOn(console, 'error').mockImplementation(() => {});

        const { getByText } = render(
            <Menubar.Root>
                <Menubar.Menu>
                    <Menubar.Trigger>File</Menubar.Trigger>
                    <Menubar.Content>
                        <Menubar.Item>New</Menubar.Item>
                    </Menubar.Content>
                </Menubar.Menu>
            </Menubar.Root>
        );

        fireEvent.click(getByText('File'));

        expect(warn).not.toHaveBeenCalled();
        expect(error).not.toHaveBeenCalled();
        warn.mockRestore();
        error.mockRestore();
    });

    test('does not re-render context consumers when parent re-renders without state changes', () => {
        const renderSpy = jest.fn();

        const RenderCounter = React.memo(() => {
            const context = React.useContext(MenubarContext);
            renderSpy();
            return <span>{context?.rootClass}</span>;
        });

        const Wrapper = () => {
            const [count, setCount] = React.useState(0);
            return (
                <>
                    <button onClick={() => setCount((prev) => prev + 1)}>rerender {count}</button>
                    <Menubar.Root>
                        <RenderCounter />
                        <Menubar.Menu>
                            <Menubar.Trigger>File</Menubar.Trigger>
                            <Menubar.Content>
                                <Menubar.Item>New</Menubar.Item>
                            </Menubar.Content>
                        </Menubar.Menu>
                    </Menubar.Root>
                </>
            );
        };

        const { getByText } = render(<Wrapper />);
        const baselineRenderCount = renderSpy.mock.calls.length;

        fireEvent.click(getByText(/rerender/i));
        expect(renderSpy).toHaveBeenCalledTimes(baselineRenderCount);
    });
});
