'use client';

import React, { useContext } from 'react';
import Floater from '~/core/primitives/Floater';

import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';

import { clsx } from 'clsx';

type SelectPrimitiveOverlayProps = {
    className?: string;
};

function SelectPrimitiveOverlay({ className = '' }: SelectPrimitiveOverlayProps) {
    const { isOpen, handleOverlayClick } = useContext(SelectPrimitiveContext);
    return (
        <>
            {isOpen && (
                <Floater.Overlay
                    // className={clsx(`${rootClass}-overlay`, className)}
                    onClick={handleOverlayClick}
                >
                </Floater.Overlay>
            )}
        </>
    );
}

export default SelectPrimitiveOverlay;
