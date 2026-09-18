import { getSourceCodeFromPath } from '@/utils/parseSourceCode'

import root_api from './component_api/root.tsx'
import trigger_api from './component_api/trigger.tsx'
import portal_api from './component_api/portal.tsx'
import overlay_api from './component_api/overlay.tsx'
import content_api from './component_api/content.tsx'
import title_api from './component_api/title.tsx'
import description_api from './component_api/description.tsx'
import close_api from './component_api/close.tsx'
import handle_api from './component_api/handle.tsx'
import {
    createAriaReferenceRow,
    createAriaReferenceTable,
    DOCS_ARIA_PATTERNS,
} from '../../shared/ariaReferences'
import {
    createKeyboardShortcutRow,
    createKeyboardShortcutTable,
    DOCS_KEYBOARD_SHORTCUTS,
} from '../../shared/keyboardShortcuts'

const example_1_SourceCode = await getSourceCodeFromPath(
    'docs/app/docs/components/drawer/docs/examples/DrawerExample.tsx',
)
const example_modes_SourceCode = await getSourceCodeFromPath(
    'docs/app/docs/components/drawer/docs/examples/DrawerModesExample.tsx',
)
const example_directions_SourceCode = await getSourceCodeFromPath(
    'docs/app/docs/components/drawer/docs/examples/DrawerDirectionsExample.tsx',
)
const scss_SourceCode = await getSourceCodeFromPath('src/components/ui/Drawer/drawer.clarity.scss')
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/drawer/docs/anatomy.tsx')

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode },
}

export const modesCodeUsage = {
    javascript: { code: example_modes_SourceCode },
    scss: { code: scss_SourceCode },
}

export const directionsCodeUsage = {
    javascript: { code: example_directions_SourceCode },
    scss: { code: scss_SourceCode },
}

export const anatomy = { code: anatomy_SourceCode }

export const api_documentation = {
    root: root_api,
    trigger: trigger_api,
    portal: portal_api,
    overlay: overlay_api,
    content: content_api,
    title: title_api,
    description: description_api,
    close: close_api,
    handle: handle_api,
}

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus through tabbable controls inside the drawer. Modal drawers keep focus contained until closed.',
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SHIFT_TAB,
        'Moves focus backward through tabbable controls inside the drawer. Modal drawers keep focus contained until closed.',
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'Activates Drawer.Trigger or Drawer.Close when either control has focus.',
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SPACE,
        'Activates Drawer.Trigger or Drawer.Close when either control has focus.',
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ESCAPE,
        'Closes the drawer unless outside dismissal is disabled by the root configuration.',
    ),
])

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.DIALOG_MODAL,
        'Drawer.Content uses dialog semantics and sets aria-modal from the Drawer.Root modal behavior.',
    ),
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.DIALOG_LABELING,
        'Label Drawer.Content with Drawer.Title and describe it with Drawer.Description using aria-labelledby and aria-describedby.',
    ),
])

export default code
