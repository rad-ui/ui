import { execSync } from 'child_process';
import { docsNavigationSections } from './docs/docsNavigationSections';
import { fxNavigationSections } from './fx/fxNavigationSections';

const getLastModified = (filePath) => {
  try {
    // Try to get git commit date for the specific file
    const date = execSync(`git log -1 --format=%cI -- "${filePath}" 2>/dev/null`, {
      encoding: 'utf8',
      cwd: process.cwd(),
    }).trim();
    if (date) return date;
  } catch (e) {
    // Fall back to current date if git fails
  }
  return new Date().toISOString();
};

// Map paths to actual file paths in the repo
const pathToFileMap = (urlPath) => {
  // For docs pages, they might be .mdx files
  // Most doc pages follow pattern: app/docs/.../page.mdx or content.mdx
  if (urlPath === '/fx' || urlPath.startsWith('/fx/')) {
    return `app${urlPath}/content.mdx`;
  }
  if (urlPath.startsWith('/docs/')) {
    const relativePath = urlPath.replace('/docs/', 'app/docs/');
    // Try common patterns
    return `${relativePath}/page.mdx`;
  }
  return null;
};

const generateComponentsSitemaps = () => {
  const allPages = [];

  [...docsNavigationSections, ...fxNavigationSections].map((section) => {
    return section.items.map((item) => {
      let priority = 0.7;
      let changeFrequency = 'weekly';

      if (section.title === 'First Steps' || section.title === 'Components') {
        priority = 0.9;
        changeFrequency = 'weekly';
      }

      if (item.path.includes('introduction') || item.path.includes('installation')) {
        priority = 1.0;
        changeFrequency = 'monthly';
      }

      // Try to get actual file modified date
      const filePath = pathToFileMap(item.path);
      const lastModified = filePath ? getLastModified(filePath) : new Date().toISOString();

      allPages.push({
        url: `https://www.rad-ui.com${item.path}`,
        lastModified,
        changeFrequency,
        priority,
      });
    });
  });
  return allPages;
};

const generateAdditionalPages = () => {
  return [
    {
      url: 'https://www.rad-ui.com/playground',
      lastModified: getLastModified('app/playground'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.rad-ui.com/colors',
      lastModified: getLastModified('app/colors/page.tsx') || getLastModified('app/colors'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.rad-ui.com/showcase/music-app',
      lastModified: getLastModified('app/showcase/music-app'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://www.rad-ui.com/docs/first-steps/introduction',
      lastModified: getLastModified('app/docs/first-steps/introduction/page.mdx'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: 'https://www.rad-ui.com/docs/first-steps/installation',
      lastModified: getLastModified('app/docs/first-steps/installation/page.mdx'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: 'https://www.rad-ui.com/docs/first-steps/usage',
      lastModified: getLastModified('app/docs/first-steps/usage/page.mdx'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
};

export default function sitemap() {
  return [
    {
      url: 'https://www.rad-ui.com',
      lastModified: getLastModified('app/page.tsx') || getLastModified('app/page.js') || new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...generateComponentsSitemaps(),
    ...generateAdditionalPages(),
  ];
}