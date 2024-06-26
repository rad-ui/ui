import React from 'react'

const TableHead = ({ children, className = 'header', ...props }: any) => {
  return (
    <thead className={className} {...props}>
      {children}
    </thead>
  )
}

export default TableHead
