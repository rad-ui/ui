import {useState, useRef} from 'react';
import {customClassSwitcher} from '@/core';

import {useFloating, useInteractions, useHover, FloatingArrow, arrow, offset, flip, autoPlacement, useRole, useDismiss} from '@floating-ui/react';

// TODO : Use Floating Portal?

const ARROW_HEIGHT = 7;
const GAP = 2;

const Popper = ({popperName='', customRootClass='', className='', children, open=false, hoverDelay=10, showArrow=true, pop=<></>, ...props}) => {
    const rootClass = customClassSwitcher(customRootClass, popperName);

    const arrowRef = useRef(null);

    const [isOpen, setIsOpen] = useState(open);

    const {refs, floatingStyles, context} = useFloating({
        open: isOpen,
        middleware: [
            arrow({
                element: arrowRef,
            }),
            offset(ARROW_HEIGHT + GAP),
            // autoPlacement({
            //     crossAxis: 'center',
            //     alignment: 'start',
            //     autoAlignment: true,
            //     allowedPlacements: ['top', 'bottom', 'left', 'right'],
            //     padding: 5,
            // }),
            flip(),

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

    return <span className={`${rootClass} ${className}`} {...props}>
        <span className={`${rootClass}-reference-element`} ref={refs.setReference} {...getReferenceProps(
            {
                onClick: () => {
                    console.log('click');
                },
            },
        )}>{children}</span>
        {isOpen && <div className={`${rootClass}-floating-element`} ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} >
            {showArrow && <FloatingArrow className={`rad-ui-arrow ${rootClass}-arrow`} ref={arrowRef} context={context} />}
            {pop}</div>}
    </span>;
};

export default Popper;
