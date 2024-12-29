import React from 'react';
import { render, screen } from '@testing-library/react';
import AvatarGroup from '../AvatarGroup';

describe('AvatarGroup', () => {
    const avatars = [
        { fallback: 'A', src: 'https://i.pravatar.cc/300?img=1', alt: 'Avatar 1' },
        { fallback: 'B', src: 'https://i.pravatar.cc/300?img=2', alt: 'Avatar 2' },
        { fallback: 'C', src: 'https://i.pravatar.cc/300?img=3', alt: 'Avatar 3' },
    ];
    const avatarsWithFallback = [
        { fallback: 'A', src: '', alt: 'Avatar 1' },
        { fallback: 'B', src: '', alt: 'Avatar 2' },
    ];
    
    test('renders AvatarGroup component', () => {
        render(<AvatarGroup avatars={avatars} />);
        expect(screen.getByAltText('Avatar 1')).toBeInTheDocument();
        expect(screen.getByAltText('Avatar 2')).toBeInTheDocument();
        expect(screen.getByAltText('Avatar 3')).toBeInTheDocument();
    });

    test('AvatarGroup renders fallback text when src is not provided', () => {
        
        render(<AvatarGroup avatars={avatarsWithFallback} size="md" />);
        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.getByText('B')).toBeInTheDocument();
    });

    test('AvatarGroup applies className correctly', () => {
        const customClass = 'custom-class';
        render(<AvatarGroup avatars={avatarsWithFallback} size="md" className={customClass} />);
        expect(screen.getByText('A').parentElement.parentElement).toHaveClass(customClass);
    });

    test('AvatarGroup renders correct number of avatars', () => {
        render(<AvatarGroup avatars={avatars} size="md" />);
        const avatarImages = screen.getAllByRole('img');
        expect(avatarImages.length).toBe(avatars.length);
    });
    
    test('AvatarGroup renders correct src for each avatar', () => {
        render(<AvatarGroup avatars={avatars} size="md" />);
        avatars.forEach(avatar => {
            const img = screen.getByAltText(avatar.alt);
            expect(img).toHaveAttribute('src', avatar.src);
        });
    });
});

