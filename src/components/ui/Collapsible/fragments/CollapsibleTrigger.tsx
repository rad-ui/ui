import clsx from 'clsx'
import React, { useContext } from 'react'
import ButtonPrimitive from '~/core/primitives/Button'
import { CollapsibleContext } from '../contexts/CollapsibleContext'


type CollapsibleTriggerProps = {
    children: React.ReactNode
}

const ExpandIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
    />
  </svg>
);

const CollapseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
    />
  </svg>
);


const CollapsibleTrigger = ({children}: CollapsibleTriggerProps) => {
    const {onOpenChange, open,rootClass} = useContext(CollapsibleContext)

   const toggleCollapse = () => onOpenChange((p) => !p);
  return (
    <div className={clsx(`${rootClass}-trigger`)}>
      {children ? (
        children
      ) : (
        <ButtonPrimitive onClick={toggleCollapse} className={clsx(`${rootClass}-button`)}>
          {open ? <CollapseIcon /> : <ExpandIcon />}
        </ButtonPrimitive>
      )}
    </div>
  );
}

export default CollapsibleTrigger