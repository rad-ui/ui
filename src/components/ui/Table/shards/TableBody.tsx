import React from 'react'

const TableBody = ({ children, className = '', ...props }: any) => {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  )
}

export default TableBody
