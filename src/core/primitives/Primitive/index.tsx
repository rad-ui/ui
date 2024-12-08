import React from 'react';

// Define supported HTML elements
const SUPPORTED_HTML_ELEMENTS = ['div', 'span', 'button'] as const;
type SupportedElement = typeof SUPPORTED_HTML_ELEMENTS[number];

// Update type definitions to be more specific
interface PrimitiveProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  children?: React.ReactNode;
}

// Update component creation with proper typing
const createPrimitiveComponent = (elementType: SupportedElement) => {
    const PrimitiveComponent = React.forwardRef<HTMLElement, PrimitiveProps>((props, ref) => {
        const { asChild = false, children, ...elementProps } = props;

        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children, { ...elementProps, ref });
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
