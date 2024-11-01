import React from 'react';
import { refractor } from 'refractor';
import js from 'refractor/lang/javascript';
import jsx from 'refractor/lang/jsx';
import Copy from '@/components/Copy';
import Code from "@radui/ui/Code"

refractor.register(js);
refractor.register(jsx);


const renderElement = (element) => {
    if (element.type === 'element') {
      const { tagName, properties, children } = element;
      const className = properties.className.join(' ');

      return React.createElement(
        tagName,
        { className },
        children.map(renderElement)
      );
    } else if (element.type === 'text') {
      return element.value;
    } else {
      return null;
    }
  };


const CodeBlock = ({ children, language="jsx" }) => {
  let code = refractor.highlight(children, language);
 
  const renderElement = (element) => {
    if (element.type === 'element') {
      const { tagName, properties, children } = element;
      const className = properties.className.join(' ');

      return React.createElement(
        tagName,
        { className },
        children.map(renderElement)
      );
    } else if (element.type === 'text') {
      return element.value;
    } else {
      return null;
    }
  };




    code = code.children.map(renderElement);
  return (
    <pre cl>
      <Code className={`language-${language} whitespace-pre-wrap`} style={{wordBreak:"break-word"}}><Copy>{code}</Copy></Code>
    </pre>
  );
};

export default CodeBlock;
