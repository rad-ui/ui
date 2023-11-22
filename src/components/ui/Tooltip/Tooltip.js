import {useState, useRef} from 'react';

import {useFloating, useInteractions, useHover, FloatingArrow, arrow, offset} from '@floating-ui/react';

const ARROW_HEIGHT = 7;
const GAP = 2;

const Tooltip = ({children, label}) => {
    const arrowRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    const {refs, floatingStyles, context} = useFloating({
        open: isOpen,
        middleware: [
            arrow({
                element: arrowRef,
            }),
            offset(ARROW_HEIGHT + GAP),

        ],
        onOpenChange: setIsOpen,
        placement: 'top',
    });

    const hover = useHover(context, {
        // delay: 400,
    });

    const {getReferenceProps, getFloatingProps} = useInteractions([
        hover,

    ]);

    return <div>
        <span ref={refs.setReference} {...getReferenceProps(
            {
                onClick: () => {
                    console.log('click');
                },
            },
        )}>{children}</span>
        {isOpen && <div className='bg-gray-1000 text-gray-100 px-3 py-1 rounded-md' ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} >
            <FloatingArrow className='text-gray-100' ref={arrowRef} context={context} />
            {label}</div>}
    </div>;
};

export default Tooltip;
