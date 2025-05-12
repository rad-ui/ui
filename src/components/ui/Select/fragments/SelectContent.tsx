import React, { useEffect, useRef, useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { customClassSwitcher } from '~/core/customClassSwitcher';
import { SelectRootContext } from './SelectRoot';

const COMPONENT_NAME = 'Select';

function SelectContent({ customRootClass, children, position = "popper", ...props }: any) {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const contentRef = useRef<HTMLDivElement>(null);
    const context = useContext(SelectRootContext);
    
    useEffect(() => {
        if (!context) return;
        
        // Handle escape key press
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                context.closeDropdown();
                e.preventDefault(); // Prevent the event from bubbling
            }
        };
        
        // Handle clicks outside the dropdown
        const handleOutsideClick = (e: MouseEvent) => {
            // Skip if content ref is not available yet
            if (!contentRef.current) return;
            
            // Check if the click is outside the content
            const targetElement = e.target as Node;
            if (!contentRef.current.contains(targetElement)) {
                context.closeDropdown();
            }
        };
        
        // Add event listeners
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleOutsideClick);
        
        // Clean up
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [context]);
    
    return (
        <SelectPrimitive.Content 
            className={`${rootClass}-content`} 
            position={position}
            data-position={position}
            role="listbox"
            {...props}
        >
            <div 
                className={`${rootClass}-viewport`}
                ref={contentRef}
            >
                {children}
            </div>
        </SelectPrimitive.Content>
    );
}

export default SelectContent;