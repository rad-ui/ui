import fs from 'fs';
import path from 'path';

// Callback props follow one convention (#1785):
// - state changes: `on<Thing>Change(value, details?)`, plus `on<Thing>ChangeComplete` / `on<Thing>Commit`
// - DOM events keep their React names (`onClick`, `onKeyDown`...)
// - a short, reviewed list of event-style callbacks below.
// A new name outside these fails here: rename it, or add it with a reason.

const DOM_EVENT = /^on(Click|DoubleClick|Focus|Blur|Key(Down|Up)(Capture)?|Mouse[A-Z]\w*|Pointer[A-Z]\w*|Touch[A-Z]\w*|Change|Input|Submit|Scroll|Load|Error|Wheel|ContextMenu|Invalid|Reset|Select|AnimationEnd|TransitionEnd)$/;
const STATE_CHANGE = /^on[A-Z]\w*(Change|ChangeComplete|Commit)$/;
const REVIEWED: Record<string, string> = {
    onDismiss: 'toast option: the toast was dismissed',
    onClose: 'toast option: the toast began closing',
    onRemove: 'toast option: the toast left the DOM',
    onEscapeKeyDown: 'dismissable layer event, cancelable',
    onInteractOutside: 'dismissable layer event, cancelable',
    onFocusOutside: 'dismissable layer event, cancelable',
    onClickOutside: 'deprecated alias of onOpenChange reason outside-press',
    onOpenAutoFocus: 'focus scope event, cancelable',
    onCloseAutoFocus: 'focus scope event, cancelable',
    onItemHighlighted: 'list highlight notification',
    onFormSubmit: 'Form: parsed values on valid submit',
    onClearErrors: 'Form: server errors cleared after edits',
    onValueInvalid: 'OTPField: rejected character',
    onValueComplete: 'OTPField: every slot filled',
    onNavigate: 'link navigation hook',
    onMatch: 'internal match notification',
    onLoadingStatusChange: 'matches STATE_CHANGE; listed for clarity'
};
// Internal context/hook members, not public props.
const INTERNAL = new Set(['onOpen', 'onSettle', 'onCommit', 'onFieldFocus', 'onFieldBlur', 'onChildOpenChange', 'onChildSwipingChange', 'onChildRefReady', 'onToggleSelect', 'onEnter', 'onLeave', 'onPlaced', 'onProgress']);

const walk = (dir: string): string[] => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return /tests|stories|__/.test(entry.name) ? [] : walk(full);
    return /\.tsx?$/.test(entry.name) ? [full] : [];
});

test('callback props follow the naming convention', () => {
    const roots = ['components/ui', 'core/primitives'].map((dir) => path.resolve(__dirname, '../../..', dir));
    const offenders = new Set<string>();
    let seen = 0;
    for (const file of roots.flatMap(walk)) {
        for (const match of fs.readFileSync(file, 'utf8').matchAll(/^\s+(on[A-Z]\w*)\??:/gm)) {
            const name = match[1];
            seen += 1;
            if (DOM_EVENT.test(name) || STATE_CHANGE.test(name) || name in REVIEWED || INTERNAL.has(name)) continue;
            offenders.add(`${name} (${path.relative(process.cwd(), file)})`);
        }
    }
    // Guard against the scan silently finding nothing.
    expect(seen).toBeGreaterThan(50);
    expect([...offenders]).toEqual([]);
});
