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

declare module '@radui/ui/Popover' {
    import * as React from 'react';

    type PopoverRootProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
        children?: React.ReactNode;
        customRootClass?: string;
        open?: boolean;
        defaultOpen?: boolean;
        onOpenChange?: (open: boolean) => void;
    };

    type PopoverTriggerProps = React.ComponentPropsWithoutRef<'button'> & {
        asChild?: boolean;
        disabled?: boolean;
        customRootClass?: string;
    };

    type PopoverContentProps = React.ComponentPropsWithoutRef<'div'> & {
        customRootClass?: string;
        side?: 'top' | 'right' | 'bottom' | 'left';
        align?: 'start' | 'center' | 'end';
        sideOffset?: number;
        alignOffset?: number;
        forceMount?: boolean;
    };

    type PopoverAnchorProps = React.ComponentPropsWithoutRef<'div'> & {
        customRootClass?: string;
    };

    type PopoverCloseProps = React.ComponentPropsWithoutRef<'button'> & {
        asChild?: boolean;
        customRootClass?: string;
    };

    type PopoverPortalProps = {
        children?: React.ReactNode;
        forceMount?: boolean;
    };

    type PopoverArrowProps = React.ComponentPropsWithoutRef<'div'> & {
        customRootClass?: string;
        width?: number;
        height?: number;
    };

    const Popover: React.ForwardRefExoticComponent<
        PopoverRootProps & React.RefAttributes<HTMLDivElement>
    > & {
        Root: React.ForwardRefExoticComponent<
            PopoverRootProps & React.RefAttributes<HTMLDivElement>
        >;
        Trigger: React.ForwardRefExoticComponent<
            PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>
        >;
        Content: React.ForwardRefExoticComponent<
            PopoverContentProps & React.RefAttributes<HTMLDivElement>
        >;
        Anchor: React.ForwardRefExoticComponent<
            PopoverAnchorProps & React.RefAttributes<HTMLDivElement>
        >;
        Close: React.ForwardRefExoticComponent<
            PopoverCloseProps & React.RefAttributes<HTMLButtonElement>
        >;
        Portal: React.FC<PopoverPortalProps>;
        Arrow: React.ForwardRefExoticComponent<
            PopoverArrowProps & React.RefAttributes<HTMLDivElement>
        >;
    };

    export default Popover;
}

// The docs site resolves `@radui/ui` from the published package, so a
// component added in the same PR as its docs page has no types until that
// release ships. These blocks stand in until then and must mirror the real
// fragments in `src/components/ui/<Name>`.
//
// Note: `docs/tsconfig.json` sets `skipLibCheck: true`, so tsc does NOT check
// the bodies of these declarations. A wrong prop type or a bad ref here fails
// silently. To check just this file, filter the unskipped run down to it —
// turning skipLibCheck off surfaces ~59 unrelated pre-existing errors from
// node_modules and @types/mdx:
//
//   cd docs && npx tsc -p tsconfig.examples.json --noEmit \
//     --skipLibCheck false 2>&1 | grep 'types/custom.d.ts'
declare module '@radui/ui/TextField' {
    import * as React from 'react';

    // src/components/ui/TextField/fragments/TextFieldRoot.tsx
    type TextFieldRootProps = React.ComponentPropsWithoutRef<'div'> & {
        className?: string;
        customRootClass?: string;
    };

    // src/components/ui/TextField/fragments/TextFieldInput.tsx
    type TextFieldInputProps = React.ComponentPropsWithoutRef<'input'>;

    // src/components/ui/TextField/fragments/TextFieldReset.tsx
    type TextFieldResetProps = React.ComponentPropsWithoutRef<'button'>;

    // src/components/ui/TextField/fragments/TextFieldSlot.tsx
    type TextFieldSlotProps = React.ComponentPropsWithoutRef<'div'> & {
        side?: 'start' | 'end';
    };

    // The default export is a convenience wrapper: it renders a Root with an
    // Input inside and forwards the ref to that input, not to a div.
    type TextFieldProps = React.ComponentPropsWithoutRef<'input'> & {
        className?: string;
        customRootClass?: string;
        inputClassName?: string;
        startSlot?: React.ReactNode;
        endSlot?: React.ReactNode;
    };

    const TextField: React.ForwardRefExoticComponent<
        TextFieldProps & React.RefAttributes<HTMLInputElement>
    > & {
        Root: React.ForwardRefExoticComponent<
            TextFieldRootProps & React.RefAttributes<HTMLDivElement>
        >;
        Input: React.ForwardRefExoticComponent<
            TextFieldInputProps & React.RefAttributes<HTMLInputElement>
        >;
        Reset: React.ForwardRefExoticComponent<
            TextFieldResetProps & React.RefAttributes<HTMLButtonElement>
        >;
        Slot: React.ForwardRefExoticComponent<
            TextFieldSlotProps & React.RefAttributes<HTMLDivElement>
        >;
    };

    export default TextField;
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
