import toggleMetadata from './seo'
import Content from './content.mdx'

export const metadata = toggleMetadata

export default function Page() {
  return <Content />
}
