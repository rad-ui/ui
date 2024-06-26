import React, { useState } from 'react'

import { customClassSwitcher } from '~/core'

const COMPONENT_NAME = 'Toggle'

export type ToggleProps = {
  defaultPressed?: boolean | false
  pressed: boolean
  customRootClass?: string
  disabled?: boolean
  children?: React.ReactNode
  className?: string
  onChange: (isPressed: boolean) => void
}

const Toggle: React.FC<ToggleProps> = ({
  defaultPressed,
  customRootClass = '',
  children,
  pressed,
  onChange,
  ...props
}) => {
  const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME)

  const [isPressed = false, setIsPressed] = useState(pressed || defaultPressed)

  const handlePressed = () => {
    const updatedPressed = !isPressed
    setIsPressed(updatedPressed)
    onChange(updatedPressed)
  }

  return (
    <button
      className={`${rootClass}`}
      onClick={handlePressed}
      data-state={isPressed ? 'on' : 'off'}
      type="button"
      data-disabled={props.disabled ? '' : undefined}
      aria-pressed={pressed}
      {...props}
    >
      {children}
    </button>
  )
}

export default Toggle
