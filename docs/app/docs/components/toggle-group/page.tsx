import toggleGroupMetadata from './seo'
import Content from './content.mdx'

export const metadata = toggleGroupMetadata

export default function Page() {
  return <Content />
}
