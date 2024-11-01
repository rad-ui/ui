import React from 'react';

import AvatarGroupContext from './contexts/AvatarGroupContext';

const AvatarGroupRoot = () => {
    return (
        <div>
            <AvatarGroupContext.Provider value={{}}>
                <AvatarGroupRoot >
                </AvatarGroupRoot>
            </AvatarGroupContext.Provider>

        </div>
    );
};

export default AvatarGroupRoot;
