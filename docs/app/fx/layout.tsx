import DocsShell from "@/components/layout/Documentation/DocsShell";

import "@/components/fx/fx-docs.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <DocsShell><div className="fx-page">{children}</div></DocsShell>
}

export default Layout;
