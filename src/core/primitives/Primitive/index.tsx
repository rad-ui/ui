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

const Primitive = HTMLNODES.reduce((accumulator: any, tag: string) => {
    accumulator[tag] = generatePrimitive(tag);
    return accumulator;
}, {});

export default Primitive;
