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

        if (asChild) {
            // Check if there's exactly one child and it's a valid element
            const childrenArray = React.Children.toArray(children);
            if (childrenArray.length !== 1 || !React.isValidElement(childrenArray[0])) {
                console.warn(
                    `Primitive.${elementType}: asChild prop requires exactly one valid child element.`
                );
                return React.createElement(elementType, { ...elementProps, ref }, children);
            }

            const child = childrenArray[0] as React.ReactElement;

            // Merge refs if child already has one
            // We prioritize the child's props over elementProps, but merge classNames
            const finalProps = useMergeProps(elementProps, child, ref);

            return React.cloneElement(child, finalProps);
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
