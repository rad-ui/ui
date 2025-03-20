import React from 'react';
import Toggle from '../Toggle';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';

export default {
    title: 'Components/Toggle',
    component: Toggle,
    parameters: {
        docs: {
            description: {
                component: `
# Toggle Component

A Toggle component that can be used in either controlled or uncontrolled mode.

## Controlled vs Uncontrolled

- **Controlled**: The toggle state is managed by the parent component through the \`pressed\` prop
- **Uncontrolled**: The toggle manages its own state, with an optional \`defaultPressed\` initial value

Both modes require an \`onChange\` handler to respond to state changes.
                `
            }
        }
    }
};

const MoveIcon = () => {
    return <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.81819 0.93179C7.64245 0.756054 7.35753 0.756054 7.18179 0.93179L5.43179 2.68179C5.25605 2.85753 5.25605 3.14245 5.43179 3.31819C5.60753 3.49392 5.89245 3.49392 6.06819 3.31819L6.99999 2.38638V5.49999C6.99999 5.77613 7.22385 5.99999 7.49999 5.99999C7.77613 5.99999 7.99999 5.77613 7.99999 5.49999V2.38638L8.93179 3.31819C9.10753 3.49392 9.39245 3.49392 9.56819 3.31819C9.74392 3.14245 9.74392 2.85753 9.56819 2.68179L7.81819 0.93179ZM7.99999 9.49999C7.99999 9.22385 7.77613 8.99999 7.49999 8.99999C7.22385 8.99999 6.99999 9.22385 6.99999 9.49999V12.6136L6.06819 11.6818C5.89245 11.5061 5.60753 11.5061 5.43179 11.6818C5.25605 11.8575 5.25605 12.1424 5.43179 12.3182L7.18179 14.0682C7.35753 14.2439 7.64245 14.2439 7.81819 14.0682L9.56819 12.3182C9.74392 12.1424 9.74392 11.8575 9.56819 11.6818C9.39245 11.5061 9.10753 11.5061 8.93179 11.6818L7.99999 12.6136V9.49999ZM8.99999 7.49999C8.99999 7.22385 9.22385 6.99999 9.49999 6.99999H12.6136L11.6818 6.06819C11.5061 5.89245 11.5061 5.60753 11.6818 5.43179C11.8575 5.25605 12.1424 5.25605 12.3182 5.43179L14.0682 7.18179C14.2439 7.35753 14.2439 7.64245 14.0682 7.81819L12.3182 9.56819C12.1424 9.74392 11.8575 9.74392 11.6818 9.56819C11.5061 9.39245 11.5061 9.10753 11.6818 8.93179L12.6136 7.99999H9.49999C9.22385 7.99999 8.99999 7.77613 8.99999 7.49999ZM3.31819 6.06819L2.38638 6.99999H5.49999C5.77613 6.99999 5.99999 7.22385 5.99999 7.49999C5.99999 7.77613 5.77613 7.99999 5.49999 7.99999H2.38638L3.31819 8.93179C3.49392 9.10753 3.49392 9.39245 3.31819 9.56819C3.14245 9.74392 2.85753 9.74392 2.68179 9.56819L0.93179 7.81819C0.756054 7.64245 0.756054 7.35753 0.93179 7.18179L2.68179 5.43179C2.85753 5.25605 3.14245 5.25605 3.31819 5.43179C3.49392 5.60753 3.49392 5.89245 3.31819 6.06819Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
};

