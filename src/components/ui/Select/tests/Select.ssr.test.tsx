/** @jest-environment node */

import React from 'react';
import Select from '../Select';

// @ts-ignore - React 18/19 server rendering types may not be present
const { renderToString } = require('react-dom/server.node');

describe('Select server rendering', () => {
    test('renders a portal without accessing document', () => {
        expect(() => renderToString(
            <Select.Root>
                <Select.Trigger>Choose a framework</Select.Trigger>
                <Select.Portal>
                    <Select.Content>
                        <Select.Item value="react">React</Select.Item>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        )).not.toThrow();
    });
});
