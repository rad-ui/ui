"use client";
import React, { useRef, useState } from 'react';
import CodeBlock from '@/components/layout/Documentation/helpers/CodeBlock';
import Copy from '@/components/Copy';
import TooltipWrapper from '@/components/ui/Tooltip';
import clsx from 'clsx';
import { refractor } from 'refractor';
import ScrollArea from '@radui/ui/ScrollArea';
import Button from '@radui/ui/Button';

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

export const MultipleTabs = ({ items = [] }) => {
    const [expanded, setExpanded] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);
    const viewportRef = useRef(null);
    const [activeTab, setActiveTab] = useState(items[0]?.manager || 'pnpm');
    const activeItem = items.find(item => item.manager === activeTab);
    const collapsedHeight = 220;
    const maxHeight = expanded ? 640 : collapsedHeight;

    if (!activeItem) return null;

    let code;
    try {
        code = refractor.highlight(activeItem.command, 'bash');
        code = code.children.map((child, index) => renderElement(child, index));
    } catch (error) {
        code = [activeItem.command];
    }

    const copyContent = activeItem.command.trim();


    return (
        <pre className="docs-syntax-pre relative my-5 overflow-hidden rounded-[18px] border">
            <div className="docs-syntax-toolbar flex items-center justify-between px-3.5 py-2 border-b border-gray-800/50">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-6 h-6 rounded bg-gray-800 text-gray-400 text-xs font-mono font-bold">
                        &gt;_
                    </div>
                    <div className="flex items-center space-x-1">
                        {items.map((item) => (
                            <button
                                key={item.manager}
                                onClick={() => setActiveTab(item.manager)}
                                className={clsx(
                                    "px-3 py-1 text-sm rounded-md transition-colors",
                                    activeTab === item.manager
                                        ? "bg-gray-800 text-gray-200"
                                        : "text-gray-500 hover:text-gray-300"
                                )}
                            >
                                {item.manager}
                            </button>
                        ))}
                    </div>
                </div>
                <TooltipWrapper label="Copy" placement="bottom">
                    <Copy
                        content={copyContent}
                        className="docs-syntax-copy h-8 w-8 rounded-[11px] border border-transparent hover:border-gray-700 hover:bg-gray-800/50"
                        iconSize={15}
                    />
                </TooltipWrapper>
            </div>
            <div className="relative px-5 py-4">


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

                        <code className="language-bash docs-code-block block whitespace-pre-wrap">
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