// Basic controlled example with React state management
export const Controlled = () => {
    const [isPressed, setIsPressed] = React.useState(false);

    const handleChange = (state: boolean) => {
        setIsPressed(state);
    };

    return (
        <SandboxEditor className="space-y-4 pt-4">
            <div className="mb-2 text-sm font-medium">Controlled Toggle (managed by parent)</div>
            <div className="text-xs text-gray-600 mb-4">
                State is completely managed by the parent component. The Toggle will only change
                when the parent's state changes.
            </div>
            <Toggle
                pressed={isPressed}
                onChange={handleChange}
            >
                <MoveIcon />
            </Toggle>
            <div className="text-sm mt-2 p-2 bg-gray-100 rounded">
                Parent state: {isPressed ? 'Pressed' : 'Not Pressed'}
            </div>
            <div className="flex space-x-2 mt-4">
                <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setIsPressed(true)}>
                    Set Pressed
                </button>
                <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setIsPressed(false)}>
                    Set Not Pressed
                </button>
            </div>
        </SandboxEditor>
    );
};

// Basic uncontrolled example that uses internal state management
export const Uncontrolled = () => {
    const [lastToggleState, setLastToggleState] = React.useState(false);

    const handleChange = (state: boolean) => {
        setLastToggleState(state);
    };

    return (
        <SandboxEditor className="space-y-4 pt-4">
            <div className="mb-2 text-sm font-medium">Uncontrolled Toggle (internal state)</div>
            <div className="text-xs text-gray-600 mb-4">
                State is managed internally by the Toggle component.
                The parent is notified via onChange but doesn't control the state.
            </div>
            <Toggle
                defaultPressed={false}
                onChange={handleChange}
            >
                <MoveIcon />
            </Toggle>
            <div className="text-sm mt-2 p-2 bg-gray-100 rounded">
                Last reported state: {lastToggleState ? 'Pressed' : 'Not Pressed'}
            </div>
        </SandboxEditor>
    );
};

// Multiple toggles in controlled mode
export const MultipleControlledToggles = () => {
    const [activeToggles, setActiveToggles] = React.useState<number[]>([]);

    const handleToggle = (index: number, state: boolean) => {
        setActiveToggles(prev => {
            if (state) {
                return [...prev, index].sort();
            } else {
                return prev.filter(i => i !== index);
            }
        });
    };

    return (
        <SandboxEditor className="space-y-4 pt-4">
            <div className="mb-2 text-sm font-medium">Multiple Controlled Toggles</div>
            <div className="text-xs text-gray-600 mb-4">
                Example showing coordination between multiple toggles with centralized state management.
            </div>

            <div className="flex space-x-4">
                {[0, 1, 2].map(index => (
                    <Toggle
                        key={index}
                        pressed={activeToggles.includes(index)}
                        onChange={(state) => handleToggle(index, state)}
                        color={index === 0 ? 'red' : index === 1 ? 'blue' : 'green'}
                    >
                        {index + 1}
                    </Toggle>
                ))}
            </div>

            <div className="text-sm mt-4 p-2 bg-gray-100 rounded">
                Active toggles: {activeToggles.length ? activeToggles.map(i => i + 1).join(', ') : 'None'}
            </div>

            <div className="flex space-x-2 mt-4">
                <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setActiveToggles([0, 1, 2])}>
                    Select All
                </button>
                <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    onClick={() => setActiveToggles([])}>
                    Clear All
                </button>
            </div>
        </SandboxEditor>
    );
};

