import React from 'react';

const HTMLNODES = ['div', 'span', 'button'];

const generatePrimitive = (Tag: string) => {
    const PrimitiveComponent = (props: any) => {
        const { asChild, children, ...rest } = props;

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children, rest);
        }

        return <Tag {...rest}>{children}</Tag>;
    };

    return PrimitiveComponent;
};

const Primitive = HTMLNODES.reduce((acc: any, tag: string) => {
    acc[tag] = generatePrimitive(tag);
    return acc;
}, {});

export default Primitive;
