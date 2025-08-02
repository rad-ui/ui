import React from 'react';
import VisuallyHidden, { VisuallyHiddenProps } from '../VisuallyHidden';
import SandboxEditor from '~/components/tools/SandboxEditor/SandboxEditor';
import Button from '~/components/ui/Button/Button';

const EmailIcon = () => {
    return <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.94721 0.164594C7.66569 0.0238299 7.33431 0.0238302 7.05279 0.164594L0.552786 3.41459C0.214002 3.58399 0 3.93025 0 4.30902V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V4.30902C15 3.93025 14.786 3.58399 14.4472 3.41459L7.94721 0.164594ZM13.5689 4.09349L7.5 1.05902L1.43105 4.09349L7.5 7.29136L13.5689 4.09349ZM1 4.88366V12H14V4.88366L7.70977 8.19813C7.57848 8.26731 7.42152 8.26731 7.29023 8.19813L1 4.88366Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>;
};

const SearchIcon = () => {
    return <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>;
};

export default {
    title: 'Components/VisuallyHidden',
    component: VisuallyHidden,
    parameters: {
        docs: {
            description: {
                component: 'The VisuallyHidden component hides content visually while keeping it accessible to screen readers. This is useful for providing additional context or labels that are not visually apparent.'
            }
        }
    }
};

// Basic usage with icon button
export const IconButton = {
    render: () => (
        <SandboxEditor>
            <div className="space-y-4">
                <Button>
                    <VisuallyHidden>Email me!</VisuallyHidden>
                    <span aria-hidden="true">
                        <EmailIcon />
                    </span>
                </Button>

                <Button>
                    <VisuallyHidden>Search</VisuallyHidden>
                    <span aria-hidden="true">
                        <SearchIcon />
                    </span>
                </Button>
            </div>
        </SandboxEditor>
    )
};

// Demonstrating asChild prop
export const AsChildExample = {
    render: () => (
        <SandboxEditor>
            <div className="space-y-4">
                <p>
                    This text has a <VisuallyHidden asChild><span>hidden span element</span></VisuallyHidden> that screen readers can access.
                </p>

                <button>
                    <VisuallyHidden asChild>
                        <span>This button text is hidden visually but accessible to screen readers</span>
                    </VisuallyHidden>
                    Click me
                </button>
            </div>
        </SandboxEditor>
    )
};

// Accessibility demonstration
export const AccessibilityExample = {
    render: () => (
        <SandboxEditor>
            <div className="space-y-4">
                <div>
                    <h3>Form with hidden labels</h3>
                    <form className="space-y-2">
                        <div>
                            <VisuallyHidden asChild>
                                <label htmlFor="email">Email address</label>
                            </VisuallyHidden>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="border p-2 rounded"
                            />
                        </div>

                        <div>
                            <VisuallyHidden asChild>
                                <label htmlFor="password">Password</label>
                            </VisuallyHidden>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="border p-2 rounded"
                            />
                        </div>
                    </form>
                </div>

                <div>
                    <h3>Skip link example</h3>
                    <VisuallyHidden asChild>
                        <a href="#main-content" className="bg-blue-500 text-white p-2 rounded">
                            Skip to main content
                        </a>
                    </VisuallyHidden>
                </div>
            </div>
        </SandboxEditor>
    )
};

// Custom styling example
export const CustomStyling = {
    render: () => (
        <SandboxEditor>
            <div className="space-y-4">
                <p>
                    This paragraph has a
                    <VisuallyHidden
                        style={{
                            color: 'red',
                            fontSize: '20px'
                        }}
                    >
                        custom styled hidden text
                    </VisuallyHidden>
                    that maintains the visually hidden behavior.
                </p>

                <div>
                    <VisuallyHidden className="sr-only-custom">
                        Custom class applied
                    </VisuallyHidden>
                    <p>This content has a custom class applied to the hidden element.</p>
                </div>
            </div>
        </SandboxEditor>
    )
};
