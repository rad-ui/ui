import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const changesetDir = path.join(__dirname, '..', '.changeset')

function readChangesetFiles () {
  if (!fs.existsSync(changesetDir)) {
    return []
  }
  return fs.readdirSync(changesetDir).filter((name) => name.endsWith('.md') && name !== 'README.md')
}

function parseChangeset (content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) {
    return null
  }
  const frontmatter = match[1]
  return {
    frontmatter,
    body: match[2] ?? ''
  }
}

function hasMajorBump (frontmatter) {
  return /"@radui\/ui"\s*:\s*major\b/m.test(frontmatter)
}

function documentsBreakingChange (body) {
  return /BREAKING|Breaking change|breaking change/m.test(body)
}

let failed = false

for (const file of readChangesetFiles()) {
  const fullPath = path.join(changesetDir, file)
  const content = fs.readFileSync(fullPath, 'utf8')
  const parsed = parseChangeset(content)
  if (!parsed) {
    console.error(`[changeset] Invalid frontmatter in ${file}`)
    failed = true
    continue
  }
  if (hasMajorBump(parsed.frontmatter) && !documentsBreakingChange(parsed.body)) {
    console.error(
      `[changeset] ${file}: major bump for "@radui/ui" must include a breaking-change note (e.g. "BREAKING:" or "Breaking change" in the changeset body).`
    )
    failed = true
  }
}

if (failed) {
  process.exit(1)
}
