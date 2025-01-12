import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Skeleton from '../Skeleton';

describe('Skeleton Component', () => {
    const mockChildren = <div>Test Children Component</div>;

    it('renders without crashing', () => {
        const { container } = render(
            <Skeleton loading={false}>{mockChildren}</Skeleton>
        );

        const spanElements = container.querySelectorAll('span');
        expect(spanElements.length).toEqual(0);

        const divElements = container.querySelectorAll('div');
        expect(divElements.length).toEqual(1);
        expect(divElements[0]).toHaveTextContent('Test Children Component');
    });

    it('renders with span wrapper on loading is true', () => {
        const { container } = render(
            <Skeleton loading={true}>{mockChildren}</Skeleton>
        );

        const spanElements = container.querySelectorAll('span');
        expect(spanElements.length).toEqual(1);
    });

    it('renders with custom class', () => {
        const { container } = render(
            <Skeleton
                loading={true}
                customRootClass="custom-root-class"
                className="custom-class">
                {mockChildren}
            </Skeleton>
        );

        const spanElement = container.querySelector('span');
        expect(spanElement).toHaveClass('custom-root-class', 'custom-class');
    });

    it('renders with custom props', async () => {
        const mockOnClick = jest.fn();
        const { container } = render(
            <Skeleton loading={true} id="item-1" onClick={mockOnClick}>
                {mockChildren}
            </Skeleton>
        );

        const spanElement = container.querySelector('span');
        expect(spanElement).toHaveAttribute('id', 'item-1');

        await userEvent.click(spanElement!);
        expect(mockOnClick).toHaveBeenCalled();
    });
});
