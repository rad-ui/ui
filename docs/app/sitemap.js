import { docsNavigationSections } from "./docs/docsNavigationSections"

const generateComponentsSitemaps = () => {
  const allPages = []

  docsNavigationSections.map((section) => {
    return section.items.map((item) => {
      // Determine priority based on section and item importance
      let priority = 0.7
      let changeFrequency = 'weekly'
      
      // Higher priority for main sections
      if (section.title === 'First Steps' || section.title === 'Components') {
        priority = 0.9
        changeFrequency = 'weekly'
      }
      
      // Highest priority for introduction and installation
      if (item.path.includes('introduction') || item.path.includes('installation')) {
        priority = 1.0
        changeFrequency = 'monthly'
      }

      allPages.push({
        url: `https://www.rad-ui.com${item.path}`,
        lastModified: new Date(),
        changeFrequency: changeFrequency,
        priority: priority,
      })
    })
  })
  return allPages
}

const generateAdditionalPages = () => {
  return [
    {
      url: 'https://www.rad-ui.com/playground',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.rad-ui.com/colors',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.rad-ui.com/showcase/music-app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://www.rad-ui.com/docs/first-steps/introduction',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: 'https://www.rad-ui.com/docs/first-steps/installation',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: 'https://www.rad-ui.com/docs/first-steps/usage',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]
}

export default function sitemap() {
  return [
    {
      // Home page - highest priority
      url: 'https://www.rad-ui.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...generateComponentsSitemaps(),
    ...generateAdditionalPages()
  ]
}