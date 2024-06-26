import React from 'react'

const TableRow = ({ children, className = 'row', ...props }: any) => {
  return (
    <tr className={className} {...props}>
      {children}
    </tr>
  )
}

export default TableRow
