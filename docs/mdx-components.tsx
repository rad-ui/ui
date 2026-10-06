import type { MDXComponents } from 'mdx/types'
import { isValidElement } from 'react'

import Heading from "@radui/ui/Heading"
import Text from "@radui/ui/Text"
import Strong from "@radui/ui/Strong"
import { TableRoot, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/mdx/TableComponents'

import Documentation from '@/components/layout/Documentation/Documentation';
import { MultipleTabs } from '@/components/mdx/MultipleTabs';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
     h1: ({ children }) => (
      <Heading as="h1" className="mb-4 text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-gray-1000">
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Heading as="h2" className="mb-4 mt-12 text-2xl font-semibold tracking-[-0.03em] text-gray-1000 sm:text-[1.65rem]">
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading as="h3" className="mb-3 mt-10 text-xl font-semibold tracking-[-0.02em] text-gray-1000">
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading as="h4" className="mb-3 mt-8 text-lg font-semibold tracking-tight text-gray-1000">
        {children}
      </Heading>
    ),
    h5: ({ children }) => (
      <Heading as="h5" className="mb-3 mt-8 text-base font-semibold tracking-tight text-gray-1000">
        {children}
      </Heading>
    ),
    h6: ({ children }) => (
      <Heading as="h6" className="mb-3 mt-8 text-sm font-semibold tracking-tight text-gray-1000">
        {children}
      </Heading>
    ),
    p: ({ children }) => (
      <Text className="mb-4 text-[0.98rem] leading-7 text-gray-900">
        {children}
      </Text>
    ),
    strong: ({ children }) => (
      <Strong className="font-semibold text-gray-1000">{children}</Strong>
    ),
    pre: ({ children }) => {
      if (isValidElement(children)) {
        const childProps = children.props as { className?: string; children?: string }
        const language = childProps.className?.replace(/^language-/, '') || 'jsx'

        return (
          <Documentation.CodeBlock language={language}>
            {typeof childProps.children === 'string' ? childProps.children : ''}
          </Documentation.CodeBlock>
        )
      }

      return <pre>{children}</pre>
    },
    code: ({ children }) => (
      <Documentation.CodeBlock inline>
        {children}
      </Documentation.CodeBlock>
    ),
    ul: ({ children }) => (
      <ul className="mb-5 list-disc space-y-2 pl-5 marker:text-green-900">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-5 list-decimal space-y-2 pl-5 marker:text-green-900">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-[0.98rem] leading-7 text-gray-900">{children}</li>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="font-medium text-green-1000 underline decoration-green-600 underline-offset-3 transition-colors hover:text-green-900"
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-green-700 pl-4 text-gray-900">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-12 border-gray-300" />,
    table: ({ children }) => (
      <TableRoot>
        {children}
      </TableRoot>
    ),
    thead: ({ children }) => (
      <TableHead>
        {children}
      </TableHead>
    ),
    tbody: ({ children }) => (
      <TableBody>
        {children}
      </TableBody>
    ),
    tr: ({ children }) => (
      <TableRow>
        {children}
      </TableRow>
    ),
    th: ({ children }) => (
      <TableHeader>
        {children}
      </TableHeader>
    ),
    td: ({ children }) => (
      <TableCell>
        {children}
      </TableCell>
    ),
    MultipleTabs,
    ...components,
  }
}
