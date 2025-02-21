import type { MDXComponents } from 'mdx/types'

import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
     // Allows customizing built-in components, e.g. to add styling.
     h1: ({ children }) => (
      <Heading as="h1" className="text-gray-1000 mb-4" >{children}</Heading>
    ),
    h2: ({ children }) => (
      <Heading as="h2" className="text-gray-1000 mb-4" >{children}</Heading>
    ),
    h3: ({ children }) => (
      <Heading as="h3" className="text-gray-1000 mb-4" >{children}</Heading>
    ),
    h4: ({ children }) => (
      <Heading as="h4" className="text-gray-1000 mb-4" >{children}</Heading>
    ),
    h5: ({ children }) => (
      <Heading as="h5" className="text-gray-1000 mb-4" >{children}</Heading>
    ),
    h6: ({ children }) => (
      <Heading as="h6" className="text-gray-1000 mb-4" >{children}</Heading>
    ),
    p: ({ children }) => (
      <Text className="text-gray-950 mb-4" >{children}</Text>
    ),
    
    
    // img: (props) => (
    //   <Image
    //     sizes="100vw"
    //     style={{ width: '100%', height: 'auto' }}
    //     {...(props as ImageProps)}
    //   />
    // ),
    ...components,
  }
}