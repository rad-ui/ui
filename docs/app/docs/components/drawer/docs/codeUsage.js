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

export default code
