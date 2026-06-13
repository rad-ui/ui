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

export default code
