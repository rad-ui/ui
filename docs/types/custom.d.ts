// custom.d.ts
declare module '@radui/ui';

declare module '@radui/ui/LiveRegion' {
    import * as React from 'react';

    type LiveRegionProps = React.ComponentPropsWithoutRef<'div'> & {
        politeness?: 'polite' | 'assertive' | 'off';
        role?: 'status' | 'alert' | 'log';
        atomic?: boolean;
        relevant?: 'additions' | 'removals' | 'text' | 'all' | 'additions text';
        busy?: boolean;
        visuallyHidden?: boolean;
        customRootClass?: string;
        children?: React.ReactNode;
    };

    const LiveRegion: React.ForwardRefExoticComponent<
        LiveRegionProps & React.RefAttributes<HTMLDivElement>
    >;

    export default LiveRegion;
}

declare module '@radui/ui/Fieldset' {
    import * as React from 'react';

    type FieldsetRootProps = React.ComponentPropsWithoutRef<'fieldset'> & {
        customRootClass?: string;
        color?: string;
        size?: string;
        variant?: string;
        invalid?: boolean;
    };

    type FieldsetMessageProps = React.ComponentPropsWithoutRef<'p'> & {
        invalid?: boolean;
    };

    const Fieldset: React.ForwardRefExoticComponent<
        FieldsetRootProps & React.RefAttributes<HTMLFieldSetElement>
    > & {
        Root: React.ForwardRefExoticComponent<
            FieldsetRootProps & React.RefAttributes<HTMLFieldSetElement>
        >;
        Legend: React.ForwardRefExoticComponent<
            React.ComponentPropsWithoutRef<'legend'> & React.RefAttributes<HTMLLegendElement>
        >;
        Description: React.ForwardRefExoticComponent<
            React.ComponentPropsWithoutRef<'p'> & React.RefAttributes<HTMLParagraphElement>
        >;
        Message: React.ForwardRefExoticComponent<
            FieldsetMessageProps & React.RefAttributes<HTMLParagraphElement>
        >;
    };

    export default Fieldset;
}

declare module '@radui/ui/ToggleGroup' {
    import * as React from 'react';

    type ToggleGroupRootProps = React.ComponentPropsWithoutRef<'div'> & {
        type?: 'single' | 'multiple';
        defaultValue?: unknown;
        value?: unknown;
        onValueChange?: (value: unknown) => void;
        children?: React.ReactNode;
    };

    type ToggleGroupItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
        value?: unknown;
        iconOnly?: boolean;
        children?: React.ReactNode;
    };

    const ToggleGroup: React.ForwardRefExoticComponent<
        React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>
    > & {
        Root: React.ForwardRefExoticComponent<
            ToggleGroupRootProps & React.RefAttributes<HTMLDivElement>
        >;
        Item: React.ForwardRefExoticComponent<
            ToggleGroupItemProps & React.RefAttributes<HTMLButtonElement>
        >;
    };

    export default ToggleGroup;
}
