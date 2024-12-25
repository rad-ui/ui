import React from 'react';
import { refractor } from 'refractor';
import js from 'refractor/lang/javascript';
import jsx from 'refractor/lang/jsx';
import scss from 'refractor/lang/scss';  // Add SCSS import
import Copy from '@/components/Copy';

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
    let code = refractor.highlight(children, language);
    code = code.children.map((child, index) => renderElement(child, index));
    
    // Format the code for copying by removing extra newlines and trimming
    const copyContent = children
        .replace(/\n{2,}/g, '\n') // Replace multiple newlines with single newline
        .trim(); // Remove leading/trailing whitespace
    
    return (
        <pre className="relative">
            <code className={`language-${language} whitespace-pre-wrap`} style={{ wordBreak: 'break-word' }}>{code}</code>
           <span className="absolute top-2 right-2">
           <Copy content={copyContent} />
           </span>
        </pre>
    );
};

export default CodeBlock;



