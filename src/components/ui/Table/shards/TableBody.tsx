import React from 'react'

function TableBody({ children, className = '', ...props }: any) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  )
}

export default TableBody
