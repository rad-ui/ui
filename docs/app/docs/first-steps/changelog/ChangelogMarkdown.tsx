import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ChangelogMarkdownProps = {
    markdown: string;
};

/**
 * Renders a single release section from CHANGELOG.md (GFM: lists, nested headings, fenced code).
 */
export function ChangelogMarkdown({ markdown }: ChangelogMarkdownProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({ children }) => (
                    <h3 className="mb-3 mt-6 text-lg font-semibold text-gray-1000 first:mt-0">
                        {children}
                    </h3>
                ),
                h2: ({ children }) => (
                    <h4 className="mb-2 mt-5 text-base font-semibold text-gray-1000">
                        {children}
                    </h4>
                ),
                h3: ({ children }) => (
                    <h5 className="mb-2 mt-4 text-sm font-semibold text-gray-1000">
                        {children}
                    </h5>
                ),
                p: ({ children }) => (
                    <p className="mb-3 text-sm leading-relaxed text-gray-1000">{children}</p>
                ),
                ul: ({ children }) => (
                    <ul className="mb-4 list-disc space-y-2 pl-5 text-sm text-gray-1000">{children}</ul>
                ),
                ol: ({ children }) => (
                    <ol className="mb-4 list-decimal space-y-2 pl-5 text-sm text-gray-1000">{children}</ol>
                ),
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                pre: ({ children }) => (
                    <pre className="mb-4 overflow-x-auto rounded-md border border-gray-300 bg-gray-50 p-3 text-xs text-gray-1000">
                        {children}
                    </pre>
                ),
                code: ({ className, children, ...props }) => {
                    const isBlock = Boolean(className?.includes("language-"));
                    if (isBlock) {
                        return (
                            <code
                                className={`block whitespace-pre font-mono text-xs ${className ?? ""}`}
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    }
                    return (
                        <code
                            className="rounded bg-gray-200 px-1 py-0.5 font-mono text-[0.9em] text-gray-1000"
                            {...props}
                        >
                            {children}
                        </code>
                    );
                },
                a: ({ href, children }) => (
                    <a
                        className="text-blue-800 underline decoration-blue-800/30 underline-offset-2 hover:decoration-blue-800"
                        href={href}
                        rel="noreferrer"
                        target={href?.startsWith("http") ? "_blank" : undefined}
                    >
                        {children}
                    </a>
                ),
                strong: ({ children }) => (
                    <strong className="font-semibold text-gray-1000">{children}</strong>
                ),
            }}
        >
            {markdown}
        </ReactMarkdown>
    );
}
