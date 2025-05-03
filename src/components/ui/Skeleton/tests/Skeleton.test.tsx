import React from 'react';
import { render, screen } from '@testing-library/react';
import Skeleton from '../Skeleton';

describe('Skeleton', () => {
    const defaultProps = {
        height: '100px',
        width: '200px',
        radius: '10px'
    };

    it('renders children when loading is false', () => {
        render(
            <Skeleton {...defaultProps} loading={false}>
                <p>Loaded content</p>
            </Skeleton>
        );

        expect(screen.getByText('Loaded content')).toBeInTheDocument();
    });

    it('renders skeleton when loading is true', () => {
        const { container } = render(
            <Skeleton {...defaultProps} loading={true}>
                <p>Hidden content</p>
            </Skeleton>
        );

        // Should not show children
        expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();

        // Should render a div
        const div = container.querySelector('div');
        expect(div).toBeInTheDocument();
    });

    it('applies custom class names correctly', () => {
        const { container } = render(
            <Skeleton
                {...defaultProps}
                loading={true}
                className="custom-class"
                customRootClass="custom-root"
            >
                <div>Child</div>
            </Skeleton>
        );

        const div = container.querySelector('div');
        expect(div?.className).toContain('custom-class');
        expect(div?.className).toContain('custom-root'); // depends on customClassSwitcher output
    });

    it('applies custom CSS variables as inline styles', () => {
        const { container } = render(
            <Skeleton {...defaultProps} loading={true}>
                <div>Child</div>
            </Skeleton>
        );

        const div = container.querySelector('div')!;
        expect(div.style.getPropertyValue('--skeleton-height')).toBe('100px');
        expect(div.style.getPropertyValue('--skeleton-width')).toBe('200px');
        expect(div.style.getPropertyValue('--skeleton-radius')).toBe('10px');
    });
});
