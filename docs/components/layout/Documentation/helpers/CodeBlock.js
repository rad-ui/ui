"use client";
import React, { useEffect, useRef, useState } from 'react';
import { refractor } from 'refractor';
import js from 'refractor/lang/javascript';
import jsx from 'refractor/lang/jsx';
import scss from 'refractor/lang/scss'; // Add SCSS import
import Copy from '@/components/Copy';

import TooltipWrapper from '@/components/ui/Tooltip';
import Button from '@radui/ui/Button'
import clsx from 'clsx';
import ScrollArea from '@radui/ui/ScrollArea';

refractor.register(js);
refractor.register(jsx);
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

const CodeBlock = ({ children, inline = false, language = 'jsx' }) => {
    const [expanded, setExpanded] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);
    const viewportRef = useRef(null);
    let code = refractor.highlight(children, language);
    code = code.children.map((child, index) => renderElement(child, index));

    // Format the code for copying by removing extra newlines and trimming
    const copyContent = children
        .replace(/\n{2,}/g, '\n') // Replace multiple newlines with single newline
        .trim(); // Remove leading/trailing whitespace

    const collapsedHeight = 150;
    let height = 'auto';
    let maxHeight = 'auto';

    if (expanded) {
        if (!inline) {
            height = 'auto';
            maxHeight = 640;
        }

    }
    else {
        if (!inline) {
            height = collapsedHeight;
            maxHeight = 640;
        }

    }

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
    }, [children, inline, language]);

    return (
        <pre className="relative">
            <div className="relative height">
                {/* <code
className={`language-${language} whitespace-pre-wrap`}
                style={{
                    height,
                    maxHeight,
                    overflowY: expanded ? 'scroll' : 'hidden',  
                    wordBreak: 'break-word',
                }}
            >{code}</code> */}

                <ScrollArea.Root
                    className={clsx(
                        "transition-all",
                        expanded ? "max-h-[640px]" : "max-h-[180px]",
                        inline && "overflow-visible max-h-none"
                    )}
                >
                    <ScrollArea.Viewport
                        ref={viewportRef}
                        style={{
                            height: inline ? 'auto' : height,
                            maxHeight: inline ? 'none' : maxHeight,
                            overflowY: inline ? 'visible' : 'auto',
                        }}
                    >
                        <code className={`language-${language} block whitespace-pre-wrap px-4 py-4`}>
                            {code}
                        </code>
                    </ScrollArea.Viewport>

                    {!inline && (
                        <ScrollArea.Scrollbar>
                            <ScrollArea.Thumb />
                        </ScrollArea.Scrollbar>
                    )}
                </ScrollArea.Root>
                {!inline && hasOverflow && <>
                    {!expanded && <div className="code-block-blur"></div>}
                    <div className="flex w-full justify-center border-t border-gray-300 bg-gray-100 px-4 py-1.5">
                        <Button size="small" variant="ghost" className="min-h-0 py-1 text-[0.82rem]" onClick={() => setExpanded(!expanded)}>
                            Show {expanded ? 'less' : 'more'}
                        </Button>
                    </div>
                </>}

            </div>
            <span className="absolute top-3 right-3">
                <TooltipWrapper label="Copy" placement="bottom">
                    <Copy content={copyContent} />
                </TooltipWrapper>
            </span>
        </pre>


    );
};

export default CodeBlock;
