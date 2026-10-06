import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.rad-ui.com';
const publicDir = path.join(__dirname, '..', 'public');

function generateLlmsFull() {
  let content = `# Rad UI - Complete Documentation

> Rad UI is a modern, headless React component library focused on accessibility, TypeScript, and unstyled primitives for building custom design systems.

This file contains key documentation for LLM consumption. For the most up-to-date information, visit https://www.rad-ui.com.

`;

  // Add core docs
  content += `## Introduction\n\n`;
  content += `Rad UI is an open-source, headless React component library designed for building accessible, customizable user interfaces. It provides unstyled primitives with built-in accessibility, keyboard navigation, and focus management.\n\n`;
  content += `Visit: ${BASE_URL}/docs/first-steps/introduction\n\n`;

  content += `## Installation\n\n`;
  content += `Install Rad UI via npm, yarn, or pnpm. See the full installation guide for framework-specific setup.\n\n`;
  content += `Visit: ${BASE_URL}/docs/first-steps/installation\n\n`;

  content += `## Usage\n\n`;
  content += `Learn how to use Rad UI components in your React applications with proper styling integration.\n\n`;
  content += `Visit: ${BASE_URL}/docs/first-steps/usage\n\n`;

  content += `## Key Principles\n\n`;
  content += `- **Headless**: Components provide behavior and accessibility without imposing styles\n`;
  content += `- **Accessible**: Built with WCAG compliance and proper ARIA attributes\n`;
  content += `- **TypeScript-first**: Full type safety with excellent developer experience\n`;
  content += `- **Composable**: Flexible API that works with any styling solution\n`;
  content += `- **Uncontrolled by default**: Supports both controlled and uncontrolled patterns\n\n`;

  content += `## Resources\n\n`;
  content += `- GitHub: https://github.com/rad-ui/ui\n`;
  content += `- Playground: ${BASE_URL}/playground\n`;
  content += `- Colors: ${BASE_URL}/colors\n\n`;

  content += `## Components\n\n`;
  content += `Rad UI offers 50+ accessible, headless components. For complete API documentation and examples, visit ${BASE_URL}/docs/components.\n\n`;

  return content;
}

const outputPath = path.join(publicDir, 'llms-full.txt');
fs.writeFileSync(outputPath, generateLlmsFull(), 'utf8');
console.log(`Generated llms-full.txt at ${outputPath}`);
