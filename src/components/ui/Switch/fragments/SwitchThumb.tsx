'use client';

import React, { useContext } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { SwitchContext } from '../context/SwitchContext';

const SwitchThumb = () => {
    const { checked, setChecked, rootClass } = useContext(SwitchContext);
    return <Primitive.span role='switch' className={`${rootClass}-indicator`} data-state={checked ? 'checked' : 'unchecked'} />;
};

export default SwitchThumb;
