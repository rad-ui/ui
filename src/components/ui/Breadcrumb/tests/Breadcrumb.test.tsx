import React from 'react';
import { render, screen } from '@testing-library/react';
import Breadcrumb from '../Breadcrumb';

describe('Breadcrumb', () => {
    test('renders accessible breadcrumb navigation by default', () => {
        render(
            <Breadcrumb.Root>
                <Breadcrumb.List>
                    <Breadcrumb.Item>
                        <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
                        <Breadcrumb.Separator />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Breadcrumb.Page>Docs</Breadcrumb.Page>
                    </Breadcrumb.Item>
                </Breadcrumb.List>
            </Breadcrumb.Root>
        );

        expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
        expect(screen.getByText('Docs')).toHaveAttribute('aria-current', 'page');
    });

    test('applies component part classes and custom class names', () => {
        render(
            <Breadcrumb.Root customRootClass="acme" className="root-extra">
                <Breadcrumb.List customRootClass="acme" className="list-extra">
                    <Breadcrumb.Item customRootClass="acme" className="item-extra">
                        <Breadcrumb.Link customRootClass="acme" className="link-extra" href="/">Home</Breadcrumb.Link>
                        <Breadcrumb.Separator customRootClass="acme" className="separator-extra">/</Breadcrumb.Separator>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item customRootClass="acme">
                        <Breadcrumb.Page customRootClass="acme" className="page-extra">Docs</Breadcrumb.Page>
                    </Breadcrumb.Item>
                </Breadcrumb.List>
            </Breadcrumb.Root>
        );

        expect(screen.getByRole('navigation')).toHaveClass('acme-breadcrumb-root', 'root-extra');
        expect(screen.getByRole('list')).toHaveClass('acme-breadcrumb-list', 'list-extra');
        expect(screen.getAllByRole('listitem')[0]).toHaveClass('acme-breadcrumb-item', 'item-extra');
        expect(screen.getByRole('link')).toHaveClass('acme-breadcrumb-link', 'link-extra');
        expect(screen.getByText('/')).toHaveClass('acme-breadcrumb-separator', 'separator-extra');
        expect(screen.getByText('Docs')).toHaveClass('acme-breadcrumb-page', 'page-extra');
    });

    test('supports asChild links', () => {
        render(
            <Breadcrumb.Root>
                <Breadcrumb.List>
                    <Breadcrumb.Item>
                        <Breadcrumb.Link asChild className="router-link">
                            <a href="/docs" data-testid="custom-link">Docs</a>
                        </Breadcrumb.Link>
                    </Breadcrumb.Item>
                </Breadcrumb.List>
            </Breadcrumb.Root>
        );

        expect(screen.getByTestId('custom-link')).toHaveClass('router-link');
        expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
    });

    test('forwards refs to every part', () => {
        const rootRef = React.createRef<HTMLElement>();
        const listRef = React.createRef<HTMLOListElement>();
        const itemRef = React.createRef<HTMLLIElement>();
        const linkRef = React.createRef<HTMLAnchorElement>();
        const pageRef = React.createRef<HTMLSpanElement>();
        const separatorRef = React.createRef<HTMLSpanElement>();

        render(
            <Breadcrumb.Root ref={rootRef}>
                <Breadcrumb.List ref={listRef}>
                    <Breadcrumb.Item ref={itemRef}>
                        <Breadcrumb.Link ref={linkRef} href="/">Home</Breadcrumb.Link>
                        <Breadcrumb.Separator ref={separatorRef} />
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Breadcrumb.Page ref={pageRef}>Docs</Breadcrumb.Page>
                    </Breadcrumb.Item>
                </Breadcrumb.List>
            </Breadcrumb.Root>
        );

        expect(rootRef.current).toBeInstanceOf(HTMLElement);
        expect(listRef.current).toBeInstanceOf(HTMLOListElement);
        expect(itemRef.current).toBeInstanceOf(HTMLLIElement);
        expect(linkRef.current).toBeInstanceOf(HTMLAnchorElement);
        expect(pageRef.current).toBeInstanceOf(HTMLSpanElement);
        expect(separatorRef.current).toBeInstanceOf(HTMLSpanElement);
    });
});
