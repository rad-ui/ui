import React from 'react';
import { render, screen } from '@testing-library/react';
import Callout from '../Callout';

describe('Callout', () => {
    describe('Callout.Root', () => {
        it('renders children correctly', () => {
            render(
                <Callout.Root>
                    <div>Test Content</div>
                </Callout.Root>
            );
            expect(screen.getByText('Test Content')).toBeInTheDocument();
        });

        it('applies custom className', () => {
            render(
                <Callout.Root className="custom-class">
                    <div>Test Content</div>
                </Callout.Root>
            );
            const element = screen.getByText('Test Content').parentElement;
            expect(element).toHaveClass('custom-class');
        });

        it('applies color prop correctly', () => {
            render(
                <Callout.Root color="red">
                    <div>Test Content</div>
                </Callout.Root>
            );
            const element = screen.getByText('Test Content').parentElement;
            expect(element).toHaveAttribute('data-rad-ui-accent-color', 'red');
        });

        it('applies variant prop correctly', () => {
            render(
                <Callout.Root variant="soft">
                    <div>Test Content</div>
                </Callout.Root>
            );
            const element = screen.getByText('Test Content').parentElement;
            expect(element).toHaveAttribute('data-callout-variant', 'soft');
        });

        it('applies size prop correctly', () => {
            render(
                <Callout.Root size="large">
                    <div>Test Content</div>
                </Callout.Root>
            );
            const element = screen.getByText('Test Content').parentElement;
            expect(element).toHaveAttribute('data-callout-size', 'large');
        });
    });

    describe('Callout.Icon', () => {
        it('renders icon content correctly', () => {
            render(
                <Callout.Root>
                    <Callout.Icon>
                        <span>Icon</span>
                    </Callout.Icon>
                </Callout.Root>
            );
            expect(screen.getByText('Icon')).toBeInTheDocument();
        });

        it('applies custom className to icon', () => {
            render(
                <Callout.Root>
                    <Callout.Icon className="icon-class">
                        <span>Icon</span>
                    </Callout.Icon>
                </Callout.Root>
            );
            const iconElement = screen.getByText('Icon').parentElement;
            expect(iconElement).toHaveClass('icon-class');
        });
    });

    describe('Callout.Text', () => {
        it('renders text content correctly', () => {
            render(
                <Callout.Root>
                    <Callout.Text>Callout Text</Callout.Text>
                </Callout.Root>
            );
            expect(screen.getByText('Callout Text')).toBeInTheDocument();
        });

        it('applies custom className to text', () => {
            render(
                <Callout.Root>
                    <Callout.Text className="text-class">Callout Text</Callout.Text>
                </Callout.Root>
            );
            const textElement = screen.getByText('Callout Text');
            expect(textElement).toHaveClass('text-class');
        });
    });

    describe('Callout Composition', () => {
        it('renders complete callout with all parts', () => {
            render(
                <Callout.Root color="blue" variant="soft" size="medium">
                    <Callout.Icon>
                        <span>Icon</span>
                    </Callout.Icon>
                    <Callout.Text>Callout Message</Callout.Text>
                </Callout.Root>
            );

            expect(screen.getByText('Icon')).toBeInTheDocument();
            expect(screen.getByText('Callout Message')).toBeInTheDocument();

            const rootElement = screen.getByText('Callout Message').closest('[data-rad-ui-accent-color]');
            expect(rootElement).toHaveAttribute('data-rad-ui-accent-color', 'blue');
            expect(rootElement).toHaveAttribute('data-callout-variant', 'soft');
            expect(rootElement).toHaveAttribute('data-callout-size', 'medium');
        });
    });
});
