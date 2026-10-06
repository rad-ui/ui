import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
    test('renders Card component with content', () => {
        render(<Card data-testid="card" >I am Text</Card>);
        expect(screen.getByTestId('card')).toHaveTextContent('I am Text');
    });

    test('renders Card component with className', () => {
        render(<Card data-testid="card" className="bg-gray-200" />);
        expect(screen.getByTestId('card')).toHaveClass('bg-gray-200');
    });

    test('renders Card component with custom style', () => {
        render(<Card data-testid="card" style={{ color: 'red' }} />);
        expect(screen.getByTestId('card')).toHaveStyle('color: rgb(255, 0, 0)');
    });

    test('renders Card component with custom id', () => {
        render(<Card data-testid="card" id="card-id" />);
        expect(screen.getByTestId('card')).toHaveAttribute('id', 'card-id');
    });

    test('renders Card component with custom data attribute', () => {
        render(<Card data-testid="card" data-custom="card-data" />);
        expect(screen.getByTestId('card')).toHaveAttribute('data-custom', 'card-data');
    });

    test('renders card fragments with scoped classes', () => {
        render(
            <Card data-testid="card" customRootClass="rad-ui">
                <Card.Header data-testid="card-header">
                    <Card.Title>Card title</Card.Title>
                    <Card.Action>Action</Card.Action>
                    <Card.Description>Description</Card.Description>
                </Card.Header>
                <Card.Content data-testid="card-content">Content</Card.Content>
                <Card.Footer data-testid="card-footer">Footer</Card.Footer>
            </Card>
        );

        expect(screen.getByTestId('card')).toHaveClass('rad-ui-card-root');
        expect(screen.getByTestId('card-header')).toHaveClass('rad-ui-card-header');
        expect(screen.getByText('Card title')).toHaveClass('rad-ui-card-title');
        expect(screen.getByText('Action')).toHaveClass('rad-ui-card-action');
        expect(screen.getByText('Description')).toHaveClass('rad-ui-card-description');
        expect(screen.getByTestId('card-content')).toHaveClass('rad-ui-card-content');
        expect(screen.getByTestId('card-footer')).toHaveClass('rad-ui-card-footer');
    });

    test('supports asChild across card parts while preserving refs and generated classes', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const headerRef = React.createRef<HTMLDivElement>();
        const titleRef = React.createRef<HTMLHeadingElement>();
        const descriptionRef = React.createRef<HTMLParagraphElement>();
        const contentRef = React.createRef<HTMLDivElement>();
        const footerRef = React.createRef<HTMLDivElement>();

        render(
            <Card.Root asChild customRootClass="acme" ref={rootRef}>
                <section data-testid="card">
                    <Card.Header asChild ref={headerRef}>
                        <header data-testid="header">
                            <Card.Title asChild ref={titleRef}>
                                <h2 data-testid="title">Title</h2>
                            </Card.Title>
                            <Card.Action asChild>
                                <button data-testid="action" type="button">Action</button>
                            </Card.Action>
                            <Card.Description asChild ref={descriptionRef}>
                                <p data-testid="description">Description</p>
                            </Card.Description>
                        </header>
                    </Card.Header>
                    <Card.Content asChild ref={contentRef}>
                        <section data-testid="content">Content</section>
                    </Card.Content>
                    <Card.Footer asChild ref={footerRef}>
                        <footer data-testid="footer">Footer</footer>
                    </Card.Footer>
                </section>
            </Card.Root>
        );

        expect(screen.getByTestId('card')).toHaveClass('acme-card-root');
        expect(screen.getByTestId('header')).toHaveClass('acme-card-header');
        expect(screen.getByTestId('title')).toHaveClass('acme-card-title');
        expect(screen.getByTestId('action')).toHaveClass('acme-card-action');
        expect(screen.getByTestId('description')).toHaveClass('acme-card-description');
        expect(screen.getByTestId('content')).toHaveClass('acme-card-content');
        expect(screen.getByTestId('footer')).toHaveClass('acme-card-footer');
        expect(rootRef.current?.tagName).toBe('SECTION');
        expect(headerRef.current?.tagName).toBe('HEADER');
        expect(titleRef.current?.tagName).toBe('H2');
        expect(descriptionRef.current?.tagName).toBe('P');
        expect(contentRef.current?.tagName).toBe('SECTION');
        expect(footerRef.current?.tagName).toBe('FOOTER');
    });
});
