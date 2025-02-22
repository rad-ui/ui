/** @type {import('next').NextConfig} */

const createMDX = require('@next/mdx')

const nextConfig = {
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
}


const withMDX = createMDX({
    // Add markdown plugins here, as desired
  })

module.exports = withMDX(nextConfig)
