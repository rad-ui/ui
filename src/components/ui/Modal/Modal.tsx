import React from 'react';
import { FloatingOverlay, FloatingPortal, FloatingFocusManager, useFloating } from '@floating-ui/react';

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
        <div className="modal">
            <div className="modal__content">
                <div>
                    {children}
                </div>
                <div>
                    {
                        open &&
                        <FloatingPortal>
                            <FloatingOverlay className="overlay" lockScroll>
                                <FloatingFocusManager context={context}>
                                    <div className='fixed bg-black/80 overflow-auto w-screen h-screen grid place-items-center'>
                                        <div className='bg-white p-4 inline-block rounded-md shadow-lg'>
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
