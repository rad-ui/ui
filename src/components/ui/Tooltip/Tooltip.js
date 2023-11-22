import {useState, useRef} from 'react';

import {useFloating, useInteractions, useHover, FloatingArrow, arrow} from '@floating-ui/react';

const Tooltip = ({children, label}) => {
    const arrowRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    const {refs, floatingStyles, context} = useFloating({
        open: isOpen,
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
        <div ref={refs.setReference} {...getReferenceProps(
            {
                onClick: () => {
                    console.log('click');
                },
            },
        )}>{children}</div>
        {isOpen && <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} >{label}</div>}
    </div>;
};

export default Tooltip;
