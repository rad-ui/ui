import composeEventHandlers from './index';
import { mergeProps } from '~/core/utils/mergeProps';

// One rule for merging handlers (#1791): consumer first, ours skipped after
// preventDefault(), every argument forwarded. mergeProps (asChild) follows it too.

const event = (prevented = false) => ({ defaultPrevented: prevented });

describe('handler composition', () => {
    test('consumer runs first, then ours', () => {
        const calls: string[] = [];
        composeEventHandlers(() => calls.push('consumer'), () => calls.push('ours'))(event());
        expect(calls).toEqual(['consumer', 'ours']);
    });

    test('preventDefault() in the consumer skips ours, unless checking is off', () => {
        const ours = jest.fn();
        composeEventHandlers(() => {}, ours)(event(true));
        expect(ours).not.toHaveBeenCalled();
        composeEventHandlers(() => {}, ours, { checkForDefaultPrevented: false })(event(true));
        expect(ours).toHaveBeenCalledTimes(1);
    });

    test('every argument is forwarded, and non-event first arguments never skip', () => {
        const consumer = jest.fn();
        const ours = jest.fn();
        composeEventHandlers<string, [{ reason: string }]>(consumer, ours)('apple', { reason: 'item-press' });
        expect(consumer).toHaveBeenCalledWith('apple', { reason: 'item-press' });
        expect(ours).toHaveBeenCalledWith('apple', { reason: 'item-press' });
    });

    test('mergeProps composes the same way (child is the consumer)', () => {
        const calls: string[] = [];
        const merged: any = mergeProps(
            { onClick: () => calls.push('slot'), onValueChange: (value: string) => calls.push(`slot:${value}`) },
            { onClick: () => calls.push('child'), onValueChange: (value: string) => calls.push(`child:${value}`) }
        );
        merged.onClick(event());
        merged.onValueChange('a');
        expect(calls).toEqual(['child', 'slot', 'child:a', 'slot:a']);

        calls.length = 0;
        const preventing = mergeProps(
            { onClick: (_e: { defaultPrevented: boolean }) => { calls.push('slot'); } },
            { onClick: (e: { defaultPrevented: boolean }) => { e.defaultPrevented = true; calls.push('child'); } }
        );
        preventing.onClick(event());
        expect(calls).toEqual(['child']);
    });
});
