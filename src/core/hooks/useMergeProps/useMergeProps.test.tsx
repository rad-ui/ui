import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import useMergeProps from './index';

/**
 * Helper component that applies `useMergeProps` and renders the cloned child.
 */
const Merge = (
    { elementProps, child, primitiveRef }: {
        elementProps: Record<string, any>;
        child: React.ReactElement;
        primitiveRef?: React.Ref<any>;
    }
) => {
    const mergedProps = useMergeProps(elementProps, child, primitiveRef);
    return React.cloneElement(child, mergedProps);
};

describe('useMergeProps', () => {
    test('merges classNames, refs, and prioritizes child props', () => {
        const parentRef = React.createRef<HTMLDivElement>();
        const childRef = React.createRef<HTMLDivElement>();
        const child = <div ref={childRef} data-test="child" className="child" />;

        const { container } = render(
            <Merge
                elementProps={{ className: 'parent', 'data-test': 'parent' }}
                child={child}
                primitiveRef={parentRef}
            />
        );

        const div = container.firstChild as HTMLDivElement;
        expect(div.className).toBe('parent child');
        expect(div.getAttribute('data-test')).toBe('child');
        expect(parentRef.current).toBe(div);
        expect(childRef.current).toBe(div);
    });

    test('uses parent className when child lacks className', () => {
        const ref = React.createRef<HTMLDivElement>();
        const child = <div data-test="child" />;

        const { container } = render(
            <Merge elementProps={{ className: 'parent' }} child={child} primitiveRef={ref} />
        );

        const div = container.firstChild as HTMLDivElement;
        expect(div.className).toBe('parent');
        expect(ref.current).toBe(div);
    });

    test('child className retained when parent has none', () => {
        const child = <div className="child" data-test="child" />;

        const { container } = render(
            <Merge elementProps={{ 'data-test': 'parent' }} child={child} />
        );

        const div = container.firstChild as HTMLDivElement;
        expect(div.className).toBe('child');
        expect(div.getAttribute('data-test')).toBe('child');
    });

    test('child event handler overrides parent handler', () => {
        const parentClick = jest.fn();
        const childClick = jest.fn();
        const child = <button onClick={childClick}>Click</button>;

        const { getByRole } = render(
            <Merge elementProps={{ onClick: parentClick }} child={child} />
        );

        fireEvent.click(getByRole('button'));
        expect(childClick).toHaveBeenCalledTimes(1);
        expect(parentClick).not.toHaveBeenCalled();
    });

    test('parent handler used when child lacks handler', () => {
        const parentClick = jest.fn();
        const child = <button>Click</button>;

        const { getByRole } = render(
            <Merge elementProps={{ onClick: parentClick }} child={child} />
        );

        fireEvent.click(getByRole('button'));
        expect(parentClick).toHaveBeenCalledTimes(1);
    });

    test('composes callback refs from parent and child', () => {
        const parentRef = jest.fn();
        const childRef = jest.fn();
        const child = <div ref={childRef} />;

        const { container } = render(
            <Merge elementProps={{}} child={child} primitiveRef={parentRef} />
        );

        const div = container.firstChild as HTMLDivElement;
        expect(parentRef).toHaveBeenCalledWith(div);
        expect(childRef).toHaveBeenCalledWith(div);
    });
});

