import {
    cloneElement,
    isValidElement,
    type ReactElement,
    type ReactNode,
} from "react";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { highlightChangelogCode } from "./highlightChangelogCode";

type ChangelogMarkdownProps = {
    markdown: string;
};

const COMMIT_PREFIX = /^([a-f0-9]{7}):\s*/i;

function headingPlainText(children: ReactNode): string {
    if (children == null) return "";
    if (typeof children === "string" || typeof children === "number") {
        return String(children);
    }
    if (Array.isArray(children)) {
        return children.map(headingPlainText).join("");
    }
    if (isValidElement(children)) {
        const el = children as ReactElement<{ children?: ReactNode }>;
        return headingPlainText(el.props.children);
    }
    return "";
}

function sectionHeadingStyles(label: string): string {
    const l = label.toLowerCase();
    /** Tinted bar + near-black text for contrast on pale backgrounds */
    if (l.includes("breaking")) {
        return "border-red-600 bg-red-100/90 text-gray-950";
    }
    if (l.includes("minor")) {
        return "border-red-500 bg-red-100/90 text-gray-950";
    }
    if (l.includes("patch")) {
        return "border-blue-600 bg-blue-100/90 text-gray-950";
    }
    return "border-gray-400 bg-gray-100 text-gray-950";
}

/**
 * Turns the leading `abc1234: ` on a list line into a monospace pill; works when
 * remark splits inline marks (e.g. `hash: **Bold**:`) across several nodes.
 */
function peelLeadingCommitHash(node: ReactNode): ReactNode {
    if (typeof node === "string") {
        const m = node.match(COMMIT_PREFIX);
        if (m) {
            const rest = node.slice(m[0].length);
            return (
                <>
                    <span
                        className="mr-2 inline-flex shrink-0 select-none items-center rounded-md border border-gray-600 bg-gray-200 px-2 py-0.5 font-mono text-xs font-semibold uppercase tracking-wide text-gray-950"
                        title="Git commit"
                    >
                        {m[1]}
                    </span>
                    {rest}
                </>
            );
        }
        return node;
    }
    if (Array.isArray(node)) {
        if (node.length === 0) return node;
        const [first, ...rest] = node;
        return (
            <>
                {peelLeadingCommitHash(first)}
                {rest}
            </>
        );
    }
    if (isValidElement(node)) {
        const el = node as ReactElement<{ children?: ReactNode }>;
        if (el.props.children != null) {
            return cloneElement(el, {
                ...el.props,
                children: peelLeadingCommitHash(el.props.children),
            });
        }
    }
    return node;
}

/**
 * Renders a single release section from CHANGELOG.md (GFM: lists, nested headings, fenced code).
 */
export function ChangelogMarkdown({ markdown }: ChangelogMarkdownProps) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({ children }) => (
                    <h3 className="mb-3 mt-6 text-lg font-semibold text-gray-950 first:mt-0">
                        {children}
                    </h3>
                ),
                h2: ({ children }) => (
                    <h4 className="mb-2 mt-5 text-base font-semibold text-gray-950">
                        {children}
                    </h4>
                ),
                h3: ({ children }) => {
                    const label = headingPlainText(children);
                    const bar = sectionHeadingStyles(label);
                    return (
                        <h5
                            className={`mb-3 mt-6 flex flex-wrap items-center gap-2 border-l-4 py-1.5 pl-3 text-sm font-semibold first:mt-0 ${bar}`}
                        >
                            {children}
                        </h5>
                    );
                },
                p: ({ children }) => (
                    <p className="mb-3 text-sm leading-relaxed text-gray-950">{children}</p>
                ),
                ul: ({ children }) => (
                    <ul className="mb-4 list-disc space-y-3 pl-5 text-sm text-gray-950 marker:text-gray-700">
                        {children}
                    </ul>
                ),
                ol: ({ children }) => (
                    <ol className="mb-4 list-decimal space-y-3 pl-5 text-sm text-gray-950 marker:text-gray-700">
                        {children}
                    </ol>
                ),
                li: ({ children }) => (
                    <li className="leading-relaxed text-gray-950 marker:font-normal">
                        {peelLeadingCommitHash(children)}
                    </li>
                ),
                pre: ({ children }) => (
                    <pre className="docs-syntax-pre mb-4 overflow-x-auto rounded-lg border">
                        {children}
                    </pre>
                ),
                code: ({ className, children, ...props }) => {
                    const isBlock = Boolean(className?.includes("language-"));
                    if (isBlock) {
                        const lang =
                            className?.match(/language-([\w-]+)/)?.[1] ?? "tsx";
                        const source = String(children ?? "");
                        return (
                            <code
                                className={clsx(
                                    "docs-code-block block whitespace-pre font-mono text-xs",
                                    className,
                                )}
                                {...props}
                            >
                                {highlightChangelogCode(source, lang)}
                            </code>
                        );
                    }
                    return (
                        <code
                            className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-[0.88em] text-gray-950"
                            {...props}
                        >
                            {children}
                        </code>
                    );
                },
                a: ({ href, children }) => (
                    <a
                        className="font-medium text-blue-900 underline decoration-blue-900/40 underline-offset-2 hover:text-blue-950 hover:decoration-blue-950"
                        href={href}
                        rel="noreferrer"
                        target={href?.startsWith("http") ? "_blank" : undefined}
                    >
                        {children}
                    </a>
                ),
                strong: ({ children }) => (
                    <strong className="font-semibold text-gray-950">{children}</strong>
                ),
            }}
        >
            {markdown}
        </ReactMarkdown>
    );
}
