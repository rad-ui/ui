import React from 'react';

type BadgeContentProps = {
   children: React.ReactNode;

}

const BadgeContent = ({ children }:BadgeContentProps) => {
    return (
        <>
            {children}
        </>
    );
};

export default BadgeContent;
