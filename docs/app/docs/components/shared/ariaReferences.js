import Text from '@radui/ui/Text';

export const ariaReferenceColumns = [
    {
        name: 'Reference',
        id: 'reference'
    },
    {
        name: 'What Rad UI follows',
        id: 'description'
    }
];

export const DOCS_ARIA_PATTERNS = Object.freeze({
    ACCORDION: {
        id: 'accordion',
        label: 'Accordion pattern',
        href: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/'
    },
    ALERT_DIALOG: {
        id: 'alert-dialog',
        label: 'Alert dialog pattern',
        href: 'https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/'
    },
    COMBOBOX: {
        id: 'combobox',
        label: 'Combobox pattern',
        href: 'https://www.w3.org/WAI/ARIA/apg/patterns/combobox/'
    },
    DIALOG_MODAL: {
        id: 'dialog-modal',
        label: 'Dialog modal pattern',
        href: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/'
    },
    LISTBOX: {
        id: 'listbox',
        label: 'Listbox pattern',
        href: 'https://www.w3.org/WAI/ARIA/apg/patterns/listbox/'
    },
    MENU: {
        id: 'menu',
        label: 'Menu pattern',
        href: 'https://www.w3.org/WAI/ARIA/apg/patterns/menubar/'
    },
    MENUBAR: {
        id: 'menubar',
        label: 'Menubar pattern',
        href: 'https://www.w3.org/WAI/ARIA/apg/patterns/menubar/'
    },
    MENU_BUTTON: {
        id: 'menu-button',
        label: 'Menu button pattern',
        href: 'https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/'
    },
    RADIO_GROUP: {
        id: 'radio-group',
        label: 'Radio group pattern',
        href: 'https://www.w3.org/WAI/ARIA/apg/patterns/radio/'
    },
    TABS: {
        id: 'tabs',
        label: 'Tabs pattern',
        href: 'https://www.w3.org/WAI/ARIA/apg/patterns/tabs/'
    },
    TOOLTIP: {
        id: 'tooltip',
        label: 'Tooltip pattern',
        href: 'https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/'
    }
});

export const createAriaReferenceRow = (pattern, description) => {
    if (!pattern || typeof pattern !== 'object' || !pattern.id || !pattern.label || !pattern.href) {
        throw new Error('createAriaReferenceRow: invalid pattern; use a DOCS_ARIA_PATTERNS value.');
    }

    return {
        id: pattern.id,
        reference: (
            <a
                className="font-medium text-blue-900 underline underline-offset-4 hover:text-blue-700"
                href={pattern.href}
                rel="noreferrer"
                target="_blank"
            >
                {pattern.label}
            </a>
        ),
        description: <Text>{description}</Text>
    };
};

export const createAriaReferenceTable = (rows = []) => ({
    columns: ariaReferenceColumns,
    data: rows
});
