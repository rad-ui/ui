// custom.d.ts
declare module '@radui/ui';

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
