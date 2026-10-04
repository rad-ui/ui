import React from 'react';

/** Static marker set on item components so a root can resolve labels from its element tree. */
export const COMBOBOX_ITEM_PART = '__radComboboxItemPart' as const;

export const markAsComboboxItemPart = <T extends object>(component: T): T => {
    (component as Record<string, unknown>)[COMBOBOX_ITEM_PART] = true;
    return component;
};

export function getNodeText(node: React.ReactNode): string {
    if (typeof node === 'string' || typeof node === 'number') {
        return String(node);
    }

    if (Array.isArray(node)) {
        return node.map(getNodeText).join('');
    }

    if (React.isValidElement(node)) {
        return getNodeText((node.props as { children?: React.ReactNode }).children);
    }

    return '';
}

/**
 * Finds the display label for `value` by walking the static element tree (through Content, Portal,
 * Group, fragments, ...). Items live inside the lazily mounted list, so this lets the trigger show
 * the item label before the list has ever been opened. Items rendered by custom components cannot
 * be seen here; callers fall back to the raw value for those.
 */
export function findItemLabel(node: React.ReactNode, value: string): string | null {
    let found: string | null = null;

    const visit = (child: React.ReactNode) => {
        if (found !== null) return;
        if (Array.isArray(child)) {
            child.forEach(visit);
            return;
        }
        if (!React.isValidElement(child)) return;

        const props = child.props as { value?: unknown; label?: unknown; children?: React.ReactNode };
        const isItem = Boolean((child.type as { [COMBOBOX_ITEM_PART]?: boolean })?.[COMBOBOX_ITEM_PART]);
        if (isItem && props.value === value) {
            const label = (typeof props.label === 'string' && props.label) || getNodeText(props.children).trim();
            found = label || null;
            return;
        }
        React.Children.forEach(props.children, visit);
    };

    visit(node);
    return found;
}
