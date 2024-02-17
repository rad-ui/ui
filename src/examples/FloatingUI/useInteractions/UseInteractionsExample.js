import React, {useState} from 'react';

import {useInteractions, useFloating, useHover, useFocus, useClick, useRole, useDismiss} from '@floating-ui/react';

const UserInteractionsExample = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {context, refs, floatingStyles} = useFloating({
        open: isOpen,
        placement: 'top',
        onOpenChange: setIsOpen,
    });

    const hover = useHover(context);
    const focus = useFocus(context);
    const click = useClick(context);
    const role = useRole(context, {
        'role': 'tooltip', // give the floating element a role
    });
    const dismiss = useDismiss(context, {
        onClickOutside: () => setIsOpen(false),
        onEscape: () => setIsOpen(false),
    });


    const {getReferenceProps, getFloatingProps} = useInteractions([
        hover,
        focus,
        click,
        role,
        dismiss,
    ]);

    return <>
        <div className='space-x-4'>
            <button>
                dummy button
            </button>
            <button
                className="border p-2 border-black focus:border-red-800"
                ref={refs.setReference} {...getReferenceProps(
                    {
                        onClick: () => console.log('clicked'),
                        onFocus: () => console.log('focused'),
                        onBlur: () => console.log('blurred'),
                        onMouseEnter: () => console.log('hovered'),
                        onMouseLeave: () => console.log('unhovered'),

                    },
                )} >
                    Yo
            </button>
        </div>
        {
            isOpen && <div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
            >try focussing this button</div>
        }
    </>;
};

export default UserInteractionsExample;
