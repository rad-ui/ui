/**
 * Static marker set on search components (primitive and styled wrappers) so Combobox content can
 * render them outside the role="listbox" element, as the WAI-ARIA combobox pattern requires.
 */
export const COMBOBOX_SEARCH_PART = '__radComboboxSearchPart' as const;

export const markAsComboboxSearchPart = <T extends object>(component: T): T => {
    (component as Record<string, unknown>)[COMBOBOX_SEARCH_PART] = true;
    return component;
};
