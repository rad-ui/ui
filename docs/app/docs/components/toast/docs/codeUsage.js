import { getSourceCodeFromPath } from '@/utils/parseSourceCode'

import provider_api from './component_api/provider.tsx'
import portal_api from './component_api/portal.tsx'
import viewport_api from './component_api/viewport.tsx'
import root_api from './component_api/root.tsx'
import content_api from './component_api/content.tsx'
import title_api from './component_api/title.tsx'
import description_api from './component_api/description.tsx'
import action_api from './component_api/action.tsx'
import close_api from './component_api/close.tsx'
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
    'docs/app/docs/components/toast/docs/example_1.tsx',
)
const example_positions_SourceCode = await getSourceCodeFromPath(
    'docs/app/docs/components/toast/docs/example_positions.tsx',
)
const example_promise_SourceCode = await getSourceCodeFromPath(
    'docs/app/docs/components/toast/docs/example_promise.tsx',
)
const example_isolated_SourceCode = await getSourceCodeFromPath(
    'docs/app/docs/components/toast/docs/example_isolated_manager.tsx',
)
const example_action_SourceCode = await getSourceCodeFromPath(
    'docs/app/docs/components/toast/docs/example_action.tsx',
)
const example_limit_SourceCode = await getSourceCodeFromPath(
    'docs/app/docs/components/toast/docs/example_limit.tsx',
)
const example_expand_SourceCode = await getSourceCodeFromPath(
    'docs/app/docs/components/toast/docs/example_expand.tsx',
)

const scss_SourceCode = await getSourceCodeFromPath('src/components/ui/Toast/toast.clarity.scss')
const anatomy_SourceCode = await getSourceCodeFromPath('docs/app/docs/components/toast/docs/anatomy.tsx')

export const code = {
    javascript: { code: example_1_SourceCode },
    scss: { code: scss_SourceCode },
}

export const positionsCodeUsage = {
    javascript: { code: example_positions_SourceCode },
    scss: { code: scss_SourceCode },
}

export const promiseCodeUsage = {
    javascript: { code: example_promise_SourceCode },
    scss: { code: scss_SourceCode },
}

export const isolatedCodeUsage = {
    javascript: { code: example_isolated_SourceCode },
    scss: { code: scss_SourceCode },
}

export const actionCodeUsage = {
    javascript: { code: example_action_SourceCode },
    scss: { code: scss_SourceCode },
}

export const limitCodeUsage = {
    javascript: { code: example_limit_SourceCode },
    scss: { code: scss_SourceCode },
}

export const expandCodeUsage = {
    javascript: { code: example_expand_SourceCode },
    scss: { code: scss_SourceCode },
}

export const anatomy = { code: anatomy_SourceCode }

export const api_documentation = {
    provider: provider_api,
    portal: portal_api,
    viewport: viewport_api,
    root: root_api,
    content: content_api,
    title: title_api,
    description: description_api,
    action: action_api,
    close: close_api,
}

export const keyboardShortcuts = createKeyboardShortcutTable([
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.TAB,
        'Moves focus through any interactive content inside visible toasts, including action and close buttons. Focusing the viewport expands the stack.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SHIFT_TAB,
        'Moves focus to the previous focusable control and keeps the stack expanded while focus remains inside the viewport.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.ENTER,
        'Activates the focused Toast.Action or Toast.Close button.'
    ),
    createKeyboardShortcutRow(
        DOCS_KEYBOARD_SHORTCUTS.SPACE,
        'Activates the focused Toast.Action or Toast.Close button.'
    )
])

export const ariaReferences = createAriaReferenceTable([
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.LIVE_REGION,
        'Each Toast.Root uses aria-live with aria-atomic so assistive technologies announce notification updates. High-priority toasts announce assertively; other toasts announce politely.'
    ),
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.BUTTON,
        'Toast.Action and Toast.Close render native buttons, so activation follows the standard button keyboard model.'
    ),
    createAriaReferenceRow(
        DOCS_ARIA_PATTERNS.REGION,
        'Toast.Viewport exposes the notifications stack as a labelled region while preserving normal focus movement through interactive toast controls.'
    )
])

export default code
