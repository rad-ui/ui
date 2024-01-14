import React from 'react';
import {FloatingOverlay, FloatingPortal, FloatingFocusManager, useFloating} from '@floating-ui/react';


export type ModalProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({open=true, onClose, children}) => {
    const {context} = useFloating();

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
                    {/* Floating Content */}
                    {
                        open &&
                        <FloatingFocusManager context={context}>
                            <FloatingPortal>
                                <FloatingOverlay>
                                    <div className='fixed bg-black/80 overflow-auto w-screen h-screen grid place-items-center'>
                                        <div className='bg-white p-4 inline-block rounded-md shadow-lg'>
                                            <button onClick={onCloseHandler}>
                                                Close
                                            </button>
                                            <div>
                                                Modal Content
                                            </div>
                                        </div>
                                    </div>
                                </FloatingOverlay>
                            </FloatingPortal>
                        </FloatingFocusManager>


                    }
                </div>
            </div>
        </div>
    );
};


export default Modal;
