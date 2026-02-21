import React from 'react';
import { render } from '@testing-library/react';
import { axe, keyboard } from 'test-utils';

function Example() {
    const [count, setCount] = React.useState(0);
    return (
        <div>
            <button onClick={() => setCount(c => c + 1)}>Increment</button>
            <p>Count: {count}</p>
        </div>
    );
}

test('increment via keyboard and has no axe violations', async() => {
    const { getByRole, getByText } = render(<Example />);
    const user = keyboard();
    await user.tab();
    await user.keyboard('{Enter}');
    expect(getByText('Count: 1')).toBeInTheDocument();
    const results = await axe();
    expect(results.violations).toHaveLength(0);
});
