import React from 'react';
import { FloatingOverlay, FloatingPortal, FloatingFocusManager, useFloating } from '@floating-ui/react';
import { clsx } from 'clsx';
export type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ open = true, onClose, children }) => {
    const { context } = useFloating();

    const onCloseHandler = () => {
        onClose(false);
    };

    return (
        <div className={clsx('modal')}>
            <div className={clsx('modal__content')}>
                <div>
                    {children}
                </div>
                <div>
                    {
                        open &&
                        <FloatingPortal>
                            <FloatingOverlay className={clsx('overlay')} lockScroll>
                                <FloatingFocusManager context={context}>
                                    <div className={clsx('fixed bg-black/80 overflow-auto w-screen h-screen grid place-items-center')}>
                                        <div className={clsx('bg-white p-4 inline-block rounded-md shadow-lg')}>
                                            <button onClick={onCloseHandler}>
                                                Close
                                            </button>
                                            <div>
                                                Modal Content
                                                <div>
                                                    <input type="text" autoFocus />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </FloatingFocusManager>
                            </FloatingOverlay>
                        </FloatingPortal>

                    }
                </div>
            </div>
        </div>
    );
};

export default Modal;
