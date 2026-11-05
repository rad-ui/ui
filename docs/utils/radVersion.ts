import pkg from '../package.json'

/** The `@radui/ui` version the docs are pinned to, without the range prefix. */
export const RAD_UI_VERSION = String(pkg.dependencies['@radui/ui']).replace(/^[^\d]*/, '')
