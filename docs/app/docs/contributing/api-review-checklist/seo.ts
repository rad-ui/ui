import generateSeoMetadata from '@/utils/seo/generateSeoMetadata'

const apiReviewChecklistMetadata = generateSeoMetadata({
  title: 'API review checklist | Rad UI',
  description: "The checklist Rad UI maintainers run on every new public export or API change before it ships: naming, types, accessibility, docs and tests.",
    canonicalUrl: "https://www.rad-ui.com/docs/contributing/api-review-checklist"
})

export default apiReviewChecklistMetadata
