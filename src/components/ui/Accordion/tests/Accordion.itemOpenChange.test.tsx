import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from '../Accordion';

const Items = ({ onA, onB }: { onA: jest.Mock; onB: jest.Mock }) => (
    <>
        <Accordion.Item value="a" onOpenChange={onA}>
            <Accordion.Header><Accordion.Trigger>A</Accordion.Trigger></Accordion.Header>
            <Accordion.Content>Answer A</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="b" onOpenChange={onB}>
            <Accordion.Header><Accordion.Trigger>B</Accordion.Trigger></Accordion.Header>
            <Accordion.Content>Answer B</Accordion.Content>
        </Accordion.Item>
    </>
);

const Faq = ({ onA, onB, type = 'single' }: { onA: jest.Mock; onB: jest.Mock; type?: 'single' | 'multiple' }) => (
    type === 'single'
        ? <Accordion.Root type="single" collapsible defaultValue="a"><Items onA={onA} onB={onB} /></Accordion.Root>
        : <Accordion.Root type="multiple" defaultValue={['a']}><Items onA={onA} onB={onB} /></Accordion.Root>
);

describe('Accordion.Item onOpenChange', () => {
    test('is not called on mount', () => {
        const onA = jest.fn();
        const onB = jest.fn();
        render(<Faq onA={onA} onB={onB} />);
        expect(onA).not.toHaveBeenCalled();
        expect(onB).not.toHaveBeenCalled();
    });

    test('single: opening B reports B open and A closed', async() => {
        const user = userEvent.setup();
        const onA = jest.fn();
        const onB = jest.fn();
        render(<Faq onA={onA} onB={onB} />);
        await user.click(screen.getByText('B'));
        expect(onB).toHaveBeenCalledWith(true);
        expect(onA).toHaveBeenCalledWith(false);
    });

    test('multiple: items report independently', async() => {
        const user = userEvent.setup();
        const onA = jest.fn();
        const onB = jest.fn();
        render(<Faq onA={onA} onB={onB} type="multiple" />);
        await user.click(screen.getByText('B'));
        expect(onB).toHaveBeenLastCalledWith(true);
        expect(onA).not.toHaveBeenCalled();
        await user.click(screen.getByText('A'));
        expect(onA).toHaveBeenLastCalledWith(false);
    });
});
