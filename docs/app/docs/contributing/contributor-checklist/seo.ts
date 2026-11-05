import generateSeoMetadata from '@/utils/seo/generateSeoMetadata'

const contributorChecklistMetadata = generateSeoMetadata({
  title: 'Contributor checklist | Rad UI',
  description: "What every Rad UI pull request needs before review: documentation, unit and browser tests, accessibility checks, a changeset and a clean lint run.",
    canonicalUrl: "https://www.rad-ui.com/docs/contributing/contributor-checklist"
})

export default contributorChecklistMetadata
