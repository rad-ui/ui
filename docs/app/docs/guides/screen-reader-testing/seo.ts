import generateSeoMetadata from '@/utils/seo/generateSeoMetadata'

const screenReaderTestingMetadata = generateSeoMetadata({
  title: 'Screen reader testing | Rad UI',
  description: "A testing matrix for NVDA, JAWS and VoiceOver across Rad UI components: what to announce, how to test it, and the known differences between readers.",
    canonicalUrl: "https://www.rad-ui.com/docs/guides/screen-reader-testing"
})

export default screenReaderTestingMetadata
