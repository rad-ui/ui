"use client";
import React, { useEffect, useRef, useState } from 'react';
import { refractor } from 'refractor';
import js from 'refractor/lang/javascript';
import jsx from 'refractor/lang/jsx';
import ts from 'refractor/lang/typescript';
import tsx from 'refractor/lang/tsx';
import bash from 'refractor/lang/bash';
import scss from 'refractor/lang/scss';
import { ChevronDown } from 'lucide-react';
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

const LABELS = { jsx: 'React', tsx: 'React', js: 'JavaScript', javascript: 'JavaScript', ts: 'TypeScript', typescript: 'TypeScript', bash: 'Terminal', scss: 'SCSS', css: 'CSS' };

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

const COLLAPSED_HEIGHT = 320;
const EXPANDED_HEIGHT = 720;

const CodeBlock = ({ children, inline = false, language = 'jsx', className = '', lineNumbers = true }) => {
    const [expanded, setExpanded] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);
    const viewportRef = useRef(null);

    const source = typeof children === 'string' ? children.replace(/\n+$/, '') : '';
    let code;

    try {
        code = refractor.highlight(source, language);
        code = code.children.map((child, index) => renderElement(child, index));
    } catch (error) {
        if (error instanceof Error && error.message.includes('Unknown language')) {
            code = [source];
        } else {
            throw error;
        }
    }

    const copyContent = source.trim();
    const lineCount = source ? source.split('\n').length : 0;
    const showNumbers = lineNumbers && lineCount > 1;
    const maxHeight = expanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT;

    useEffect(() => {
        if (inline) return;

        const viewport = viewportRef.current;
        if (!viewport) return;

        const measureOverflow = () => {
            setHasOverflow(viewport.scrollHeight > COLLAPSED_HEIGHT + 8);
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
            "docs-syntax-pre relative my-5 overflow-hidden rounded-xl border",
            className,
        )}>
            <div className="docs-syntax-toolbar flex items-center justify-between py-1.5 pl-3.5 pr-1.5">
                <span className="docs-syntax-toolbar-label">
                    {LABELS[language] ?? language}
                </span>
                <TooltipWrapper label="Copy" placement="bottom">
                    <Copy
                        content={copyContent}
                        className="docs-syntax-copy h-7! w-7! rounded-md border-0! bg-transparent!"
                        iconSize={14}
                    />
                </TooltipWrapper>
            </div>
            <div className="relative">
                <ScrollArea.Root
                    customRootClass="rad-ui"
                    className={clsx(
                        expanded ? "max-h-[720px]" : "max-h-[320px]",
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
                        <div className="docs-code-body flex min-w-0">
                            {showNumbers ? (
                                <span aria-hidden className="docs-code-gutter select-none">
                                    {Array.from({ length: lineCount }, (_, i) => `${i + 1}`).join('\n')}
                                </span>
                            ) : null}
                            <code className={`language-${language} docs-code-block block min-w-0 flex-1 whitespace-pre`}>
                                {code}
                            </code>
                        </div>
                    </ScrollArea.Viewport>

                    {hasOverflow && (
                        <ScrollArea.Scrollbar>
                            <ScrollArea.Thumb />
                        </ScrollArea.Scrollbar>
                    )}
                </ScrollArea.Root>
                {hasOverflow && <>
                    {!expanded && <div className="code-block-blur"></div>}
                    <div className="docs-syntax-footer flex w-full justify-center px-4 py-1">
                        <Button
                            size="small"
                            variant="ghost"
                            className="docs-syntax-expand min-h-0 rounded-md border-0 px-2.5 py-1 text-[0.75rem]"
                            onClick={() => setExpanded(!expanded)}
                            aria-expanded={expanded}
                        >
                            {expanded ? 'Collapse' : `Expand ${lineCount} lines`}
                            <ChevronDown size={13} strokeWidth={2.25} aria-hidden className={clsx('ml-1 transition-transform', expanded && 'rotate-180')} />
                        </Button>
                    </div>
                </>}
            </div>
        </pre>
    );
};

export default CodeBlock;
