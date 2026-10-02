import fs from 'fs';
import path from 'path';

const componentsDir = path.join(__dirname, '..', 'app', 'docs', 'components');
const BASE_URL = 'https://www.rad-ui.com';

function kebabToTitle(kebab: string): string {
  return kebab
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function generateKeywords(name: string): string[] {
  const lower = name.toLowerCase();
  return [
    `React ${name}`,
    `headless ${lower}`,
    `accessible ${lower}`,
    `${lower} component`,
    `React ${lower} component`,
  ];
}

function generateDescription(name: string): string {
  return `Accessible, headless React ${name} component. Built with ARIA, keyboard navigation, and full customization for design systems.`;
}

function updateSeoFile(filePath: string, componentName: string) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already has canonicalUrl
  if (content.includes('canonicalUrl')) {
    console.log(`✓ ${componentName} already has canonicalUrl`);
    return;
  }
  
  const seo = `import generateSeoMetadata from "@/utils/seo/generateSeoMetadata"

const ${componentName.toLowerCase().replace(/[^a-z]/g, '')}Metadata = generateSeoMetadata({
    title: "${componentName} - Rad UI",
    description: "${generateDescription(componentName)}",
    keywords: ${JSON.stringify(generateKeywords(componentName))},
    canonicalUrl: "${BASE_URL}/docs/components/${componentName.toLowerCase().replace(/\s+/g, '-').replace(/group$/, '-group').replace(/cards$/, '-cards').replace(/field$/, '-field').replace(/area$/, '-area').replace(/list$/, '-list').replace(/region$/, '-region').replace(/nav$/, '-nav').replace(/ratio$/, '-ratio').replace(/quote$/, '-quote').replace(/hidden$/, '-hidden')}"
});


export default ${componentName.toLowerCase().replace(/[^a-z]/g, '')}Metadata
`;
  
  // Try to map component folder name to canonical path
  const dirName = path.basename(path.dirname(filePath));
  const canonicalPath = dirName === componentName.toLowerCase() ? dirName : dirName;
  
  const seoWithCorrectPath = `import generateSeoMetadata from "@/utils/seo/generateSeoMetadata"

const metadata = generateSeoMetadata({
    title: "${componentName} - Rad UI",
    description: "${generateDescription(componentName)}",
    keywords: ${JSON.stringify(generateKeywords(componentName))},
    canonicalUrl: "${BASE_URL}/docs/components/${dirName}"
});


export default metadata
`;
  
  fs.writeFileSync(filePath, seoWithCorrectPath, 'utf8');
  console.log(`✓ Updated ${dirName}`);
}

function main() {
  const entries = fs.readdirSync(componentsDir, { withFileTypes: true });
  
  entries.forEach(entry => {
    if (entry.isDirectory()) {
      const seoPath = path.join(componentsDir, entry.name, 'seo.ts');
      if (fs.existsSync(seoPath)) {
        const componentName = kebabToTitle(entry.name);
        try {
          updateSeoFile(seoPath, componentName);
        } catch (e) {
          console.error(`✗ Failed to update ${entry.name}:`, e);
        }
      }
    }
  });
}

main();
