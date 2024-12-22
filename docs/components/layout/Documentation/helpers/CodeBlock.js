import React from 'react';
import { refractor } from 'refractor';
import js from 'refractor/lang/javascript';
import jsx from 'refractor/lang/jsx';

refractor.register(js);
refractor.register(jsx);

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
    
    return (
        <pre>
            <code className={`language-${language} whitespace-pre-wrap`} style={{ wordBreak: 'break-word' }}>{code}</code>
        </pre>
    );
};

export default CodeBlock;
