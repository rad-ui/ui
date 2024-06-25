import React from 'react'

function TableHead({ children, className = 'header', ...props }: any) {
  return (
    <thead className={className} {...props}>
      {children}
    </thead>
  )
}

export default TableHead
