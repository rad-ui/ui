'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';

import Toggle from '@radui/ui/Toggle';

const ToggleExampleBasic = () => {
    const [pressed, setPressed] = React.useState(false);

    const handleChange = (newPressed) => {
        setPressed(newPressed);
    };
    return <Toggle defaultPressed={false} onPressedChange={handleChange} >
        <ArrowUp size={15} strokeWidth={2} />
    </Toggle>;
};

export default ToggleExampleBasic;
