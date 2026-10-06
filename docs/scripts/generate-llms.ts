import fs from 'fs';
import path from 'path';
import { docsNavigationSections } from '../app/docs/docsNavigationSections';

const BASE_URL = 'https://www.rad-ui.com';

function generateLlmsTxt() {
  let content = `# Rad UI

> Rad UI is a modern, headless React component library focused on accessibility, TypeScript, and unstyled primitives for building custom design systems.

## Core
- [Introduction](${BASE_URL}/docs/first-steps/introduction)
- [Installation](${BASE_URL}/docs/first-steps/installation)
- [Usage](${BASE_URL}/docs/first-steps/usage)
- [Changelog](${BASE_URL}/docs/first-steps/changelog)

`;

  docsNavigationSections.forEach((section: any) => {
    if (section.type === 'CATEGORY') {
      if (section.title === 'First Steps') {
        return;
      }

      content += `## ${section.title}\n`;
      section.items.forEach((item: any) => {
        if (item.path) {
          content += `- [${item.title}](${BASE_URL}${item.path})\n`;
        }
      });
      content += '\n';
    }
  });

  content += `## Resources
- [GitHub](https://github.com/rad-ui/ui)
- [Playground](${BASE_URL}/playground)
- [Colors](${BASE_URL}/colors)

`;

  return content;
}

const outputPath = path.join(__dirname, '..', 'public', 'llms.txt');
fs.writeFileSync(outputPath, generateLlmsTxt(), 'utf8');
console.log(`Generated llms.txt at ${outputPath}`);
