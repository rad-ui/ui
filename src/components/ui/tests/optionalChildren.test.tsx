import React from 'react';
import { render, screen } from '@testing-library/react';
import Checkbox from '~/components/ui/Checkbox/Checkbox';
import Switch from '~/components/ui/Switch/Switch';
import Progress from '~/components/ui/Progress/Progress';
import Slider from '~/components/ui/Slider/Slider';
import RadioGroup from '~/components/ui/RadioGroup/RadioGroup';
import Dialog from '~/components/ui/Dialog/Dialog';
import Tooltip from '~/components/ui/Tooltip/Tooltip';
import DropdownMenu from '~/components/ui/DropdownMenu/DropdownMenu';

// These parts work without children, and their types say so (rad-ui/ui#2334): a wrapper typed from
// `React.ComponentProps<typeof X.Root>` must not force every call site to pass children. This file
// type-checks only if `children` is optional on each part used without it below.
describe('parts that work without children', () => {
    test('controls render with no children', () => {
        render(
            <>
                <Checkbox.Root aria-label="agree" defaultChecked />
                <Switch.Root aria-label="notify" />
                <Progress.Root value={40} aria-label="upload" />
                <Slider.Root defaultValue={30} aria-label="volume" />
                <RadioGroup.Root aria-label="size">
                    <RadioGroup.Item value="s" aria-label="small" />
                </RadioGroup.Root>
            </>
        );
        expect(screen.getByRole('checkbox', { name: 'agree' })).toBeInTheDocument();
        expect(screen.getByRole('switch', { name: 'notify' })).toBeInTheDocument();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
        expect(screen.getByRole('radio', { name: 'small' })).toBeInTheDocument();
    });

    test('triggers accept their content through asChild without a direct children prop type error', () => {
        const props = { 'aria-label': 'open' };
        render(
            <>
                <Dialog.Root><Dialog.Trigger {...props} /></Dialog.Root>
                <Tooltip.Root><Tooltip.Trigger {...props} /><Tooltip.Content>tip</Tooltip.Content></Tooltip.Root>
                <DropdownMenu.Root><DropdownMenu.Trigger {...props} /></DropdownMenu.Root>
            </>
        );
        expect(screen.getAllByRole('button', { name: 'open' })).toHaveLength(3);
    });
});
