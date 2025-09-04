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
        expect(screen.getByText('A').parentElement.parentElement).toHaveClass(customClass);
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
        const rootRef = React.createRef();
        const itemRef = React.createRef();
        const avatarRef = React.createRef();
        const fallbackRef = React.createRef();
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
    //     expect(screen.getByText('A')).toHaveAttribute('data-rad-ui-accent-color', 'blue');
    //     expect(screen.getByText('B')).toHaveAttribute('data-rad-ui-accent-color', 'blue');
    // });
});
