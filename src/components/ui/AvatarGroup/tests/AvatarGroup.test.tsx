import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AvatarGroup from '../AvatarGroup';

const Comp = ({ className = '' }) => {
    return <AvatarGroup.Root className={className}>
        <AvatarGroup.Item>
            <AvatarGroup.Avatar src='https://i.pravatar.cc/300?img=1' alt='Avatar 1' />
            <AvatarGroup.Fallback>A</AvatarGroup.Fallback>
        </AvatarGroup.Item>
        <AvatarGroup.Item>
            <AvatarGroup.Avatar src='https://i.pravatar.cc/300?img=1' alt='Avatar 2' />
            <AvatarGroup.Fallback>B</AvatarGroup.Fallback>
        </AvatarGroup.Item>
        <AvatarGroup.Item>
            <AvatarGroup.Avatar src='https://i.pravatar.cc/300?img=1' alt='Avatar 3' />
            <AvatarGroup.Fallback>C</AvatarGroup.Fallback>
        </AvatarGroup.Item>
    </AvatarGroup.Root>;
};

describe('AvatarGroup', () => {
    test('renders AvatarGroup component', () => {
        render(<Comp />);
        expect(screen.getByAltText('Avatar 1')).toBeInTheDocument();
        expect(screen.getByAltText('Avatar 2')).toBeInTheDocument();
        expect(screen.getByAltText('Avatar 3')).toBeInTheDocument();
    });

    test('AvatarGroup renders fallback text when src is not provided', () => {
        render(<Comp />);
        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.getByText('B')).toBeInTheDocument();
    });

    test('AvatarGroup applies className correctly', () => {
        const customClass = 'acme-corp';
        render(<Comp className={customClass} />);
        expect(screen.getByText('A').parentElement!.parentElement).toHaveClass(customClass);
    });

    test('AvatarGroup renders correct number of avatars', () => {
        render(<Comp />);
        const avatarImages = screen.getAllByRole('img');
        expect(avatarImages.length).toBe(3);
    });

    test('AvatarGroup renders correct src for each avatar', () => {
        render(<Comp />);
        const avatarImages = screen.getAllByRole('img');
        avatarImages.forEach(img => {
            expect(img).toHaveAttribute('src', 'https://i.pravatar.cc/300?img=1');
        });
    });

    test('AvatarGroup renders for broken image src', () => {
        render(<Comp />);
        const avatarImages = screen.getAllByRole('img');
        avatarImages.forEach(img => {
            fireEvent.error(img);
            // Assert that the fallback text is rendered
            expect(screen.getByText('A')).toBeInTheDocument();
        });
    });

    test('forwards refs to subcomponents', () => {
        const rootRef = React.createRef<HTMLDivElement>();
        const itemRef = React.createRef<HTMLElement>();
        const avatarRef = React.createRef<HTMLElement>();
        const fallbackRef = React.createRef<HTMLElement>();
        render(
            <AvatarGroup.Root ref={rootRef}>
                <AvatarGroup.Item ref={itemRef}>
                    <AvatarGroup.Avatar ref={avatarRef} src='https://i.pravatar.cc/300?img=1' alt='Avatar 1' />
                    <AvatarGroup.Fallback ref={fallbackRef}>A</AvatarGroup.Fallback>
                </AvatarGroup.Item>
            </AvatarGroup.Root>
        );
        expect(rootRef.current).not.toBeNull();
        expect(itemRef.current).not.toBeNull();
        expect(avatarRef.current).not.toBeNull();
        expect(fallbackRef.current).not.toBeNull();
    });

    // test('renders color for fallback when src is not provided', async() => {
    //     render(<AvatarGroup avatars={avatarsWithFallback} color='blue'/>);
    //     expect(screen.getByText('A')).toHaveAttribute('data-color', 'blue');
    //     expect(screen.getByText('B')).toHaveAttribute('data-color', 'blue');
    // });
});

describe('AvatarGroup styling hooks', () => {
    const fs = require('node:fs');
    const path = require('node:path');
    const stylesheet = fs.readFileSync(path.resolve(__dirname, '../avatar-group.clarity.scss'), 'utf8');

    test('Avatar part gets a namespaced class that the stylesheet sizes and crops', () => {
        render(
            <AvatarGroup.Root customRootClass="rad-ui">
                <AvatarGroup.Item>
                    <AvatarGroup.Avatar src="a.png" alt="A" className="extra" />
                    <AvatarGroup.Fallback>A</AvatarGroup.Fallback>
                </AvatarGroup.Item>
            </AvatarGroup.Root>
        );
        const image = screen.getByAltText('A');
        expect(image).toHaveClass('rad-ui-avatar-group-avatar', 'extra');
        expect(stylesheet).toMatch(/\.rad-ui-avatar-group-avatar\s*\{[^}]*object-fit: cover/);
    });

    test('Item color is reflected and has accent fallback styles', () => {
        render(
            <AvatarGroup.Root customRootClass="rad-ui">
                <AvatarGroup.Item color="blue" data-testid="item">
                    <AvatarGroup.Fallback>B</AvatarGroup.Fallback>
                </AvatarGroup.Item>
            </AvatarGroup.Root>
        );
        expect(screen.getByTestId('item')).toHaveAttribute('data-color', 'blue');
        expect(stylesheet).toContain('&[data-color]:not([data-rad-ui-has-image])');
    });

    test('a broken image falls back to the item fallback', () => {
        render(
            <AvatarGroup.Root>
                <AvatarGroup.Item data-testid="item">
                    <AvatarGroup.Avatar src="broken.png" alt="Broken" />
                    <AvatarGroup.Fallback>C</AvatarGroup.Fallback>
                </AvatarGroup.Item>
            </AvatarGroup.Root>
        );
        fireEvent.error(screen.getByAltText('Broken'));
        expect(screen.queryByAltText('Broken')).not.toBeInTheDocument();
        expect(screen.getByText('C')).toBeInTheDocument();
    });
});
