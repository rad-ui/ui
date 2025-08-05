/** @type {import('next').NextConfig} */

const createMDX = require('@next/mdx')

const nextConfig = {
    // Configure `pageExtensions` to include markdown and MDX files
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    
    // SEO and Performance optimizations
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    
    // Image optimization
    images: {
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60,
    },
    
    // Headers for security and caching
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
            {
                source: '/sitemap.xml',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3600, s-maxage=3600',
                    },
                ],
            },
            {
                source: '/robots.txt',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=3600, s-maxage=3600',
                    },
                ],
            },
        ]
    },
    
    // Redirects for SEO
    async redirects() {
        return [
            {
                source: '/docs',
                destination: '/docs/first-steps/introduction',
                permanent: true,
            },
        ]
    },
    
    // Environment variables for SEO
    env: {
        SITE_URL: 'https://www.rad-ui.com',
        SITE_NAME: 'Rad UI',
        SITE_DESCRIPTION: 'Modern React UI Library for Accessible Web Applications',
    },
}

const withMDX = createMDX({
    // Add markdown plugins here, as desired
})

module.exports = withMDX(nextConfig)
