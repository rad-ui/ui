import React from "react";
import { customClassSwitcher } from "~/core";

type BadgeRootProps = {
     children: React.ReactNode;
     customRootClass?: string;
     color?: string;
     className?: string;
     props?: Record<string, any>[]
}

const BadgeRoot = ({children,customRootClass,className,color,...props}:BadgeRootProps) => {
    const rootClass = customClassSwitcher(customRootClass,'Badge');

        return (
            <span className= {`${rootClass} ${className}`} data-accent-color={color ?? undefined} {...props}>
                {children}
            </span>
        )
}

export default BadgeRoot;