import React from 'react';
import useMergeProps from '~/core/hooks/useMergeProps';

// Define supported HTML elements
const SUPPORTED_HTML_ELEMENTS = ['div', 'span', 'button', 'input', 'a', 'img', 'p', 'h2', 'label'] as const;
type SupportedElement = typeof SUPPORTED_HTML_ELEMENTS[number];

// Update type definitions to be more specific
type PrimitiveProps =
  | (React.InputHTMLAttributes<HTMLInputElement> & { asChild?: boolean })
  | (React.HTMLAttributes<HTMLElement> & { asChild?: boolean, children?: React.ReactNode });

// Update component creation with proper typing
const createPrimitiveComponent = (elementType: SupportedElement) => {
    const PrimitiveComponent = React.forwardRef<HTMLElement, PrimitiveProps>((props, ref) => {
        const { asChild = false, children, ...elementProps } = props;

        const childrenArray = React.Children.toArray(children);
        const child =
            childrenArray.length === 1 && React.isValidElement(childrenArray[0])
                ? (childrenArray[0] as React.ReactElement)
                : undefined;

        // Merge refs if child already has one
        // We prioritize the child's props over elementProps, but merge classNames
        const mergedProps = useMergeProps(elementProps, child, ref);

        if (asChild) {
            if (React.isValidElement(children) && children.type === React.Fragment) {
                console.warn(
                    `Primitive.${elementType}: asChild prop does not support React.Fragment. Please provide a single element.`
                );
                return React.createElement(elementType, { ...elementProps, ref }, children);
            }

            if (!child) {
                console.warn(
                    `Primitive.${elementType}: asChild prop requires exactly one valid child element.`
                );
                return React.createElement(elementType, { ...elementProps, ref }, children);
            }

            return React.cloneElement(child, mergedProps);
        }

        return React.createElement(elementType, { ...elementProps, ref }, children);
    });

    PrimitiveComponent.displayName = `Primitive.${elementType}`;
    return PrimitiveComponent;
};

// Update the type of the final Primitive object
const Primitive = SUPPORTED_HTML_ELEMENTS.reduce<Record<SupportedElement, React.ForwardRefExoticComponent<PrimitiveProps & React.RefAttributes<HTMLElement>>>>(
    (components, elementType) => {
        components[elementType] = createPrimitiveComponent(elementType);
        return components;
    },
    {} as Record<SupportedElement, React.ForwardRefExoticComponent<PrimitiveProps & React.RefAttributes<HTMLElement>>>
);

export default Primitive;