// Form integration example with controlled toggles
export const FormIntegration = () => {
    const [formData, setFormData] = React.useState({
        notifications: false,
        darkMode: true,
        autoSave: false
    });

    const handleToggle = (field: keyof typeof formData, value: boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Form submitted with: ${JSON.stringify(formData, null, 2)}`);
    };

    return (
        <SandboxEditor className="space-y-4 pt-4">
            <div className="mb-2 text-sm font-medium">Form Integration (Controlled)</div>
            <div className="text-xs text-gray-600 mb-4">
                Example showing toggles integrated into a form with controlled state.
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm">Enable Notifications</label>
                    <Toggle
                        pressed={formData.notifications}
                        onChange={(value) => handleToggle('notifications', value)}
                        color="blue"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <label className="text-sm">Dark Mode</label>
                    <Toggle
                        pressed={formData.darkMode}
                        onChange={(value) => handleToggle('darkMode', value)}
                        color="purple"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <label className="text-sm">Auto-Save</label>
                    <Toggle
                        pressed={formData.autoSave}
                        onChange={(value) => handleToggle('autoSave', value)}
                        color="green"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Save Preferences
                    </button>
                </div>
            </form>

            <div className="text-sm mt-4 p-2 bg-gray-100 rounded">
                <pre className="text-xs">{JSON.stringify(formData, null, 2)}</pre>
            </div>
        </SandboxEditor>
    );
};

// Uncontrolled with different default values
export const UncontrolledWithDefaults = () => {
    return (
        <SandboxEditor className="space-y-6 pt-4">
            <div className="mb-2 text-sm font-medium">Uncontrolled With Different Defaults</div>
            <div className="text-xs text-gray-600 mb-4">
                Showing uncontrolled toggles with different default pressed states.
            </div>

            <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                    <Toggle
                        defaultPressed={false}
                        onChange={() => {}}
                    >
                        <MoveIcon />
                    </Toggle>
                    <span className="text-sm">defaultPressed={'{false}'}</span>
                </div>

                <div className="flex items-center space-x-4">
                    <Toggle
                        defaultPressed={true}
                        onChange={() => {}}
                    >
                        <MoveIcon />
                    </Toggle>
                    <span className="text-sm">defaultPressed={'{true}'}</span>
                </div>
            </div>
        </SandboxEditor>
    );
};

// Color variant example
export const ColorVariant = () => {
    return (
        <SandboxEditor className="space-y-4 pt-4">
            <div className="mb-2 text-sm font-medium">Toggle with Custom Colors</div>
            <div className="text-xs text-gray-600 mb-4">
                Toggles can be customized with different colors.
            </div>

            <div className="grid grid-cols-3 gap-4">
                <Toggle defaultPressed={false} onChange={() => {}} color="blue">
                    <MoveIcon />
                </Toggle>
                <Toggle defaultPressed={false} onChange={() => {}} color="red">
                    <MoveIcon />
                </Toggle>
                <Toggle defaultPressed={false} onChange={() => {}} color="green">
                    <MoveIcon />
                </Toggle>
                <Toggle defaultPressed={false} onChange={() => {}} color="purple">
                    <MoveIcon />
                </Toggle>
                <Toggle defaultPressed={false} onChange={() => {}} color="orange">
                    <MoveIcon />
                </Toggle>
                <Toggle defaultPressed={false} onChange={() => {}} color="pink">
                    <MoveIcon />
                </Toggle>
            </div>
        </SandboxEditor>
    );
};

// Disabled state example
export const Disabled = () => {
    return (
        <SandboxEditor className="space-y-4 pt-4">
            <div className="mb-2 text-sm font-medium">Enabled vs Disabled Toggles</div>
            <div className="text-xs text-gray-600 mb-4">
                Comparison between enabled and disabled toggles in different states.
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div>
                    <div className="text-xs mb-4 font-medium">Off State</div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <div className="text-xs mb-2 text-center">Enabled</div>
                            <Toggle
                                defaultPressed={false}
                                onChange={() => {}}
                            >
                                <MoveIcon />
                            </Toggle>
                        </div>
                        <div>
                            <div className="text-xs mb-2 text-center">Disabled</div>
                            <Toggle
                                defaultPressed={false}
                                onChange={() => {}}
                                disabled={true}
                            >
                                <MoveIcon />
                            </Toggle>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="text-xs mb-4 font-medium">On State</div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <div className="text-xs mb-2 text-center">Enabled</div>
                            <Toggle
                                defaultPressed={true}
                                onChange={() => {}}
                            >
                                <MoveIcon />
                            </Toggle>
                        </div>
                        <div>
                            <div className="text-xs mb-2 text-center">Disabled</div>
                            <Toggle
                                defaultPressed={true}
                                onChange={() => {}}
                                disabled={true}
                            >
                                <MoveIcon />
                            </Toggle>
                        </div>
                    </div>
                </div>
            </div>
        </SandboxEditor>
    );
};
