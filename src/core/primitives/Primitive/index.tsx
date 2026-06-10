import React from 'react';
import { composeRefs, mergeProps } from '../../utils/mergeProps';

const SUPPORTED_HTML_ELEMENTS = [
    'div',
    'span',
    'button',
    'input',
    'a',
    'img',
    'p',
    'h2',
    'h3',
    'label',
    'table',
    'thead',
    'tbody',
    'tr',
    'td',
    'th'
] as const;
type SupportedElement = typeof SUPPORTED_HTML_ELEMENTS[number];
type PrimitiveComponentProps<TTag extends SupportedElement> = React.ComponentPropsWithoutRef<TTag> & {
    asChild?: boolean;
};
type PrimitiveComponentMap = {
    [TTag in SupportedElement]: React.ForwardRefExoticComponent<
        PrimitiveComponentProps<TTag> & React.RefAttributes<HTMLElement>
    >;
};

const createPrimitiveComponent = <TTag extends SupportedElement>(elementType: TTag) => {
    const PrimitiveComponent = React.forwardRef<HTMLElement, PrimitiveComponentProps<TTag>>((props, ref) => {
        const { asChild = false, children, ...elementProps } = props;

        if (asChild) {
            if (React.isValidElement(children) && children.type === React.Fragment) {
                console.warn(
                    `Primitive.${elementType}: asChild prop does not support React.Fragment. Please provide a single element.`
                );
                return React.createElement(elementType, { ...elementProps, ref }, children);
            }

            // Check if there's exactly one child and it's a valid element
            const childrenArray = React.Children.toArray(children);
            if (childrenArray.length !== 1 || !React.isValidElement(childrenArray[0])) {
                console.warn(
                    `Primitive.${elementType}: asChild prop requires exactly one valid child element.`
                );
                return React.createElement(elementType, { ...elementProps, ref }, children);
            }

            const child = childrenArray[0] as React.ReactElement;
            const childRef = (child as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref;
            const mergedRef = composeRefs(ref, childRef);
            const mergedProps = mergeProps(elementProps, child.props as Record<string, unknown>);

            return React.cloneElement(child, {
                ...mergedProps,
                ...(mergedRef ? { ref: mergedRef } : {})
            });
        }

        return React.createElement(elementType, { ...elementProps, ref }, children);
    });

    PrimitiveComponent.displayName = `Primitive.${elementType}`;
    return PrimitiveComponent;
};

const Primitive = {} as PrimitiveComponentMap;

for (const elementType of SUPPORTED_HTML_ELEMENTS) {
    Primitive[elementType] = createPrimitiveComponent(elementType) as never;
}

export default Primitive;
