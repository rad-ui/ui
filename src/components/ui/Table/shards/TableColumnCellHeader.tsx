import React from 'react'

const TableColumnCellHeader = ({
  children,
  className = 'cell-header',
  ...props
}: any) => {
  return (
    <th className={className} {...props}>
      {children}
    </th>
  )
}

export default TableColumnCellHeader
