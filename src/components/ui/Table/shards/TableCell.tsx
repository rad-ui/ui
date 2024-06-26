import React from 'react'

const TableCell = ({ children, className = 'cell', ...props }: any) => {
  return (
    <td className={className} {...props}>
      {children}
    </td>
  )
}

export default TableCell
