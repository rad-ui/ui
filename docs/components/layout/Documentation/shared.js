// One type scale for every docs page. MDX headings (mdx-components.tsx) use the same values.
export const docsSectionStackClassName = 'mt-10 flex flex-col gap-12'
export const docsSectionBlockClassName = 'space-y-4'
export const docsSectionHeadingClassName =
  'mb-2 text-[1.5rem] font-semibold leading-[1.2] tracking-[-0.025em] text-gray-1000'
export const docsSubheadingClassName =
  'mb-1 text-[1.125rem] font-semibold leading-[1.3] tracking-[-0.015em] text-gray-1000'
export const docsSectionIntroClassName = 'pb-2'
export const docsSectionDividerClassName = 'mt-14 opacity-30'
export const docsEyebrowClassName =
  'font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-green-1000'
export const docsBodyClassName = 'text-[0.95rem] leading-7 text-gray-950'
export const docsSurfaceClassName =
  'overflow-hidden rounded-xl border border-gray-400 bg-gray-50'

/** Heading class by level, so a table titled with h3 reads smaller than a section h2. */
export const docsHeadingClassFor = (as = 'h2') => (as === 'h2' ? docsSectionHeadingClassName : docsSubheadingClassName)
