import React from 'react'

import Popper from '~/components/tools/Popper/Popper'

const COMPONENT_NAME = 'Tooltip'

type TooltipProps = {
  children: React.ReactNode
  label: string
  [key: string]: any
}

const Tooltip = ({ children, label, ...props }: TooltipProps) => {
  return (
    <div>
      <Popper popperName={COMPONENT_NAME} pop="hello" {...props}>
        {children}
      </Popper>
    </div>
  )
}

export default Tooltip
