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

    it('supports asChild across steps parts while preserving refs and state attributes', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const itemRef = React.createRef<HTMLDivElement>();
        const titleRef = React.createRef<HTMLDivElement>();

        render(
            <Steps.Root asChild customRootClass="acme" value={1} ref={rootRef}>
                <section data-testid="root">
                    <Steps.Item asChild value={1} ref={itemRef}>
                        <article data-testid="item">
                            <Steps.Track asChild>
                                <div data-testid="track">
                                    <Steps.Bubble asChild>
                                        <div data-testid="bubble">2</div>
                                    </Steps.Bubble>
                                    <Steps.Line asChild>
                                        <div data-testid="line" />
                                    </Steps.Line>
                                </div>
                            </Steps.Track>
                            <Steps.Content asChild>
                                <section data-testid="content">
                                    <Steps.Title asChild ref={titleRef}>
                                        <h3 data-testid="title">Step title</h3>
                                    </Steps.Title>
                                    <Steps.Description asChild>
                                        <p data-testid="description">Step description</p>
                                    </Steps.Description>
                                </section>
                            </Steps.Content>
                        </article>
                    </Steps.Item>
                </section>
            </Steps.Root>
        );

        expect(screen.getByTestId('root')).toHaveClass('acme-steps', 'acme-steps-horizontal');
        expect(screen.getByTestId('item')).toHaveClass('acme-steps-item');
        expect(screen.getByTestId('item')).toHaveAttribute('data-state', 'active');
        expect(screen.getByTestId('track')).toHaveClass('acme-steps-track');
        expect(screen.getByTestId('bubble')).toHaveClass('acme-steps-bubble');
        expect(screen.getByTestId('line')).toHaveClass('acme-steps-line');
        expect(screen.getByTestId('content')).toHaveClass('acme-steps-content');
        expect(screen.getByTestId('title')).toHaveClass('acme-steps-title');
        expect(screen.getByTestId('description')).toHaveClass('acme-steps-description');
        expect(rootRef.current?.tagName).toBe('SECTION');
        expect(itemRef.current?.tagName).toBe('ARTICLE');
        expect(titleRef.current?.tagName).toBe('H3');
    });
});
