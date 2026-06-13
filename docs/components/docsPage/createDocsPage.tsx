import * as React from 'react';

export function createDocsPage(Content: React.ComponentType) {
    function DocsPage() {
        return <Content />;
    }

    DocsPage.displayName = `DocsPage(${Content.displayName || Content.name || 'Content'})`;

    return DocsPage;
}
