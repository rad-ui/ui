import React, { Profiler } from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../Select/Select';
import Combobox from '../Combobox/Combobox';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

// #1850, #1826: moving the highlight re-renders only the item losing it and the item gaining it.
// Each item sits in a Profiler, which counts a render whenever anything inside the item renders.
// Before the fix, one arrow key re-rendered every item (300 in a 300-item Select, 600 in a Combobox).

const N = 300;
let renders = 0;
const count = () => { renders += 1; };
const items = Array.from({ length: N }, (_, i) => i);
const flush = () => act(async() => { await new Promise((resolve) => setTimeout(resolve, 0)); });

async function rendersFor(press: () => Promise<void>) {
    renders = 0;
    await press();
    await flush();
    return renders;
}

test('Select: an arrow key re-renders at most two of 300 options', async() => {
    const user = userEvent.setup();
    render(
        <Select.Root>
            <Select.Trigger aria-label="Pick"><Select.Value /></Select.Trigger>
            <Select.Portal><Select.Content>
                {items.map((i) => <Profiler key={i} id={String(i)} onRender={count}><Select.Item value={String(i)}>{`Item ${i}`}</Select.Item></Profiler>)}
            </Select.Content></Select.Portal>
        </Select.Root>
    );
    await user.click(screen.getByRole('combobox', { name: 'Pick' }));
    await flush();
    await user.keyboard('{ArrowDown}');
    await flush();
    expect(await rendersFor(() => user.keyboard('{ArrowDown}'))).toBeLessThanOrEqual(2);
});

test('Combobox with search: an arrow key re-renders at most two of 300 options', async() => {
    const user = userEvent.setup();
    render(
        <Combobox.Root>
            <Combobox.Trigger aria-label="Pick"><Combobox.Value /></Combobox.Trigger>
            <Combobox.Portal><Combobox.Content>
                <Combobox.Search aria-label="Search" />
                {items.map((i) => <Profiler key={i} id={String(i)} onRender={count}><Combobox.Item value={String(i)}>{`Item ${i}`}</Combobox.Item></Profiler>)}
            </Combobox.Content></Combobox.Portal>
        </Combobox.Root>
    );
    await user.click(screen.getByRole('combobox', { name: 'Pick' }));
    await flush();
    await user.keyboard('{ArrowDown}');
    await flush();
    expect(await rendersFor(() => user.keyboard('{ArrowDown}'))).toBeLessThanOrEqual(2);
});

test('DropdownMenu: an arrow key re-renders at most two of 100 items', async() => {
    const user = userEvent.setup();
    render(
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>Menu</DropdownMenu.Trigger>
            <DropdownMenu.Portal><DropdownMenu.Content>
                {items.slice(0, 100).map((i) => <Profiler key={i} id={String(i)} onRender={count}><DropdownMenu.Item label={`Item ${i}`}>{`Item ${i}`}</DropdownMenu.Item></Profiler>)}
            </DropdownMenu.Content></DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
    await user.click(screen.getByRole('button', { name: 'Menu' }));
    await flush();
    await user.keyboard('{ArrowDown}');
    await flush();
    expect(await rendersFor(() => user.keyboard('{ArrowDown}'))).toBeLessThanOrEqual(2);
});
