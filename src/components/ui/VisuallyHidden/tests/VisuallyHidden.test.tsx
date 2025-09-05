import React from 'react';
import { render } from '@testing-library/react';
import VisuallyHidden from '../VisuallyHidden';

describe('VisuallyHidden', () => {
    test('forwards ref to span element', () => {
        const ref = React.createRef<HTMLSpanElement>();
        render(
            <VisuallyHidden ref={ref} asChild>
                <span>Hidden content</span>
            </VisuallyHidden>
        );
        expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
});
