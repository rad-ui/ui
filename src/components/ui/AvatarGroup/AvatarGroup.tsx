const COMPONENT_NAME = 'AvatarGroup';

import React from 'react';


import AvatarGroupRoot from './shards/AvatarGroupRoot';

// contexts

// export type AvatarProps = {
//     children?: React.ReactNode,
//     customRootClass?: string,
//     fallback?: string,
//     className?: string,
//     src?: string,
//     alt?: string,
//     props?: Record<string, any>[]
// }


const AvatarGroup = ({avatars=[], size, customRootClass='', className}) => {
    return <AvatarGroupRoot>

    </AvatarGroupRoot>;
};


AvatarGroup.displayName = COMPONENT_NAME;

export default AvatarGroup;
