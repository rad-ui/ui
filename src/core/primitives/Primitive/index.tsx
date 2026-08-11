import React from 'react';
import { composeRefs, mergeProps } from '../../utils/mergeProps';

// Define supported HTML elements
const SUPPORTED_HTML_ELEMENTS = ['div', 'span', 'button', 'input', 'a', 'img', 'p', 'h2', 'label'] as const;
type SupportedElement = typeof SUPPORTED_HTML_ELEMENTS[number];

type PrimitiveProps =
  | (React.InputHTMLAttributes<HTMLInputElement> & { asChild?: boolean })
  | (React.HTMLAttributes<HTMLElement> & { asChild?: boolean; children?: React.ReactNode });

type AnchorPrimitiveProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { asChild?: boolean };

type PrimitiveComponent = React.ForwardRefExoticComponent<PrimitiveProps & React.RefAttributes<HTMLElement>>;

type PrimitiveMap = Record<SupportedElement, PrimitiveComponent> & {
    a: React.ForwardRefExoticComponent<AnchorPrimitiveProps & React.RefAttributes<HTMLAnchorElement>>;
};

const createPrimitiveComponent = (elementType: SupportedElement) => {
    const PrimitiveComponent = React.forwardRef<HTMLElement, PrimitiveProps>((props, ref) => {
        const { asChild = false, children, ...elementProps } = props;

        if (asChild) {
            if (React.isValidElement(children) && children.type === React.Fragment) {
                console.warn(
                    `Primitive.${elementType}: asChild prop does not support React.Fragment. Please provide a single element.`
                );
                return React.createElement(elementType, { ...elementProps, ref }, children);
            }

            const childrenArray = React.Children.toArray(children);
            if (childrenArray.length !== 1 || !React.isValidElement(childrenArray[0])) {
                console.warn(
                    `Primitive.${elementType}: asChild prop requires exactly one valid child element.`
                );
                return React.createElement(elementType, { ...elementProps, ref }, children);
            }

            const child = childrenArray[0] as React.ReactElement;

            const childRef = (child as any).ref;
            const mergedRef = composeRefs(ref, childRef);
            const mergedProps = mergeProps(elementProps, child.props);

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

const Primitive = SUPPORTED_HTML_ELEMENTS.reduce(
    (components, elementType) => {
        components[elementType] = createPrimitiveComponent(elementType);
        return components;
    },
    {} as Record<SupportedElement, PrimitiveComponent>
) as PrimitiveMap;

export default Primitive;
