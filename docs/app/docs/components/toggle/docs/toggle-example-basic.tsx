'use client';

import React from 'react';

import Toggle from '@radui/ui/Toggle';
import { Power } from 'lucide-react';

const ToggleExampleBasic = () => {
    const [pressed, setPressed] = React.useState(false);

    const Icon = () => {
        return <Power className="w-full h-full" />;
    };

    const handleChange = (newPressed) => {
        setPressed(newPressed);
    };
    return <Toggle defaultPressed={false} onPressedChange={handleChange} >
        <Icon/>
    </Toggle>;
};

export default ToggleExampleBasic;
