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
        PopoverRootProps & RefAttributes<HTMLDivElement>
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

declare module '@radui/ui/TextField' {
    import * as React from 'react';

    type TextFieldRootProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
        children?: React.ReactNode;
        customRootClass?: string;
        size?: string;
        color?: string;
        variant?: string;
        invalid?: boolean;
        disabled?: boolean;
        required?: boolean;
    };

    type TextFieldInputProps = Omit<
        React.ComponentPropsWithoutRef<'input'>,
        'size' | 'color'
    > & {
        customRootClass?: string;
        startAdornment?: React.ReactNode;
        endAdornment?: React.ReactNode;
        plain?: boolean;
    };

    type TextFieldResetProps = React.ComponentPropsWithoutRef<'button'> & {
        customRootClass?: string;
    };

    type TextFieldSlotProps = React.ComponentPropsWithoutRef<'span'> & {
        customRootClass?: string;
        side?: 'start' | 'end';
    };

    const TextField: React.ForwardRefExoticComponent<
        TextFieldRootProps & React.RefAttributes<HTMLDivElement>
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
            TextFieldSlotProps & React.RefAttributes<HTMLSpanElement>
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
