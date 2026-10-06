import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Steps from '../Steps';

describe('Steps Component', () => {
    it('sets correct data-state based on currentStep', () => {
        const { rerender } = render(
            <Steps.Root value={1} onValueChange={() => {}}>
                <Steps.Item value={0} data-testid="step-0">Step 0</Steps.Item>
                <Steps.Item value={1} data-testid="step-1">Step 1</Steps.Item>
                <Steps.Item value={2} data-testid="step-2">Step 2</Steps.Item>
            </Steps.Root>
        );

        expect(screen.getByTestId('step-0')).toHaveAttribute('data-state', 'completed');
        expect(screen.getByTestId('step-1')).toHaveAttribute('data-state', 'active');
        expect(screen.getByTestId('step-2')).toHaveAttribute('data-state', 'inactive');

        rerender(
            <Steps.Root value={2} onValueChange={() => {}}>
                <Steps.Item value={0} data-testid="step-0">Step 0</Steps.Item>
                <Steps.Item value={1} data-testid="step-1">Step 1</Steps.Item>
                <Steps.Item value={2} data-testid="step-2">Step 2</Steps.Item>
            </Steps.Root>
        );

        expect(screen.getByTestId('step-0')).toHaveAttribute('data-state', 'completed');
        expect(screen.getByTestId('step-1')).toHaveAttribute('data-state', 'completed');
        expect(screen.getByTestId('step-2')).toHaveAttribute('data-state', 'active');
    });

    it('supports customRootClass', () => {
        render(
            <Steps.Root customRootClass="custom-steps" data-testid="steps-root">
                <Steps.Item value={0}>Step 0</Steps.Item>
            </Steps.Root>
        );
        expect(screen.getByTestId('steps-root')).toHaveClass('custom-steps-steps');
    });

    it('marks only the active step with aria-current="step"', () => {
        render(
            <Steps.Root defaultValue={1}>
                <Steps.Item value={0} data-testid="step-0">Step 0</Steps.Item>
                <Steps.Item value={1} data-testid="step-1">Step 1</Steps.Item>
                <Steps.Item value={2} data-testid="step-2">Step 2</Steps.Item>
            </Steps.Root>
        );
        expect(screen.getByTestId('step-0')).not.toHaveAttribute('aria-current');
        expect(screen.getByTestId('step-1')).toHaveAttribute('aria-current', 'step');
        expect(screen.getByTestId('step-2')).not.toHaveAttribute('aria-current');
    });

    it('resolves numeric string values', () => {
        render(
            <Steps.Root defaultValue={1}>
                <Steps.Item value="0" data-testid="step-0">Step 0</Steps.Item>
                <Steps.Item value="1" data-testid="step-1">Step 1</Steps.Item>
                <Steps.Item value="two" data-testid="step-2">Step 2</Steps.Item>
            </Steps.Root>
        );
        expect(screen.getByTestId('step-0')).toHaveAttribute('data-state', 'completed');
        expect(screen.getByTestId('step-1')).toHaveAttribute('data-state', 'active');
        expect(screen.getByTestId('step-2')).toHaveAttribute('data-state', 'inactive');
    });

    it('defaults to vertical orientation and reflects an explicit orientation', () => {
        const { rerender } = render(
            <Steps.Root data-testid="root"><Steps.Item value={0}>Step</Steps.Item></Steps.Root>
        );
        expect(screen.getByTestId('root')).toHaveAttribute('data-orientation', 'vertical');
        rerender(
            <Steps.Root data-testid="root" orientation="horizontal"><Steps.Item value={0}>Step</Steps.Item></Steps.Root>
        );
        expect(screen.getByTestId('root')).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('forwards refs on every part', () => {
        const refs = {
            root: React.createRef<HTMLDivElement>(),
            item: React.createRef<HTMLDivElement>(),
            track: React.createRef<HTMLDivElement>(),
            bubble: React.createRef<HTMLDivElement>(),
            line: React.createRef<HTMLDivElement>(),
            content: React.createRef<HTMLDivElement>(),
            title: React.createRef<HTMLDivElement>(),
            description: React.createRef<HTMLDivElement>()
        };
        render(
            <Steps.Root ref={refs.root}>
                <Steps.Item ref={refs.item} value={0}>
                    <Steps.Track ref={refs.track}>
                        <Steps.Bubble ref={refs.bubble}>1</Steps.Bubble>
                        <Steps.Line ref={refs.line} />
                    </Steps.Track>
                    <Steps.Content ref={refs.content}>
                        <Steps.Title ref={refs.title}>Title</Steps.Title>
                        <Steps.Description ref={refs.description}>Description</Steps.Description>
                    </Steps.Content>
                </Steps.Item>
            </Steps.Root>
        );
        Object.values(refs).forEach((ref) => expect(ref.current).toBeInstanceOf(HTMLDivElement));
    });
});

describe('Steps items without value', () => {
    test('derive their index from document order', () => {
        const { getAllByTestId } = render(
            <Steps.Root defaultValue={1}>
                <Steps.Item data-testid="item">A</Steps.Item>
                <Steps.Item data-testid="item">B</Steps.Item>
                <Steps.Item data-testid="item">C</Steps.Item>
            </Steps.Root>
        );
        const items = getAllByTestId('item');
        expect(items.map((item) => item.getAttribute('data-state'))).toEqual(['completed', 'active', 'inactive']);
        expect(items[1]).toHaveAttribute('aria-current', 'step');
        expect(items.map((item) => item.getAttribute('data-value'))).toEqual(['0', '1', '2']);
    });

    test('re-index when an item is removed and keep explicit values', () => {
        const Example = ({ showFirst }: { showFirst: boolean }) => (
            <Steps.Root defaultValue={0}>
                {showFirst && <Steps.Item data-testid="first">A</Steps.Item>}
                <Steps.Item data-testid="second">B</Steps.Item>
                <Steps.Item data-testid="explicit" value={5}>C</Steps.Item>
            </Steps.Root>
        );
        const { getByTestId, rerender } = render(<Example showFirst />);
        expect(getByTestId('second')).toHaveAttribute('data-state', 'inactive');
        expect(getByTestId('explicit')).toHaveAttribute('data-value', '5');

        rerender(<Example showFirst={false} />);
        expect(getByTestId('second')).toHaveAttribute('data-state', 'active');
        expect(getByTestId('explicit')).toHaveAttribute('data-state', 'inactive');
    });
});
