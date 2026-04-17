export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbStructuredData {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  "itemListElement": Array<{
    "@type": "ListItem";
    "position": number;
    "name": string;
    "item": string;
  }>;
}

/**
 * Generates breadcrumb navigation items from a pathname
 * @param pathname - The current pathname (e.g., "/docs/components/button")
 * @param currentPageTitle - The title of the current page
 * @returns Array of breadcrumb items
 */
export function generatePageBreadcrumbs(pathname: string, currentPageTitle: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];
  
  // Add home breadcrumb
  breadcrumbs.push({
    name: 'Home',
    url: '/'
  });

  let currentPath = '';
  
  // Build breadcrumbs for each segment
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Skip the last segment as it's the current page
    if (index === segments.length - 1) {
      breadcrumbs.push({
        name: currentPageTitle,
        url: currentPath
      });
    } else {
      // Convert segment to readable name
      const readableName = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        name: readableName,
        url: currentPath
      });
    }
  });

  return breadcrumbs;
}

/**
 * Generates structured data for breadcrumbs in JSON-LD format
 * @param breadcrumbs - Array of breadcrumb items
 * @returns Structured data object for breadcrumbs
 */
export function generateBreadcrumbStructuredData(breadcrumbs: BreadcrumbItem[]): BreadcrumbStructuredData {
  const baseUrl = 'https://rad-ui.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.name,
      "item": `${baseUrl}${breadcrumb.url}`
    }))
  };
} 