import React from 'react'
import RovingFocusGroup from '~/core/utils/RovingFocusGroup'
import  NavigationMenuRootContext  from '../contexts/NavigationMenuRootContext'
import clsx from 'clsx'

export type NavigationMenuLinkProps = {
    href: string
    children: React.ReactNode
    className?: string
}

const NavigationMenuLink = ({children, href, className}:NavigationMenuLinkProps) => {
    const {rootClass} = React.useContext(NavigationMenuRootContext);
    return (
        <RovingFocusGroup.Item>
        <a href={href} className={clsx(`${rootClass}-link`, className)}>
            {children}
        </a>
        </RovingFocusGroup.Item>
    )
}

export default NavigationMenuLink