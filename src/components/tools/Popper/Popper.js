import {useState, useRef} from 'react';

import {useFloating, useInteractions, useHover, FloatingArrow, arrow, offset, flip, shift, autoPlacement, useRole, useDismiss} from '@floating-ui/react';

// TODO : Use Floating Portal?

const ARROW_HEIGHT = 7;
const GAP = 2;

const Popper = ({children, open=true, hoverDelay=10, showArrow=true, pop=<></>}) => {
    const arrowRef = useRef(null);

    const [isOpen, setIsOpen] = useState(open);

    const {refs, floatingStyles, context} = useFloating({
        open: isOpen,
        middleware: [
            arrow({
                element: arrowRef,
            }),
            offset(ARROW_HEIGHT + GAP),
            autoPlacement({
                // crossAxis: 'center',
                alignment: 'start',
                autoAlignment: true,
                allowedPlacements: ['top', 'bottom', 'left', 'right'],
                padding: 5,
            }),
            // flip(),
            // shift(),
        ],
        onOpenChange: setIsOpen,
        placement: 'top',
    });

    const role = useRole(context);
    const dismiss = useDismiss(context);

    const hover = useHover(context, {
        // delay: hoverDelay,
    });

    const {getReferenceProps, getFloatingProps} = useInteractions([
        hover,
        role,
        dismiss,
    ]);

    return <span>
        <span ref={refs.setReference} {...getReferenceProps(
            {
                onClick: () => {
                    console.log('click');
                },
            },
        )}>{children}</span>
        {isOpen && <div className='bg-gray-1000 text-gray-100 px-3 py-1 rounded-md' ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} >
            {showArrow && <FloatingArrow className='text-gray-100' ref={arrowRef} context={context} />}
            {pop}</div>}
    </span>;
};

export default Popper;
