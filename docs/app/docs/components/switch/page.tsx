import switchMetadata from './seo'
import Content from './content.mdx'

export const metadata = switchMetadata

export default function Page() {
  return <Content />
}
