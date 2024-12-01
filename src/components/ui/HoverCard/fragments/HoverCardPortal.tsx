import React, { useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import HoverCardContext from '../contexts/HoverCardContext';

type HoverCardPortalProps = {
    children: React.ReactNode,
    rootElement: HTMLElement | React.MutableRefObject<HTMLElement | null> | undefined,
    props: React.HTMLAttributes<HTMLElement>
}

const HoverCardPortal = ({ children, rootElement = undefined, ...props }: HoverCardPortalProps) => {
    const { rootTriggerClass } = useContext(HoverCardContext);
    const rootElem = rootElement || document.getElementsByClassName(rootTriggerClass)[0] as HTMLElement;

    return <Floater.Portal
        root={rootElem}
        {...props}
    >{children}</Floater.Portal>;
};

export default HoverCardPortal;
