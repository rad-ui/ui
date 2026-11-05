import generateSeoMetadata from '@/utils/seo/generateSeoMetadata'

const cssVariableFallbacksMetadata = generateSeoMetadata({
  title: 'CSS variable fallbacks | Rad UI',
  description: "How Rad UI theme tokens are exposed as CSS custom properties, and the fallback patterns to use so components still look right when a token is missing."
})

export default cssVariableFallbacksMetadata
