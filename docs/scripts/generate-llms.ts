import fs from 'fs';
import path from 'path';
import { docsNavigationSections } from '../app/docs/docsNavigationSections';
import { fxNavigationSections } from '../app/fx/fxNavigationSections';

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

  content += `## Rad UI FX
> Accessible animated components (text effects, backgrounds), installed as source through a shadcn-compatible registry. Each registry item lists its accessibility rules in \`meta.accessibility\`.
`;
  fxNavigationSections.forEach((section: any) => {
    section.items.forEach((item: any) => {
      content += `- [${section.title === 'Getting Started' ? `FX ${item.title}` : item.title}](${BASE_URL}${item.path})\n`;
    });
  });
  content += `- [FX registry index](${BASE_URL}/r/registry.json)\n\n`;

  content += `## Resources
- [GitHub](https://github.com/rad-ui/ui)
- [Playground](${BASE_URL}/playground)
- [Colors](${BASE_URL}/colors)
- [Full AI reference](${BASE_URL}/llms-full.txt)
- [Package facts](${BASE_URL}/package-facts.json)

`;

  return content;
}

function generateLlmsFullTxt() {
  const components = docsNavigationSections.find((section: any) => section.title === 'Components')?.items ?? [];
  const guides = docsNavigationSections.find((section: any) => section.title === 'Guides')?.items ?? [];

  let content = `# Rad UI Full Reference

Rad UI is an open-source React component library for teams building custom design systems. It focuses on headless behavior, accessibility, composition, TypeScript types, and optional theme styling.

## Package
- npm package: \`@radui/ui\`
- repository: https://github.com/rad-ui/ui
- docs: ${BASE_URL}/docs/first-steps/introduction
- install command: npm install @radui/ui
- primary import style: import Button from '@radui/ui/Button'
- optional theme CSS: import '@radui/ui/themes/default.css'
- optional theme wrapper: import Theme from '@radui/ui/Theme'

## Positioning
Use Rad UI when you want React components with accessibility and interaction behavior handled for you, while keeping control over visual design. Components expose semantic markup, TypeScript props, composition patterns, and stable styling hooks.

## Quick Start
\`\`\`tsx
import "@radui/ui/themes/default.css"
import Theme from "@radui/ui/Theme"
import Button from "@radui/ui/Button"

export default function App() {
  return (
    <Theme classNamespace="rad-ui" accentColor="blue">
      <Button>Save changes</Button>
    </Theme>
  )
}
\`\`\`

## Styling Model
- Components can be consumed headlessly and styled by the application.
- The optional default theme provides ready-to-use CSS variables, color scales, and component recipes.
- Per-component imports keep bundles focused.
- Theme color families use a shared numeric scale so surfaces, borders, accents, and text map predictably.

## Component Docs
`;

  components.forEach((item: any) => {
    content += `- ${item.title}: ${BASE_URL}${item.path}\n`;
  });

  content += `\n## Implementation Guides\n`;
  guides.forEach((item: any) => {
    content += `- ${item.title}: ${BASE_URL}${item.path}\n`;
  });

  content += `
## Rad UI FX (animated components)
- Registry index: ${BASE_URL}/r/registry.json
- Install one: npx shadcn@latest add ${BASE_URL}/r/<name>.json (files go to components/fx/)
- Or add \`"registries": { "@rad-ui": "${BASE_URL}/r/{name}.json" }\` to components.json and run npx shadcn@latest add @rad-ui/<name>
- Every item's \`meta.accessibility\` lists rules to keep (visually hidden text, aria-hidden decorative layers, reduced-motion fallbacks). Do not remove them when editing.
- Apps with their own motion setting can set data-rad-fx-motion="reduce" on an ancestor.
${fxNavigationSections.flatMap((section: any) => section.items).map((item: any) => `- ${item.title}: ${BASE_URL}${item.path}`).join('\n')}

## Useful Agent Notes
- Prefer per-component imports such as @radui/ui/Dialog, @radui/ui/Select, and @radui/ui/Button.
- Use the docs component pages for anatomy, examples, and accessibility behavior.
- Use the styling and design token guides when integrating with an existing design system.
- Use the accessibility, keyboard interaction, screen reader testing, and mobile touch QA guides for high-confidence implementation checks.
`;

  return content;
}

const outputPath = path.join(__dirname, '..', 'public', 'llms.txt');
fs.writeFileSync(outputPath, generateLlmsTxt(), 'utf8');
console.log(`Generated llms.txt at ${outputPath}`);

const fullOutputPath = path.join(__dirname, '..', 'public', 'llms-full.txt');
fs.writeFileSync(fullOutputPath, generateLlmsFullTxt(), 'utf8');
console.log(`Generated llms-full.txt at ${fullOutputPath}`);
