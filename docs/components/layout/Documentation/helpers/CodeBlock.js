"use client";
import React, { useEffect, useRef, useState } from 'react';
import { refractor } from 'refractor';
import js from 'refractor/lang/javascript';
import jsx from 'refractor/lang/jsx';
import ts from 'refractor/lang/typescript';
import tsx from 'refractor/lang/tsx';
import bash from 'refractor/lang/bash';
import scss from 'refractor/lang/scss'; // Add SCSS import
import Copy from '@/components/Copy';

import TooltipWrapper from '@/components/ui/Tooltip';
import Button from '@radui/ui/Button'
import clsx from 'clsx';
import ScrollArea from '@radui/ui/ScrollArea';

refractor.register(js);
refractor.register(jsx);
refractor.register(ts);
refractor.register(tsx);
refractor.register(bash);
refractor.register(scss);

const renderElement = (element, index) => {
    if (element.type === 'element') {
        const { tagName, properties, children } = element;
        const className = properties.className.join(' ');

        return React.createElement(
            tagName,
            { className, key: index },
            children.map((child, childIndex) => renderElement(child, childIndex))
        );
    } else if (element.type === 'text') {
        return element.value;
    } else {
        return null;
    }
};

const CodeBlock = ({ children, inline = false, language = 'jsx', className = '' }) => {
    const [expanded, setExpanded] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);
    const viewportRef = useRef(null);

    let code;

    try {
        code = refractor.highlight(children, language);
        code = code.children.map((child, index) => renderElement(child, index));
    } catch (error) {
        if (error instanceof Error && error.message.includes('Unknown language')) {
            code = [children];
        } else {
            throw error;
        }
    }

    // Format the code for copying by removing extra newlines and trimming
    const copyContent = children
        .replace(/\n{2,}/g, '\n') // Replace multiple newlines with single newline
        .trim(); // Remove leading/trailing whitespace

    const collapsedHeight = 220;
    const maxHeight = expanded ? 640 : collapsedHeight;

    useEffect(() => {
        if (inline) return;

        const viewport = viewportRef.current;
        if (!viewport) return;

        const measureOverflow = () => {
            setHasOverflow(viewport.scrollHeight > collapsedHeight + 8);
        };

        measureOverflow();

        const resizeObserver = new ResizeObserver(() => {
            measureOverflow();
        });

        resizeObserver.observe(viewport);
        Array.from(viewport.children).forEach((child) => resizeObserver.observe(child));

        return () => resizeObserver.disconnect();
    }, [children, language, inline]);

    if (inline) {
        return (
            <code className={`language-${language} docs-inline-code whitespace-pre-wrap`}>
                {children}
            </code>
        );
    }

    return (
        <pre className={clsx(
            "docs-syntax-pre relative my-5 overflow-hidden rounded-[18px] border",
            className,
        )}>
            <div className="docs-syntax-toolbar flex items-center justify-between px-3.5 py-2">
                <span className="docs-syntax-toolbar-label">
                    {['jsx', 'tsx'].includes(language) ? 'React' : language}
                </span>
                <TooltipWrapper label="Copy" placement="bottom">
                    <Copy
                        content={copyContent}
                        className="docs-syntax-copy h-8 w-8 rounded-[11px] border hover:opacity-90"
                        iconSize={15}
                    />
                </TooltipWrapper>
            </div>
            <div className="relative">
                <ScrollArea.Root
                    className={clsx(
                        expanded ? "max-h-[640px]" : "max-h-[220px]",
                        "docs-syntax-scroll-area overflow-visible",
                    )}
                >
                    <ScrollArea.Viewport
                        ref={viewportRef}
                        style={{
                            maxHeight,
                            overflowY: hasOverflow ? 'auto' : 'hidden',
                        }}
                    >
                        <code className={`language-${language} docs-code-block block whitespace-pre-wrap`}>
                            {code}
                        </code>
                    </ScrollArea.Viewport>

                    {hasOverflow && (
                        <ScrollArea.Scrollbar>
                            <ScrollArea.Thumb />
                        </ScrollArea.Scrollbar>
                    )}
                </ScrollArea.Root>
                    {hasOverflow && <>
                    {!expanded && <div className="code-block-blur"></div>}
                    <div className="docs-syntax-footer flex w-full justify-center px-4 py-1.5">
                        <Button size="small" variant="ghost" className="docs-syntax-expand min-h-0 rounded-full border px-3 py-1 text-[0.78rem]" onClick={() => setExpanded(!expanded)}>
                            Show {expanded ? 'less' : 'more'}
                        </Button>
                    </div>
                </>}
            </div>
        </pre>
    );
};

export default CodeBlock;
