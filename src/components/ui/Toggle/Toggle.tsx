import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import useControllableState from '~/core/hooks/useControllableState';

import TogglePrimitive from '~/core/primitives/Toggle';

const COMPONENT_NAME = 'Toggle';

/**
 * Props for the Toggle component
 * @typedef ToggleProps
 */
export type ToggleProps = {
    /** Initial state when in uncontrolled mode */
    defaultPressed?: boolean;
    /** Current pressed state (for controlled mode) */
    pressed?: boolean;
    /** Optional custom root class name to override default styling */
    customRootClass? : string;
    /** Whether the toggle is disabled */
    disabled? : boolean;
    /** Content to render inside the toggle */
    children? : React.ReactNode;
    /** Additional class names to apply */
    className? : string;
    /** Accent color for the toggle */
    color?: string;
    /** Callback fired when toggle state changes */
    onPressedChange : (isPressed:boolean) => void;
    /** Whether to render as a child element instead of a button */
    asChild?: boolean;
};

/**
 * Toggle component that can be used in either controlled or uncontrolled mode.
 *
 * @example
 * // Controlled mode
 * const [pressed, setPressed] = useState(false);
 * <Toggle pressed={pressed} onPressedChange={setPressed}>Toggle Me</Toggle>
 *
 * @example
 * // Uncontrolled mode
 * <Toggle defaultPressed={false} onPressedChange={(isPressed) => console.log(isPressed)}>Toggle Me</Toggle>
 *
 * @param {ToggleProps} props - The component props
 * @returns {JSX.Element} The Toggle component
 */
const Toggle: React.FC<ToggleProps> = ({
    defaultPressed = false,
    customRootClass = '',
    children,
    className = '',
    color = '',
    pressed,
    onPressedChange,
    asChild = false,
    ...props
}) => {
    // Use our new hook to handle controlled/uncontrolled state
    const [isPressed, setIsPressed] = useControllableState<boolean>(
        pressed,
        defaultPressed,
        onPressedChange
    );

    // We don't need the validation anymore since the hook handles this
    // This is now handled by the hook's type safety and error messages

    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const data_attributes: Record<string, string> = {};

    if (color) {
        data_attributes['data-rad-ui-accent-color'] = color;
    }

    return (
        <TogglePrimitive
            className={clsx(rootClass, className)}
            pressed={isPressed}
            onPressedChange={setIsPressed}
            data-state={isPressed ? 'on' : 'off'}
            data-disabled={props.disabled ? '' : undefined}
            asChild={asChild}
            {...props}
            {...data_attributes}
        >
            {children}
        </TogglePrimitive>
    );
};

Toggle.displayName = COMPONENT_NAME;

export default Toggle;
