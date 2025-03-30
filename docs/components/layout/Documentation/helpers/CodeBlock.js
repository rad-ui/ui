"use client";
import React, { useState } from 'react';
import { refractor } from 'refractor';
import js from 'refractor/lang/javascript';
import jsx from 'refractor/lang/jsx';
import scss from 'refractor/lang/scss';  // Add SCSS import
import Copy from '@/components/Copy';

import Tooltip from '@radui/ui/Tooltip'
import Button from '@radui/ui/Button'

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

const CodeBlock = ({ children, language = 'jsx' }) => {
    const [expanded, setExpanded] = useState(false);
    let code = refractor.highlight(children, language);
    code = code.children.map((child, index) => renderElement(child, index));
    
    // Format the code for copying by removing extra newlines and trimming
    const copyContent = children
        .replace(/\n{2,}/g, '\n') // Replace multiple newlines with single newline
        .trim(); // Remove leading/trailing whitespace
    
    return (
        <pre className="relative mb-8">
           <div className="relative ">
           <code className={`language-${language} whitespace-pre-wrap`} style={{ wordBreak: 'break-word' }}
                style={{
                    height: expanded ? 'auto' : 180,
                    maxHeight: 640,
                    overflowY: expanded ? 'scroll' : 'hidden',
                    
                }}
            >{code}</code>
            {!expanded && <div className="code-block-blur"></div>}
            <div className="flex justify-center w-full bg-gradient-to-t from-background to-transparent bg-gray-100 px-4 py-2">
               
                <Button  size="small" onClick={() => setExpanded(!expanded)}>
                    Show {expanded ? 'less' : 'more'}
                </Button>
            </div>
           </div>
           <span className="absolute top-2 right-2">
           <Tooltip label="Copy" placement="bottom">
                <Copy content={copyContent} />
            </Tooltip>
           </span>
        </pre>
    );
};

export default CodeBlock;



