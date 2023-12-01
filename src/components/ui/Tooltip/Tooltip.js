import {useState, useRef} from 'react';

import {useFloating, useInteractions, useHover, FloatingArrow, arrow, offset} from '@floating-ui/react';

// TODO : Use Floating Portal?

import Popper from '@/components/tools/Popper/Popper';

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
        <div>
            <Popper pop={'hello'}>{children}</Popper>
        </div>

    </div>;
};

export default Tooltip;
