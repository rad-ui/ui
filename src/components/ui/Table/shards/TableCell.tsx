import React from 'react'

function TableCell({ children, className = 'cell', ...props }: any) {
  return (
    <td className={className} {...props}>
      {children}
    </td>
  )
}

export default TableCell
